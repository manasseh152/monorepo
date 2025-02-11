import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import PWABadge from '@/components/pwa-check';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Outlet />
            <PWABadge />
            <ReactQueryDevtools />
            <TanStackRouterDevtools />
        </>
    );
}
