import pg from 'pg';
import { writeFileSync } from 'fs';

const DATABASE_URL = 'postgresql://postgres.epjumjpgazffryskufjs:Homeideachlef02.@aws-0-eu-west-1.pooler.supabase.com:6543/postgres';

async function generateTypes() {
  const client = new pg.Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  // Get enums
  const enums = await client.query(`
    SELECT t.typname as enum_name, e.enumlabel as label
    FROM pg_type t 
    JOIN pg_enum e ON t.oid = e.enumtypid
    JOIN pg_namespace n ON t.typnamespace = n.oid
    WHERE n.nspname = 'public' AND t.typtype = 'e'
    ORDER BY t.typname, e.enumsortorder
  `);

  const enumMap = {};
  for (const row of enums.rows) {
    if (!enumMap[row.enum_name]) enumMap[row.enum_name] = [];
    enumMap[row.enum_name].push(row.label);
  }

  // Get tables with columns
  const tables = await client.query(`
    SELECT 
      t.table_name,
      c.column_name,
      c.udt_name,
      c.is_nullable,
      c.column_default,
      CASE WHEN c.data_type = 'USER-DEFINED' THEN c.udt_name ELSE NULL END as custom_type
    FROM information_schema.tables t
    JOIN information_schema.columns c ON t.table_name = c.table_name AND t.table_schema = c.table_schema
    WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE'
    ORDER BY t.table_name, c.ordinal_position
  `);

  // Get views with columns
  const views = await client.query(`
    SELECT 
      v.table_name as view_name,
      c.column_name,
      c.udt_name,
      c.is_nullable,
      CASE WHEN c.data_type = 'USER-DEFINED' THEN c.udt_name ELSE NULL END as custom_type
    FROM information_schema.views v
    JOIN information_schema.columns c ON v.table_name = c.table_name AND v.table_schema = c.table_schema
    WHERE v.table_schema = 'public'
    ORDER BY v.table_name, c.ordinal_position
  `);

  // Map PostgreSQL types to TypeScript
  function pgToTs(udtName, isNullable, customType) {
    if (customType) {
      return isNullable === 'YES' ? `Database["public"]["Enums"]["${customType}"] | null` : `Database["public"]["Enums"]["${customType}"]`;
    }
    const map = {
      'uuid': 'string',
      'int4': 'number',
      'int8': 'number',
      'float4': 'number',
      'float8': 'number',
      'numeric': 'number',
      'bool': 'boolean',
      'text': 'string',
      'varchar': 'string',
      'jsonb': 'Json',
      'json': 'Json',
      'timestamptz': 'string',
      'date': 'string',
      'time': 'string',
      '_text': 'string[]',
      '_uuid': 'string[]',
    };
    let ts = map[udtName] || 'Json';
    if (isNullable === 'YES' && !ts.endsWith('| null')) {
      ts += ' | null';
    }
    return ts;
  }

  // Group columns by table
  const tableCols = {};
  for (const row of tables.rows) {
    if (!tableCols[row.table_name]) tableCols[row.table_name] = [];
    tableCols[row.table_name].push(row);
  }

  const viewCols = {};
  for (const row of views.rows) {
    if (!viewCols[row.view_name]) viewCols[row.view_name] = [];
    viewCols[row.view_name].push(row);
  }

  // Generate type file
  let output = `export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
`;

  // Generate table types
  for (const [tableName, cols] of Object.entries(tableCols)) {
    output += `      ${tableName}: {\n`;
    output += `        Row: {\n`;
    for (const col of cols) {
      output += `          ${col.column_name}: ${pgToTs(col.udt_name, col.is_nullable, col.custom_type)}\n`;
    }
    output += `        }\n`;
    output += `        Insert: {\n`;
    for (const col of cols) {
      let ts = pgToTs(col.udt_name, col.is_nullable, col.custom_type);
      // For insert, fields with defaults become optional
      const hasDefault = col.column_default !== null || col.is_nullable === 'YES' || col.column_name === 'id';
      if (hasDefault && !ts.includes(' | null')) {
        ts = ts; // Keep as is - user should provide
      }
      if (hasDefault) {
        output += `          ${col.column_name}?: ${ts}\n`;
      } else {
        output += `          ${col.column_name}: ${ts}\n`;
      }
    }
    output += `        }\n`;
    output += `        Update: {\n`;
    for (const col of cols) {
      let ts = pgToTs(col.udt_name, col.is_nullable, col.custom_type);
      output += `          ${col.column_name}?: ${ts}\n`;
    }
    output += `        }\n`;
    output += `        Relationships: []\n`;
    output += `      }\n`;
  }

  output += `    }\n`;
  output += `    Views: {\n`;

  // Generate view types
  for (const [viewName, cols] of Object.entries(viewCols)) {
    output += `      ${viewName}: {\n`;
    output += `        Row: {\n`;
    for (const col of cols) {
      output += `          ${col.column_name}: ${pgToTs(col.udt_name, col.is_nullable, col.custom_type)}\n`;
    }
    output += `        }\n`;
    output += `        Relationships: []\n`;
    output += `      }\n`;
  }

  output += `    }\n`;
  output += `    Functions: {\n`;

  // Get functions
  const functions = await client.query(`
    SELECT p.proname as name,
      pg_get_function_result(p.oid) as return_type,
      pg_get_function_arguments(p.oid) as args
    FROM pg_proc p 
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.prokind = 'f'
    ORDER BY p.proname
  `);

  for (const fn of functions.rows) {
    output += `      ${fn.name}: {\n`;
    output += `        Args: {\n`;
    if (fn.args) {
      for (const arg of fn.args.split(', ')) {
        const [name, ...typeParts] = arg.split(' ');
        const type = typeParts.join(' ');
        let tsType = 'unknown';
        if (type.includes('uuid')) tsType = 'string';
        else if (type.includes('text') || type.includes('varchar')) tsType = 'string';
        else if (type.includes('int') || type.includes('numeric') || type.includes('float')) tsType = 'number';
        else if (type.includes('boolean')) tsType = 'boolean';
        else if (type.includes('jsonb') || type.includes('json')) tsType = 'Json';
        else if (type.includes('[]')) tsType = 'string[]';
        output += `          ${name}: ${tsType}\n`;
      }
    }
    output += `        }\n`;
    let retType = fn.return_type || 'void';
    if (retType === 'void') {
      output += `        Returns: void\n`;
    } else if (retType.includes('TABLE') || retType.includes('record')) {
      output += `        Returns: Record<string, unknown>[]\n`;
    } else {
      let tsRet = 'unknown';
      if (retType.includes('uuid')) tsRet = 'string';
      else if (retType.includes('text') || retType.includes('varchar')) tsRet = 'string';
      else if (retType.includes('int') || retType.includes('numeric')) tsRet = 'number';
      else if (retType.includes('boolean')) tsRet = 'boolean';
      else if (retType === 'jsonb' || retType === 'json') tsRet = 'Json';
      output += `        Returns: ${tsRet}\n`;
    }
    output += `      }\n`;
  }

  output += `    }\n`;
  output += `    Enums: {\n`;

  for (const [enumName, values] of Object.entries(enumMap)) {
    output += `      ${enumName}: ${values.map(v => `"${v}"`).join(' | ')}\n`;
  }

  output += `    }\n`;
  output += `  }\n`;
  output += `}\n`;

  writeFileSync('src/integrations/supabase/types.ts', output);
  console.log('Types generated successfully!');
  console.log(`  Tables: ${Object.keys(tableCols).length}`);
  console.log(`  Views: ${Object.keys(viewCols).length}`);
  console.log(`  Enums: ${Object.keys(enumMap).length}`);
  console.log(`  Functions: ${functions.rows.length}`);

  await client.end();
}

generateTypes().catch(err => {
  console.error(err);
  process.exit(1);
});
