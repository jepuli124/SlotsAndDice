import React from 'react'
import SlotRoll from './SlotRoll'
import RedStick from './RedStick'

const SlotMachine: React.FC = () => {
  return (
    <div style={{ display: 'flex', maxWidth: "100vw", height: "auto"}}>
      <SlotRoll></SlotRoll>
      <SlotRoll></SlotRoll>
      <SlotRoll></SlotRoll>
      <SlotRoll></SlotRoll>
      <SlotRoll></SlotRoll>
      <RedStick></RedStick>
    </div>
  )
}

export default SlotMachine
