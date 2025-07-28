// src/App.jsx
import { useEffect } from 'react'
import './index.css'
import PortfolioApp from './main/PortfolioApp'

function App() {
  // Prevent scroll restoration to avoid layout jumps
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  return <PortfolioApp />
}

export default App