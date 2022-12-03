export type ToastType = "success" | "warning" | "info" | "error"

export interface Toast {
    type: ToastType
    message: string
    display: boolean
} 