import React, { useEffect, useRef, useState } from 'react'
import SlotSlot from './SlotSlot'
import '../css/SlotMachine.css'
import { RandomCommonSymbol } from '../hooks/RNGSymbolHook'
import { animate, createScope, cubicBezier, type Scope } from 'animejs'

interface incomingParams {
  symbols?: string[],
  winningSlots?: number[],
  slotIndex?: number

}



const SlotRoll: React.FC<incomingParams> = ({symbols, winningSlots, slotIndex = 0}) => {
  const AnimRefPoint = useRef<HTMLDivElement>(null);
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
  const winningSlotsRef = useRef<number[]>(winningSlots ? winningSlots : [])
  const [symbolList, setSymbolList] = useState<{location: number, symbol: string | undefined}[]>(createSymbolList([RandomCommonSymbol(), ...preSymbols.current])) 
  const spinSpeed = 100
  const spinPerRoll = 50 + (slotIndex * 10)
  const startDelay = 0 + (slotIndex * 50)
  const [spinAmount, setSpinAmount] = useState<number>(0)
  
  const handleSpinSlot = (spin: number) => {
    
    if(!scope.current){
      return 
    }
    if(spin <= 1){
      scope.current.methods.startSlots(spin);
    }
    else if (spin < spinPerRoll) {
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
  const addFixedSymbol = (index: number) => {
    setSymbolList(prev => {
      return [{location: prev[0].location + 1, symbol: preSymbols.current[index]}, ...prev]
    })
  }
  const removeOldSymbol = () => {
    setSymbolList(prev => {
      return [ ...prev.slice(0, -1)]
    })
  }
  const resetSlots = () => { // to prevent slots shifting, altought (spin/3) in animation should fix it.
    
    setSymbolList(prev => {
      const ListOfSymbols = []
      for (let index = 0; index < prev.length; index++) {
        ListOfSymbols.push(prev[index].symbol);
        
      }
      if(scope.current){
        scope.current.methods.resetSlots();   
        //This and setSpinAmount are here to force them to update 
        //simultaniously on same frame to prevent the slots from blinking
      }
      setSpinAmount(0)
      return createSymbolList(ListOfSymbols)
    }) 
  }
  const showWinningSlots = () => {
    if(scope.current && winningSlotsRef.current.length > 0){
      scope.current.methods.showWinningSlots();   
    }
  }

  useEffect(() => {

    scope.current = createScope({ root: AnimRefPoint }).add( self => {
        if(!self){ return }
        self.add('startSlots', (spin: number) => {
          animate('.slot', {
            y: (spin * spinSpeed) + '%',
            ease: cubicBezier(0.87,-0.646,0.97,0.278),
            delay: startDelay,
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
            y: (spin * spinSpeed) - (spin/3)  + '%', //-(spin/3) fixes rounding errors that causes animation to shift.
            duration: 50,
            ease: 'none',
            onBegin: () => {
              
              if(spinPerRoll-spin > 3){
                addNewSymbol()
              } else {
                addFixedSymbol(spinPerRoll-spin-1)
              }
              removeOldSymbol()
            },
            onComplete: () => handleSpinSlot(spin + 1)
          });
        });
        self.add('stopSlots', (spin: number) => {
          animate('.slot', {
            y: (spin * spinSpeed) - (spin/3) + '%', //-(spin/3) fixes rounding errors that causes animation to shift.
            ease: cubicBezier(0.044,0.704,0.207,1.877),
            duration: 1000,
            onBegin: () => {
              addNewSymbol()
              removeOldSymbol()
            },
            onComplete: () => {
              resetSlots()
              showWinningSlots()
            }
          });
        });
        self.add('resetSlots', () => {
          animate('.slot', {
            y: 0 + '%',
            ease: 'none',
            duration: 0,
          });
        });
        self.add('showWinningSlots', () => {
          animate('.winningSlot', {
            scale: [1, 1.15, 0.75, 1.15, 1],
            rotate: [0, 30, 0, -30, 0],
            ease: 'inOut',
            duration: 1500,
          });
        });
    });

    return () => {
        if(scope.current){ scope.current.revert() }
    }
  }, []);



  if(preSymbols.current !== symbols && spinAmount == 0){
    preSymbols.current = symbols ? symbols : []
    setSpinAmount(() => {
      handleSpinSlot(1)
      return 1
    })

  }

  if(winningSlotsRef.current !== winningSlots && winningSlots){
    winningSlotsRef.current = winningSlots
  }

  return (
    <div ref={AnimRefPoint} 
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
          <div className={winningSlotsRef.current.includes(index-1) ? 'slot winningSlot' : 'slot' } key={index} style={{position: 'absolute', top: (100 - (slot.location * 33.333333)) + "%" , width: '80%', display: 'flex', justifyContent: 'center' }}>
            <SlotSlot Symbol={slot.symbol ? slot.symbol : undefined}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlotRoll
