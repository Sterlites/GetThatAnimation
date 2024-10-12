"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast}>
          <div className="grid gap-1">
            {toast.title && <h4 className="text-lg">{toast.title}</h4>}
            {(toast as ToasterToast).description && (
              <p className="text-sm">{(toast as ToasterToast).description}</p>
            )}
            {(toast as ToasterToast).action && (
              <div className="mt-2">{(toast as ToasterToast).action}</div>
            )}
          </div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
