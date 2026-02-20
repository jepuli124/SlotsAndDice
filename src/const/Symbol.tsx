interface stringDict {
    [key: string] : string
}



const imagePaths: stringDict = {
    "4Leaf" : "./4LeafClover.png",
    "5Leaf" : "./5LeafClover.png",
    "BlackLily" : "./BlackPeaceLily.png",
    "Dice" : "./BlueDice.png",
    "Heart" : "./BurningHeart.png",
    "Box" : "./CardboardBox.png",
    "Cherries" : "./Cherries.png",
    "Coin" : "./Coin.png",
    "Feather" : "./Feather.png",
    "Nut" : "./LeafedAcorn.png",
    "9" : "./Nine.png",
    "Blade" : "./PristineBlade.png",
    "Stick" : "./RedStick.png",
    "6": "./Six.png",
    "7": "./Seven.png",
    "Roller" : "./SlotRoller.png",
    "Slot" : "./SlotSlot.png",
    "Star" : "./Star.png",
    "Glass" : "./WineGlass.png"
}

const imageNameList = [
    "4Leaf",
    "5Leaf",
    "BlackLily",
    "Dice",
    "Heart",
    "Box",
    "Cherries",
    "Coin",
    "Feather",
    "Nut",
    "9",
    "Blade",
    "Stick",
    "6",
    "7",
    "Roller",
    "Slot",
    "Star",
    "Glass"
]

const slotSymbolList = [
    "4Leaf",
    "5Leaf",
    "BlackLily",
    "Dice",
    "Heart",
    "Box",
    "Cherries",
    "Coin",
    "Feather",
    "Nut",
    "9",
    "Blade",
    "6",
    "7",
    "Star",
    "Glass"
]

const commonSlotSymbolList = [
    "4Leaf",
    "Dice",
    "Cherries",
    "Coin",
    "9",
    "6",
    "7",
    "Star",

]

const rareSlotSymbolList = [
    "5Leaf",
    "BlackLily",
    "Heart",
    "Glass",
    "Feather",
    "Nut",
    "Blade",
    "Box"
]

export default { imagePaths, imageNameList, slotSymbolList, commonSlotSymbolList, rareSlotSymbolList }
export type { stringDict }
