import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/lib/queryClient';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/lib/router';
import { PWA } from '@/components/pwa';

export function Providers() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <PWA />
        </QueryClientProvider>
    );
}
