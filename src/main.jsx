import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AigSurfboards from './AigSurfboards'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AigSurfboards />
  </StrictMode>,
)
