import { ResetRef } from '@suspensive/react-boundary';
declare const ResetKeyQueryErrorBoundary: import("react").ForwardRefExoticComponent<Pick<{
    resetKeys?: unknown[] | undefined;
    onReset?(): void;
    onError?(error: Error, info: import("react").ErrorInfo): void;
    fallback: import("react").ReactNode | ((props: {
        error: Error;
        reset: (...args: unknown[]) => void;
    }) => import("react").ReactNode);
} & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<ResetRef>, "key" | "children" | "fallback" | "onReset" | "onError" | "resetKeys"> & import("react").RefAttributes<ResetRef>>;
export declare const QueryErrorBoundary: import("react").ForwardRefExoticComponent<{
    resetKeys?: unknown[] | undefined;
    onReset?(): void;
    onError?(error: Error, info: import("react").ErrorInfo): void;
    fallback: import("react").ReactNode | ((props: {
        error: Error;
        reset: (...args: unknown[]) => void;
    }) => import("react").ReactNode);
} & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<ResetRef>> & {
    ResetKey: typeof ResetKeyQueryErrorBoundary;
};
export {};
