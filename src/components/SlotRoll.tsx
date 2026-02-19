import React from 'react'
import SlotSlot from './SlotSlot'

interface incomingParams {
  reroll: number
}

const SlotRoll: React.FC<incomingParams> = ({reroll}) => {
  return (
    <div style={{ 
      position: 'relative', 
      display: 'inline-block', 
      width: 'fit-content', // Container shrinks to fit content
      height: 'fit-content',
     }}>
      <img src="./SlotRoller.png" alt="" style={{
        width: "100%", 
        height: "auto", 
        display: "block" }} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: "5%",
        left: 0,
        right: 0,
        bottom: "5%",
        //gap: '1px',
        alignItems: 'center', 
        justifyItems: 'center', 
        justifyContent: 'space-evenly',
        overflow: "hidden"
      }}>
        {[1, 2, 3].map((_, index) => (
          <div key={index} style={{ width: '80%', display: 'flex', justifyContent: 'center' }}>
            <SlotSlot reroll={reroll}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlotRoll
