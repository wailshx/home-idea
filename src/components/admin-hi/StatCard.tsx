import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: { value: number; positive: boolean };
};

const StatCard = ({ icon: Icon, label, value, change }: StatCardProps) => (
  <div className="p-6 border border-gold/15 bg-card hover:border-gold/30 transition-colors">
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 grid place-items-center border border-gold/25">
        <Icon className="w-5 h-5 text-gold" />
      </div>
      {change && (
        <div className={`flex items-center gap-1 text-xs ${change.positive ? "text-green-400" : "text-red-400"}`}>
          {change.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change.value)}%
        </div>
      )}
    </div>
    <div className="font-display text-2xl mb-1">{value}</div>
    <div className="text-[10px] tracking-[0.2em] uppercase text-gold/60">{label}</div>
  </div>
);

export default StatCard;
