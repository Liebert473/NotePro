import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NoteBoard from './components/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NoteBoard/>
  </StrictMode>,
)
