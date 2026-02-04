import React, { useState } from 'react'
import paths from '../const/Symbol'


const SlotSlot: React.FC = () => {
    const {imagePaths, imageNameList} = paths
    const [Symbol, setSymbol] = useState<string>(imagePaths['4Leaf'])
  
    const RandomSymbol = () => {
        let name: string = imageNameList[Math.floor(Math.random() * Object.keys(imageNameList).length)]
        if(name in Object.keys(imagePaths)){
            setSymbol(imagePaths[name])
        }   
        
    }
    return (
    <div>
      <img src={imagePaths["Slot"]} alt="" />
      <img src={Symbol} alt="" />
    </div>
  )
}

export default SlotSlot
