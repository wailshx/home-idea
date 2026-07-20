import { useState, useCallback } from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

type ToastInput = Omit<Toast, "id">;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

function dispatch(action: { type: "ADD_TOAST" | "DISMISS_TOAST" | "REMOVE_TOAST"; toast?: ToastInput; id?: string }) {
  if (action.type === "ADD_TOAST") {
    const toast = { ...action.toast, id: genId() };
    toasts.push(toast);
  } else if (action.type === "DISMISS_TOAST") {
    if (action.id) {
      const idx = toasts.findIndex((t) => t.id === action.id);
      if (idx > -1) toasts.splice(idx, 1);
    } else {
      toasts.splice(0, toasts.length);
    }
  } else if (action.type === "REMOVE_TOAST") {
    if (action.id) {
      const idx = toasts.findIndex((t) => t.id === action.id);
      if (idx > -1) toasts.splice(idx, 1);
    }
  }
  listeners.forEach((l) => l([...toasts]));
}

export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts);

  const listener = useCallback((newToasts: Toast[]) => {
    setState(newToasts);
  }, []);

  useState(() => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  });

  return {
    toasts: state,
    toast: (props: ToastInput) => {
      dispatch({ type: "ADD_TOAST", toast: props });
      return {
        id: genId(),
        dismiss: () => dispatch({ type: "DISMISS_TOAST" }),
      };
    },
    dismiss: (id?: string) => dispatch({ type: "DISMISS_TOAST", id }),
  };
}

export { dispatch as toast };
