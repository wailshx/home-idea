import { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
};

const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="py-20 text-center">
    <Icon className="w-12 h-12 text-gold/30 mx-auto mb-4" />
    <h3 className="font-display text-xl mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
    {action}
  </div>
);

export default EmptyState;
