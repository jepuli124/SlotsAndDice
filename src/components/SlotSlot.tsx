import React from 'react'
import paths from '../const/Symbol'
import { RandomCommonSymbol } from '../hooks/RNGSymbolHook'

interface incomingParams{
    symbol?: string
}
const SlotSlot: React.FC<incomingParams> = ({ symbol }) => {
    const {imagePaths} = paths


    //const [symbol, setSymbol] = useState<string>(symbol ?? RandomCommonSymbol())
    if(symbol == undefined){
      symbol = RandomCommonSymbol()
    }


    return (
        <div  style={{ position: 'relative', display: 'inline-block', width: "100%", height: "auto"}} >
        <img src={imagePaths["Slot"]} alt="" style={{ display: 'block', alignSelf: "center", width: "100%", height: "auto" }}/>
        <div >
          {symbol ? <img  src={imagePaths[symbol]} alt=""  //Don't animate this, something just brakes.
            
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '80%',
              maxHeight: '80%'
            }}
            
            /> : <></>}
        </div>
        
        
      </div>
    
  )
}

export default SlotSlot
