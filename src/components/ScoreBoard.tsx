import { animate, createScope, utils, type Scope } from 'animejs';
import React, { useEffect, useRef, useState } from 'react'
import Paths from '../const/Symbol'
interface incomingParams{
    currentScore?: number,
    currentBet?: number
}

const ScoreBoard: React.FC<incomingParams> = ({currentScore = 9999999999999, currentBet = 0}) => {
    const AnimRefPoint = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);
    const {imagePaths} = Paths
    const score = useRef<number>(currentScore)
    const lastScore = useRef<number>(currentScore)
    const [renderedScore, setRenderedScore] = useState<number>(currentScore)

    const bet = useRef<number>(currentBet)
    const lastBet = useRef<number>(currentBet)
    const [renderedBet, setRenderedBet] = useState<number>(currentBet)

    useEffect(() => {
    
    scope.current = createScope({ root: AnimRefPoint }).add( self => {
        if(!self){ return }

        self.add('setBet', (newBet) => {
            animate(bet, {
                current: newBet,
                ease: 'inOutCirc',
                duration: 500,
                modifier: utils.round(0),
                onUpdate: () => {
                    setRenderedBet(bet.current)
                },
            });
        });
        self.add('setScore', (newScore) => {
            animate(score, {
                current: newScore,
                ease: 'inOutCirc',
                duration: 500,
                modifier: utils.round(0),
                onUpdate: () => {
                    setRenderedScore(score.current)
                },
            });
        });
    });
    
    return () => {
        if(scope.current){ scope.current.revert() }
    }
    }, []);
    
    if(currentBet !== lastBet.current){
        scope?.current?.methods.setBet(currentBet)
        lastBet.current = currentBet
    } 
    if(currentScore !== lastScore.current){
        scope?.current?.methods.setScore(currentScore)
        lastScore.current = currentScore
    } 

    return (
    <div ref={AnimRefPoint} draggable={false}>
        <div style={{position: 'relative', display: 'inline-block'}} draggable={false}>
            <img src={imagePaths["ScoreBoard"]} style={{display: 'block', width: "42vw"}} draggable={false}></img>
            <div style={{ position: 'absolute', fontFamily: "thernaly", fontSize: '1.4vw', color: "#d3d600", inset: 0, display: 'flex', left: "10%", width: "80%", justifyContent: 'space-between', alignContent: 'center' }}>
                <p>Score:</p>
                <p>{renderedScore}</p>
                <p>Bet:</p>
                <p className='betNumber'>{renderedBet}</p>
            </div>
        </div>
    </div>
    )
}

export default ScoreBoard