import { readFileSync } from 'fs';
import pg from 'pg';

const DATABASE_URL = 'postgresql://postgres.epjumjpgazffryskufjs:Homeideachlef02.@aws-0-eu-west-1.pooler.supabase.com:6543/postgres';

function splitSQL(sql) {
  const statements = [];
  let current = '';
  let i = 0;

  while (i < sql.length) {
    // Skip single-line comments
    if (sql[i] === '-' && sql[i + 1] === '-') {
      while (i < sql.length && sql[i] !== '\n') i++;
      continue;
    }

    // Track dollar-quoted blocks (e.g. $$ ... $$, $tag$ ... $tag$)
    if (sql[i] === '$') {
      // Check if this is a closing dollar quote
      let tag = '';
      let j = i;
      while (j < sql.length && sql[j] === '$') { tag += '$'; j++; }
      // Check for alphanumeric tag: $tag$
      if (j < sql.length && sql[j] !== '$' && sql[j] !== ';' && /[a-zA-Z0-9_]/.test(sql[j])) {
        let end = j;
        while (end < sql.length && /[a-zA-Z0-9_]/.test(sql[end])) end++;
        if (end < sql.length && sql[end] === '$') {
          tag = sql.slice(i, end + 1);
          i = end + 1;
          // Now find the matching closing tag
          let depth = 1;
          while (i < sql.length && depth > 0) {
            if (sql.slice(i).startsWith(tag)) {
              i += tag.length;
              depth--;
            } else {
              i++;
            }
          }
          current += tag + sql.slice(i - (tag.length), i); // Hmm, this is getting messy
          // Actually, let me just skip to matching tag
          continue;
        }
      }
      // Simple $$ block
      if (tag === '$$') {
        i += 2; // skip opening $$
        let content = '$$';
        while (i < sql.length) {
          if (sql[i] === '$' && sql[i + 1] === '$') {
            content += '$$';
            i += 2;
            break;
          }
          content += sql[i];
          i++;
        }
        current += content;
        continue;
      }
    }

    // Handle string literals (single quotes) - skip over them
    if (sql[i] === "'") {
      current += sql[i];
      i++;
      while (i < sql.length) {
        if (sql[i] === "'" && sql[i + 1] === "'") {
          current += "''";
          i += 2;
        } else if (sql[i] === "'") {
          current += sql[i];
          i++;
          break;
        } else {
          current += sql[i];
          i++;
        }
      }
      continue;
    }

    if (sql[i] === ';') {
      current += ';';
      statements.push(current.trim());
      current = '';
      i++;
      continue;
    }

    current += sql[i];
    i++;
  }

  if (current.trim()) {
    statements.push(current.trim());
  }

  return statements.filter(s => s && !s.match(/^--/));
}

async function migrate() {
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log('Connected to database. Starting migration...');

  const sql = readFileSync(new URL('../supabase/migrations/20260720000000_home_idea_full_schema.sql', import.meta.url), 'utf-8');
  const statements = splitSQL(sql);
  console.log(`Parsed ${statements.length} SQL statements.`);

  await client.query('BEGIN');
  try {
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (!stmt) continue;
      try {
        await client.query(stmt);
        if ((i + 1) % 10 === 0) console.log(`  Executed ${i + 1}/${statements.length}...`);
      } catch (err) {
        console.error(`  ERROR at statement ${i + 1} (first 200 chars):`);
        console.error(`  ${stmt.substring(0, 200)}`);
        console.error(`  -> ${err.message}`);
        throw err;
      }
    }
    await client.query('COMMIT');
    console.log('\nMigration completed successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('\nMigration failed, rolled back:', err.message);
    throw err;
  }

  // Verify
  const tables = await client.query(`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename
  `);
  console.log(`\n${tables.rows.length} tables created:`);
  tables.rows.forEach(r => console.log(`  - ${r.tablename}`));

  const enums = await client.query(`
    SELECT typname FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid
    WHERE n.nspname = 'public' AND t.typtype = 'e' ORDER BY typname
  `);
  console.log(`\n${enums.rows.length} enums created:`);
  enums.rows.forEach(r => console.log(`  - ${r.typname}`));

  const views = await client.query(`
    SELECT viewname FROM pg_views WHERE schemaname = 'public' ORDER BY viewname
  `);
  console.log(`\n${views.rows.length} views created:`);
  views.rows.forEach(r => console.log(`  - ${r.viewname}`));

  const fns = await client.query(`
    SELECT p.proname FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.prokind = 'f' ORDER BY p.proname
  `);
  console.log(`\n${fns.rows.length} functions created:`);
  fns.rows.forEach(r => console.log(`  - ${r.proname}`));

  await client.end();
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
