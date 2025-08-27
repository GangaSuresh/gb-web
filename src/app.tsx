import 'src/global.css';

import { Provider } from 'react-redux';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from 'src/theme/theme-provider';

import { store } from './redux/store';



// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <ThemeProvider>
      <Router />
      </ThemeProvider>
    </Provider>
    
  );
}
