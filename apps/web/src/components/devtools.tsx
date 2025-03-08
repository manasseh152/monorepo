import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { env } from '@/config/env';

export function Devtools() {
    if (env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <>
            <ReactQueryDevtools />
            <TanStackRouterDevtools />
        </>
    );
}
