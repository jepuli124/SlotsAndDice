import React, { useState } from 'react'

const Dices: React.FC = () => {

    const[number, setNumber] = useState<number>(0)

  return (
    <div>   
        <div style={{ display: 'flex'}}>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*2))
            }}>D2</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*4))
            }}>D4</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*6))
            }}>D6</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*7))
            }}>D7</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*8))
            }}>D8</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*10))
            }}>D10</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*12))
            }}>D12</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*20))
            }}>D20</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*24))
            }}>D24</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*30))
            }}>D30</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*60))
            }}>D60</button>
            <button onClick={() => {
            setNumber(Math.floor(Math.random()*100))
            }}>D100</button>
        </div>
        

        <h1>{number}</h1>
    </div>
  )
}

export default Dices
