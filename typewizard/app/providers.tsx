'use client'

import { NextUIProvider } from '../node_modules/@nextui-org/react/dist';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}