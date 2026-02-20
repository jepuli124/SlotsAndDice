import React from 'react'
import paths from '../const/Symbol'

interface incomingParams{
    Symbol?: string
}
const SlotSlot: React.FC<incomingParams> = ({ Symbol }) => {
    const {imagePaths} = paths


    return (
    <div style={{ position: 'relative', display: 'inline-block', width: "100%", height: "auto"}}>
      <img src={imagePaths["Slot"]} alt="" style={{ display: 'block', alignSelf: "center", width: "100%", height: "auto" }}/>
      {Symbol ? <img src={imagePaths[Symbol]} alt=""  style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '80%',
          maxHeight: '80%' 
        }}/> : <></>}
      
    </div>
  )
}

export default SlotSlot
