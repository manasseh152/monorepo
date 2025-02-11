import { createFileRoute, Link, useRouter } from '@tanstack/react-router';

import { useRegisterForm } from '@/forms/register';

export const fallbackRedirect = '/' as const;

export const Route = createFileRoute('/_unauthorized/register/')({
    component: RouteComponent,
});

function RouteComponent() {
    const router = useRouter();
    const navigate = Route.useNavigate();

    const { Field, handleSubmit } = useRegisterForm({
        onScuccess: () => {
            router.invalidate();

            navigate({ to: fallbackRedirect });
        },
        onFail: (error) => console.error(error),
    });

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleSubmit();
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2 p-4">
            <Field name="username">
                {({ state, handleBlur, handleChange }) => (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            </Field>
            <Field name="email">
                {({ state, handleBlur, handleChange }) => (
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            </Field>
            <Field name="password">
                {({ state, handleBlur, handleChange }) => (
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            </Field>
            <Field name="confirmPassword">
                {({ state, handleBlur, handleChange }) => (
                    <input
                        type="password"
                        name="confirm-password"
                        placeholder="Confirm Password"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            </Field>
            <button
                type="submit"
                className="h-10 w-full rounded-md border border-input bg-primary font-medium text-base hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
                Submit
            </button>
            <Link to="/login" className="text-center">
                Login
            </Link>
        </form>
    );
}
