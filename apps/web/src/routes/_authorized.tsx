import {
    createFileRoute,
    Outlet,
    redirect,
    useRouter,
} from '@tanstack/react-router';

import { isAuthenticated, logout, useCurrentUser } from '@/lib/authentication';

export const Route = createFileRoute('/_authorized')({
    beforeLoad: ({ location }) => {
        if (!isAuthenticated()) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    const router = useRouter();
    const navigate = Route.useNavigate();

    const { username, createdAt } = useCurrentUser(true);

    function onClick() {
        logout();

        router.invalidate();

        navigate({ to: '/login' });
    }

    return (
        <>
            <header className="flex items-top justify-between p-4">
                <div>
                    <h1 className="text-2xl font-bold mb-2">
                        Welcome back, {username}!
                    </h1>
                    <p className="text-gray-600">
                        Your account was created on{' '}
                        {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>
                <button
                    className="h-min border border-red-500 text-red-500 px-4 py-2 rounded-md"
                    onClick={onClick}
                >
                    Logout
                </button>
            </header>

            <Outlet />
        </>
    );
}
