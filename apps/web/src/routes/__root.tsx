import { Devtools } from '@/components/devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Outlet />
            <Devtools />
        </>
    );
}
