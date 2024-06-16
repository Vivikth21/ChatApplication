import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { SocketContextProvider } from './SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </RecoilRoot>


  </React.StrictMode>,
)
