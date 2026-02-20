import { useState } from 'react'
import './App.css'
import SlotMachine from './components/SlotMachine'
import Dices from './components/Dices'

function App() {
  const [mode, setMode] = useState(false)

  return (
    <>
      <button onClick={() => setMode(mode => !mode)}>Change Mode</button>
      {mode ? <Dices></Dices> : <SlotMachine></SlotMachine>}
      
    </>
  )
}

export default App
