import { hydrateRoot } from 'react-dom/client';
import App from '@/client/components/App';
import "./index.css"
 
hydrateRoot(document.getElementById('root') as HTMLElement, <App />)