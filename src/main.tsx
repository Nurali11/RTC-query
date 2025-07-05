import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.tsx'
import { GlobalContext } from './context/Context.tsx'

createRoot(document.getElementById('root')!).render(
  <GlobalContext>
    <Provider store={store}>
      <App />
    </Provider>,
  </GlobalContext>
)
