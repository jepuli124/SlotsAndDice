import React, { useState } from 'react'
import SlotRoll from './SlotRoll'
import RedStick from './RedStick'

const SlotMachine: React.FC = () => {
  const [reroll, setReroll] = useState<number>(0)
  return (
    <div style={{justifyItems: "center", width: "99vw"}}>
      <div style={{ display: 'flex', width: "100%", height: "auto"}}>
      {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} style={{maxWidth: "20%", height: "auto" }}>
            <SlotRoll reroll={reroll}></SlotRoll>
          </div>
        ))}
      </div>
    
      <div style={{width: "10%", height: "auto"}}>
        <RedStick spin={() => {
          setReroll(reroll => reroll + 1)
        }}></RedStick>
      </div>
      
    </div>
  )
}

export default SlotMachine
