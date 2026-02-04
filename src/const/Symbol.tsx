interface stringDict {
    [key: string] : string
}

const imagePaths: stringDict = {
    "4Leaf" : "./4LeafClover.png",
    "5Lead" : "./5LeafClover.png",
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
    "6": "./six.png",
    "Roller" : "./SlotRoller.png",
    "Slot" : "./SlotSlot.png",
    "Star" : "./Star,.png",
    "Glass" : "./WineGlass.png"
}

const imageNameList = [
    "4Leaf",
    "5Lead",
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
    "Roller",
    "Slot",
    "Star",
    "Glass"
]

export default { imagePaths, imageNameList }
export type { stringDict }
