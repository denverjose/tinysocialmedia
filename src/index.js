import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { ProfileContextProvider } from './store/profile-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ProfileContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ProfileContextProvider>
  </AuthContextProvider>
);