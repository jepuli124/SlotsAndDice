import React from 'react'
import SlotSlot from './SlotSlot'

const SlotRoll: React.FC = () => {
  return (
    <div>
      <img src="./SlotRoller.png" alt="" style={{width: "20%", height: "auto"}}/>
      <div style={{display: 'grid', columnCount: "1"}}>
        <SlotSlot></SlotSlot>
        <SlotSlot></SlotSlot>
        <SlotSlot></SlotSlot>
      </div>
    </div>
  )
}

export default SlotRoll
