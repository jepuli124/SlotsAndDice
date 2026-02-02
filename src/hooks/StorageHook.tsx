

const storeNew = (storableKey: string, storableValue: string) =>{
    if(!localStorage.getItem(storableKey)){
        localStorage.setItem(storableKey, storableValue)
        return true
    } 
    return false
}

const storeExisting = (storableKey: string, storableValue: string) =>{
    if(localStorage.getItem(storableKey)){
        localStorage.setItem(storableKey, storableValue)
        return true
    } 
    return false
}

const store = (storableKey: string, storableValue: string) =>{
    localStorage.setItem(storableKey, storableValue)
}

const getFromStore = (storableKey: string) => {
    if(localStorage.getItem(storableKey)){
        return localStorage.getItem(storableKey)
    } 
    return false
}


const existInStore = (storableKey: string) => {
    if(localStorage.getItem(storableKey)){
        return true
    } 
    return false
}

const removeFromStore = (storableKey: string) => {
        if(localStorage.getItem(storableKey)){
        localStorage.removeItem(storableKey)
        return true
    } 
    return false
}
export {store, storeExisting, storeNew, getFromStore, existInStore, removeFromStore}


