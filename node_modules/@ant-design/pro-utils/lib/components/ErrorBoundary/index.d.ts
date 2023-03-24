import type { ErrorInfo } from 'react';
import React from 'react';
declare class ErrorBoundary extends React.Component<{
    children?: React.ReactNode;
}, {
    hasError: boolean;
    errorInfo: string;
}> {
    state: {
        hasError: boolean;
        errorInfo: string;
    };
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
        errorInfo: string;
    };
    componentDidCatch(error: any, errorInfo: ErrorInfo): void;
    render(): string | number | boolean | JSX.Element | React.ReactFragment | null | undefined;
}
export { ErrorBoundary };
