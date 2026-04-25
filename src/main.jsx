import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// CRITICAL FIX: This line imports Tailwind and your global styles!
import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
