import { createScope, type Scope } from 'animejs';
import React, { useEffect, useRef } from 'react'
import Paths from '../const/Symbol'
interface incomingParams{
    score?: number
}

const ScoreBoard: React.FC<incomingParams> = ({score = 99999999999}) => {
    const AnimRefPoint = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);
    const {imagePaths} = Paths
    useEffect(() => {
    
    scope.current = createScope({ root: AnimRefPoint }).add( self => {
        if(!self){ return }
    });
    
    return () => {
        if(scope.current){ scope.current.revert() }
    }
    }, []);
    

    return (
    <div ref={AnimRefPoint}>
        <div style={{position: 'relative', display: 'inline-block'}}>
            <img src={imagePaths["ScoreBoard"]} style={{display: 'block'}}></img>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', left: "10%", width: "80%", justifyContent: 'space-between', alignContent: 'center' }}>
                <p>Score:</p>
                <p>{score}</p>
            </div>
        </div>
    </div>
    )
}

export default ScoreBoard