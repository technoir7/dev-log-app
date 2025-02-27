import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (rootElement) {
  try {
    const root = createRoot(rootElement)
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    )
    console.log('App mounted successfully')
  } catch (error) {
    console.error('Failed to render app:', error)
  }
} else {
  console.error('Root element not found')
}
