import { useRegisterSW } from 'virtual:pwa-register/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
``;
import { syncInterval } from '@/config/pwa';

export function PWA() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            if (syncInterval <= 0) return;
            if (r?.active?.state === 'activated') {
                registerPeriodicSync(syncInterval, swUrl, r);
            } else if (r?.installing) {
                r.installing.addEventListener('statechange', (e) => {
                    const sw = e.target as ServiceWorker;
                    if (sw.state === 'activated')
                        registerPeriodicSync(syncInterval, swUrl, r);
                });
            }
        },
    });

    function close() {
        setOfflineReady(false);
        setNeedRefresh(false);
    }

    useEffect(() => {
        if (offlineReady) {
            toast.success('App is ready to work offline', {
                duration: Infinity,
                onDismiss: close,
            });
        }
    }, [offlineReady]);

    useEffect(() => {
        if (needRefresh) {
            toast.info('New version available', {
                duration: Infinity,
                action: (
                    <>
                        <Button onClick={updateServiceWorker}>Refresh</Button>
                    </>
                ),
                onDismiss: close,
            });
        }
    }, [needRefresh]);

    return null;
}

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(
    syncInterval: number,
    serviceWorkerEndpoint: string,
    serviceWorkerRegistration: ServiceWorkerRegistration,
) {
    if (syncInterval <= 0) return;

    setInterval(async () => {
        if ('onLine' in navigator && !navigator.onLine) return;

        const resp = await fetch(serviceWorkerEndpoint, {
            cache: 'no-store',
            headers: {
                cache: 'no-store',
                'cache-control': 'no-cache',
            },
        });

        if (resp?.status === 200) await serviceWorkerRegistration.update();
    }, syncInterval);
}
