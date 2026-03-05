import React, { useRef, useState } from 'react'
import SlotSlot from './SlotSlot'
import '../css/SlotMachine.css'
import { RandomCommonSymbol } from '../hooks/RNGSymbolHook'

interface incomingParams {
  symbols?: string[]

}



const SlotRoll: React.FC<incomingParams> = ({symbols}) => {

  const createSymbolList = (listOfPredeterminedSymbols: (string | undefined)[] = []) => {
    return ([
      {symbol: listOfPredeterminedSymbols[0]}, 
      {symbol: listOfPredeterminedSymbols[1]}, 
      {symbol: listOfPredeterminedSymbols[2]}, 
      {symbol: listOfPredeterminedSymbols[3]}, 
      {symbol: listOfPredeterminedSymbols[4]}])
  }

  const locationList = [
      {location: -33}, 
      {location: 0}, 
      {location: 33}, 
      {location: 66}, 
      {location: 100}]

  const preSymbols = useRef<string[]>(symbols ? symbols : [])
  const animCounter = useRef(0)
  const slowCounter = useRef(1)
  const slotShift = useRef<number>(0) //because useState information doesn't update fast enough
  const update = useState<number>(0) // Because I couldn't use useState below.
  const symbolList = useRef<{symbol: string | undefined}[]>(createSymbolList([RandomCommonSymbol(), ...preSymbols.current])) //because useState information doesn't update fast enough
  const spinSpeed = 10
  
  const resetCounters = () => {
    animCounter.current = 0
    slowCounter.current = 1
    slotShift.current = 0
  }

  if(preSymbols.current !== symbols){
    preSymbols.current = symbols ? symbols : []

    if(animCounter.current == 0){
      const rollAnimationInterval = setInterval(() => {
      animCounter.current += 1
      slotShift.current += spinSpeed / slowCounter.current
      if(slotShift.current >= 33){
        symbolList.current = (createSymbolList([RandomCommonSymbol(), symbolList.current[0].symbol, symbolList.current[1].symbol, symbolList.current[2].symbol, symbolList.current[3].symbol]))
        slotShift.current -= 33
      }
      update[1](causeUpdate => causeUpdate + 1)
      if(animCounter.current >= 100 && slotShift.current <= spinSpeed * 1.5){
        
        animCounter.current = 1 // not 0 to prevent new animation to start playing, but reseted here to have more consistent slow down

        const SlowDownInterval = setInterval(() => {
          animCounter.current += 1
          slotShift.current += spinSpeed / (slowCounter.current + animCounter.current)
          if(slotShift.current >= 33 && slowCounter.current < 3){
            symbolList.current = (createSymbolList([preSymbols.current[preSymbols.current.length-slowCounter.current], symbolList.current[0].symbol, symbolList.current[1].symbol, symbolList.current[2].symbol, symbolList.current[3].symbol]))
            slotShift.current -= 33
            slowCounter.current += 1
            if(slowCounter.current >= 2){
              clearInterval(SlowDownInterval)
              resetCounters()
            }
          } 
          
          update[1](causeUpdate => causeUpdate + 1)

        }, 30)
        
        clearInterval(rollAnimationInterval)
      }

      }, 30)
    }
    
    
  }


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
        {locationList.map((slot, index) => (
          <div key={index} style={{position: 'absolute', top: slot.location + slotShift.current + "%" , width: '80%', display: 'flex', justifyContent: 'center' }}>
            <SlotSlot Symbol={symbolList.current[index].symbol ? symbolList.current[index].symbol : undefined}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlotRoll
