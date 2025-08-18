import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { ThemeProvider } from './contexts/ThemeContext'
import { Provider } from 'react-redux'
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
)