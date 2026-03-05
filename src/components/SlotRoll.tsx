import React, { useEffect, useRef, useState } from 'react'
import SlotSlot from './SlotSlot'
import '../css/SlotMachine.css'
import { RandomCommonSymbol } from '../hooks/RNGSymbolHook'
import { animate, createScope, cubicBezier, utils, type Scope } from 'animejs'

interface incomingParams {
  symbols?: string[]

}



const SlotRoll: React.FC<incomingParams> = ({symbols}) => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);
  const createSymbolList = (listOfPredeterminedSymbols: (string | undefined)[] = []) => {
    return ([
      {location: 4, symbol: listOfPredeterminedSymbols[0]}, 
      {location: 3, symbol: listOfPredeterminedSymbols[1]}, 
      {location: 2, symbol: listOfPredeterminedSymbols[2]}, 
      {location: 1, symbol: listOfPredeterminedSymbols[3]}, 
      {location: 0, symbol: listOfPredeterminedSymbols[4]},
      {location: -1, symbol: listOfPredeterminedSymbols[5]},
    ])
  }


  const preSymbols = useRef<string[]>(symbols ? symbols : []) 
  const [symbolList, setSymbolList] = useState<{location: number, symbol: string | undefined}[]>(createSymbolList([RandomCommonSymbol(), ...preSymbols.current])) 
  const spinSpeed = 100
  const SpinPerRoll = 50
  const [spinAmount, setSpintAmount] = useState<number>(0)
  
  const handleSpinSlot = (spin: number) => {
    
    if(!scope.current){
      return 
    }
    if(spin <= 1){
      scope.current.methods.startSlots(spin);
    }
    else if (spin < SpinPerRoll) {
      scope.current.methods.spinSlots(spin);
    } else {
      scope.current.methods.stopSlots(spin);
    }
    
  };

  const addNewSymbol = () => {
    setSymbolList(prev => {
      return [{location: prev[0].location + 1, symbol: RandomCommonSymbol()}, ...prev]
    })
  }
  const removeOldSymbol = () => {
    setSymbolList(prev => {
      return [ ...prev.slice(0, -1)]
    })
  }

  useEffect(() => {

    scope.current = createScope({ root }).add( self => {
        if(!self){ return }
        self.add('startSlots', (spin: number) => {
          animate('.slot', {
            y: (spin * spinSpeed) + '%',
            ease: cubicBezier(0.87,-0.646,0.97,0.278),
            duration: 1000,
            onBegin: () => {
              addNewSymbol()
              removeOldSymbol()
            },
            onComplete: () => handleSpinSlot(spin + 1)
          });
        });
        self.add('spinSlots', (spin: number) => {
          animate('.slot', {
            y: (spin * spinSpeed) + '%',
            duration: 50,
            ease: 'none',
            onBegin: () => {
              addNewSymbol()
              removeOldSymbol()
            },
            onComplete: () => handleSpinSlot(spin + 1)
          });
        });
        self.add('stopSlots', (spin: number) => {
          animate('.slot', {
            y: (spin * spinSpeed) + '%',
            ease: cubicBezier(0.044,0.704,0.207,1.877),
            duration: 1000,
            onBegin: () => {
              addNewSymbol()
              removeOldSymbol()
            },
            onComplete: () => {setSpintAmount(0)}
          });
        });
    });

    return () => {
        if(scope.current){ scope.current.revert() }
    }
  }, []);



  if(preSymbols.current !== symbols && spinAmount == 0){
    preSymbols.current = symbols ? symbols : []
    setSpintAmount(() => {
      handleSpinSlot(1)
      return 1
    })

  }

  return (
    <div ref={root} 
      style={{ 
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
        {symbolList.map((slot, index) => (
          <div className='slot' key={index} style={{position: 'absolute', top: (100 - (slot.location * 33.33)) + "%" , width: '80%', display: 'flex', justifyContent: 'center' }}>
            <SlotSlot Symbol={slot.symbol ? slot.symbol : undefined}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlotRoll
