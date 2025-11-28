import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { AuthProvider } from './AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)

