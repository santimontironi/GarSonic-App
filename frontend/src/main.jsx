import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './static/css/index.css'
import './static/css/hover.css'
import { UserProvider }from './context/user/UserProvider.jsx'
import ArtistProvider from './context/artist/ArtistProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ArtistProvider>
        <App />
      </ArtistProvider>
    </UserProvider>
  </StrictMode>,
)
