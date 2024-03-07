import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import "./index.css";
import Welcome from '@/client/pages/Welcome';

hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <BrowserRouter>
        <Welcome />
    </BrowserRouter>
);