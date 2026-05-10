import React from 'react'
import path from '../const/Symbol'
interface incomingParams{}

const Info: React.FC<incomingParams> = () => {
    const {imagePaths} = path
    return (
    <div>
        <img src={imagePaths["Info"]} alt="" style={{width: "38vw"}} draggable={false}/>
    </div>
    )
}

export default Info