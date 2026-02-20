import React, { useRef, useState } from 'react'
import SlotRoll from './SlotRoll'
import RedStick from './RedStick'
import paths from '../const/Symbol'
import { PatternDetector } from '../hooks/PatternHook'
import { getFromStore } from '../hooks/StorageHook'

const ColumnCount = 5 // how many colums are in the slot machine.
const SlotCount = 3 // how many slots are in the slot machine.

const makeColumnList = (number: number) => {
  const newList = []
  for (let index = 0; index < number; index++) {newList[index] = index}
  return newList
}
const columnlist = makeColumnList(ColumnCount)

const LosCheck = () => {
  let NoSF = 0
  const SL = []
  SL.push(getFromStore("Glass"))
  SL.push(getFromStore("Nut"))
  SL.push(getFromStore("Feather"))
  SL.push(getFromStore("Heart"))
  SL.push(getFromStore("BlackLily"))
  SL.push(getFromStore("5leaf"))
  SL.push(getFromStore("Blade"))
  SL.push(getFromStore("Box"))
  SL.push(getFromStore("Slay"))
  for (let index = 0; index < SL.length; index++) {
    if(SL[index] !== null && SL[index] !== false && SL[index] !== undefined){
      NoSF += 1
    }
  }
  
  return NoSF + 1 // starting value is 1 = RNG [1, 100]    
}

const SlotMachine: React.FC = () => {
  

  const LoS = useRef<number>(LosCheck()) 
  const { commonSlotSymbolList, rareSlotSymbolList} = paths
  const [symbols, setSymbol] = useState<string[][] | undefined>(undefined)

  const RandomSymbol = () => {
      if(Math.random() * LoS.current >= 6) {
        return RandomRareSymbol()
      }
      return RandomCommonSymbol()
  }

  const RandomCommonSymbol = () => {
      let name: string = commonSlotSymbolList[Math.floor(Math.random() * Object.keys(commonSlotSymbolList).length)]
      return name
  }

  const RandomRareSymbol = () => {
      let name: string = rareSlotSymbolList[Math.floor(Math.random() * (LoS.current - 2))]
      return name
  }

  const checkForPatterns = (lines: string [][]) => {
    const detector = new PatternDetector(lines)
    const result = detector.detectAllPatterns();
    console.log(result)
  }

  // const lightshow = () => {

  // }

  const fillWithChosenSymbols = (symbols: string[]) => {
    const newSymbols: string[][] = [Array(5), Array(5), Array(5), Array(5), Array(5)]
    for (let column = 0; column < ColumnCount; column++) {
        for (let slot = 0; slot < SlotCount; slot++) {
          newSymbols[column][slot] = symbols[Math.floor(Math.random() * Object.keys(symbols).length)]
        }
      }
    return newSymbols
  }
  const fillAllWith = (name = RandomCommonSymbol()) => {
    const newSymbols: string[][] = [Array(5), Array(5), Array(5), Array(5), Array(5)]
    for (let column = 0; column < ColumnCount; column++) {
        for (let slot = 0; slot < SlotCount; slot++) {
          newSymbols[column][slot] = name
        }
      }
    return newSymbols
  }

  const randomSlots = () => {
    const newSymbols: string[][] = [Array(5), Array(5), Array(5), Array(5), Array(5)]
    for (let column = 0; column < ColumnCount; column++) {
        for (let slot = 0; slot < SlotCount; slot++) {
          newSymbols[column][slot] = RandomSymbol()
        }
      }
    return newSymbols
  }
  const randomCommonSlots = () => {
    const newSymbols: string[][] = [Array(5), Array(5), Array(5), Array(5), Array(5)]
    for (let column = 0; column < ColumnCount; column++) {
        for (let slot = 0; slot < SlotCount; slot++) {
          newSymbols[column][slot] = RandomCommonSymbol()
        }
      }
    return newSymbols
  }
  const randomRareSlots = () => {
    const newSymbols: string[][] = [Array(5), Array(5), Array(5), Array(5), Array(5)]
    for (let column = 0; column < ColumnCount; column++) {
        for (let slot = 0; slot < SlotCount; slot++) {
          newSymbols[column][slot] = RandomRareSymbol()
        }
      }
    return newSymbols
  }

  const roll = (forceRandom = false, forceNumber = -1) => {
    let RNG = 0
    let newSymbols: string[][] = []
    if(!forceRandom){
      RNG = Math.floor(Math.random()*100*LoS.current) + 1
    }
    if(forceNumber != -1){
      RNG = forceNumber
    }
    
    if(RNG == 1){
      newSymbols = [["Dice", "Dice", "Dice"], ["6", "6", "6"], ["Dice", "Dice", "Dice"], ["6", "6", "6"], ["Dice", "Dice", "Dice"]]
    } else if (RNG === 6) {
      newSymbols = fillWithChosenSymbols(["6", "7", "9"])
    } else if (RNG === 7) { 
      newSymbols = fillAllWith()
    } else if (RNG === 69) {
      newSymbols = fillWithChosenSymbols(["6", "9"])
    } else if (RNG === 77) {
      newSymbols = [["4Leaf", "4Leaf", "4Leaf"], ["4Leaf", "4Leaf", "4Leaf"], ["4Leaf", "4Leaf", "4Leaf"], ["4Leaf", "4Leaf", "4Leaf"], ["4Leaf", "4Leaf", "4Leaf"]]
    } else if (RNG === 420) {
      newSymbols = fillWithChosenSymbols(["4Leaf", "5Leaf"])
    } else if (RNG === 666) {
      newSymbols = fillAllWith("6")
    } else if (RNG === 777) {
      newSymbols = fillAllWith("7")
    } else if (RNG === 999) {
      newSymbols = fillAllWith("9")
    } else if (RNG === 1000) {
      newSymbols = [["5Leaf", "Glass", "5Leaf"], ["5Leaf", "Heart", "5Leaf"], ["Blade", "BlackLily", "Box"], ["5Leaf", "Nut", "5Leaf"], ["5Leaf", "Feather", "5Leaf"]]
    } else if (RNG > 984) { // 1.5 % change to happen
      newSymbols = randomRareSlots()
    } else if (RNG > 777) {
      newSymbols = randomSlots()
    } else {
      newSymbols = randomCommonSlots()
    }
    checkForPatterns(newSymbols)
    setSymbol(newSymbols)
  } 


  if(symbols == undefined){
    roll(true, 7)
  }
  
  return (
    <div style={{justifyItems: "center", width: "99vw"}}>
      <div style={{ display: 'flex', width: "100%", height: "auto"}}>
      {columnlist.map((_, index) => (
          <div key={index} style={{maxWidth: "20%", height: "auto" }}>
            <SlotRoll symbols={symbols ? symbols[index] : undefined}></SlotRoll>
          </div>
        ))}
      </div>
    
      <div style={{width: "10%", height: "auto"}}>
        <RedStick spin={() => {
          roll()
        }}></RedStick>
      </div>
      
    </div>
  )
}

export default SlotMachine
