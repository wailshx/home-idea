import { X } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
};

const ConfirmDialog = ({ open, title, description, confirmLabel = "Confirmer", onConfirm, onCancel, danger }: ConfirmDialogProps) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div className="relative bg-card border border-gold/20 p-8 max-w-md w-full mx-4 anim-tilt-in">
        <button onClick={onCancel} className="absolute top-4 right-4 p-1 hover:bg-gold/10">
          <X className="w-4 h-4 text-gold/60" />
        </button>
        <h3 className="font-display text-xl mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground mb-8">{description}</p>
        <div className="flex items-center gap-4 justify-end">
          <button onClick={onCancel} className="px-6 py-2.5 border border-gold/20 text-sm text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors">
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2.5 text-sm font-medium tracking-wide transition-opacity ${
              danger ? "bg-red-600 text-white hover:bg-red-700" : "bg-gradient-gold text-ink hover:opacity-90"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
