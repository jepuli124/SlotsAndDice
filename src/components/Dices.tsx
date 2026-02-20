import React, { useState } from 'react'

const Dices: React.FC = () => {

    const[number, setNumber] = useState<number>(0)

    const RandomNumber = (multiplier: number) => {

      const timeOut1 = setTimeout(() => {
        clearTimeout(timeOut1)
        setNumber(Math.floor(Math.random()*multiplier) + 1)
      }, 100)
      const timeOut2 = setTimeout(() => {
        clearTimeout(timeOut2)
        setNumber(Math.floor(Math.random()*multiplier) + 1)
      }, 200)
      const timeOut3 = setTimeout(() => {
        clearTimeout(timeOut3)
        setNumber(Math.floor(Math.random()*multiplier) + 1)
      }, 300)
      const timeOut4 = setTimeout(() => {
        clearTimeout(timeOut4)
        setNumber(Math.floor(Math.random()*multiplier) + 1)
      }, 400)
      const timeOut5 = setTimeout(() => {
        clearTimeout(timeOut5)
        setNumber(Math.floor(Math.random()*multiplier) + 1)
      }, 500)
      
    }

  return (
    <div>   
        <div style={{ display: 'flex', alignContent: "center", justifyContent: "center"}}>
            <button onClick={() => {
              RandomNumber(2)
            }}>D2</button>
            <button onClick={() => {
              RandomNumber(4)
            }}>D4</button>
            <button onClick={() => {
              RandomNumber(6)
            }}>D6</button>
            <button onClick={() => {
              RandomNumber(7)
            }}>D7</button>
            <button onClick={() => {
              RandomNumber(8)
            }}>D8</button>
            <button onClick={() => {
              RandomNumber(9)
            }}>D10</button>
            <button onClick={() => {
              RandomNumber(10)
            }}>D12</button>
            <button onClick={() => {
              RandomNumber(12)
            }}>D20</button>
            <button onClick={() => {
              RandomNumber(20)
            }}>D24</button>
            <button onClick={() => {
              RandomNumber(24)
            }}>D30</button>
            <button onClick={() => {
              RandomNumber(60)
            }}>D60</button>
            <button onClick={() => {
              RandomNumber(100)
            }}>D100</button>
        </div>
        

        <h1>{number}</h1>
    </div>
  )
}

export default Dices
