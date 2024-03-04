import { hydrateRoot } from 'react-dom/client';
import App from '@/client/components/App';
 
hydrateRoot(document.getElementById('root') as HTMLElement, <App />)