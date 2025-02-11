import { isAuthenticated } from '@/lib/authentication';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauthorized')({
    beforeLoad: () => {
        if (isAuthenticated()) {
            throw redirect({
                to: '/',
            });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <Outlet />
        </>
    );
}
