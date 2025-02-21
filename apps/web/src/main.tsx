import '@/lib/i18n';
import '@/assets/styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Providers } from '@/providers';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Providers />
    </StrictMode>,
);
