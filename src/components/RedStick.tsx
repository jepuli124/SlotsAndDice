import React, { useState } from 'react'

interface incomingParams{
    spin?: () => void
}

const RedStick: React.FC<incomingParams> = ({ spin = () => {} }) => {
    const [rotate, setRotate] = useState<boolean>(false)

  return (
    <div onClick={() => {
        setRotate(true)
        const rotateTimeout = setTimeout(() => {
            setRotate(false)
            clearTimeout(rotateTimeout)
        }, 150)
        spin()
        }} style={{rotate: rotate ? '180deg' : '0deg', transition: "transform 150ms ease"}}>
      <img src="./RedStick.png" alt="red stick" />
    </div>
  )
}

export default RedStick
