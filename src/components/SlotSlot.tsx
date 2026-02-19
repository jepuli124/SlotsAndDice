import React, { useRef, useState } from 'react'
import paths from '../const/Symbol'

interface incomingParams{
    reroll: number
}
const SlotSlot: React.FC<incomingParams> = ({ reroll }) => {
    const {imagePaths, slotSymbolList} = paths
    const previousReroll = useRef<number>(reroll)
    const RandomSymbol = () => {
        let name: string = slotSymbolList[Math.floor(Math.random() * Object.keys(slotSymbolList).length)]
        console.log(name, imagePaths[name])
        return imagePaths[name]
    }
    const [Symbol, setSymbol] = useState<string>(RandomSymbol())
  
    if(previousReroll.current !== reroll){
        previousReroll.current = reroll
        setSymbol(RandomSymbol)
    } 

    return (
    <div style={{ position: 'relative', display: 'inline-block', width: "100%", height: "auto"}}>
      <img src={imagePaths["Slot"]} alt="" style={{ display: 'block', alignSelf: "center", width: "100%", height: "auto" }}/>
      <img src={Symbol} alt=""  style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '80%',
          maxHeight: '80%' 
        }}/>
    </div>
  )
}

export default SlotSlot
