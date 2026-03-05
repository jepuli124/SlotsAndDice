import paths from '../const/Symbol'

const RandomSymbol = (LoS: number) => {
      if(Math.random() * LoS >= 6) {
        return RandomRareSymbol(LoS)
      }
      return RandomCommonSymbol()
  }

const RandomCommonSymbol = () => {
    let name: string = paths.commonSlotSymbolList[Math.floor(Math.random() * Object.keys(paths.commonSlotSymbolList).length)]
    return name
}

const RandomRareSymbol = (LoS: number) => {
    let name: string = paths.rareSlotSymbolList[Math.floor(Math.random() * (LoS - 2))]
    return name
}

export {RandomSymbol, RandomCommonSymbol, RandomRareSymbol}