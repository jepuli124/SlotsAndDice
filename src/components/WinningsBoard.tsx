import { animate, createScope, type Scope } from 'animejs';
import React, { useEffect, useRef, useState } from 'react'
import paths from '../const/Symbol'

interface incomingParams{}

const WinningsBoard: React.FC<incomingParams> = () => {
    const AnimRefPoint = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);
    const { imagePaths } = paths

    const isAnimationPlaying= useRef<boolean>(false)
    const [winText, setWinText] = useState<string>("")
    

    useEffect(() => {
    
    scope.current = createScope({ root: AnimRefPoint }).add( self => {
        if(!self){ return }

        animate('.WinBoardText', {
                y: ['-10vh', '0vh'],
                ease: 'inOut(2)',
                duration: 1000,
                onBegin: () => {setWinText("Welcome to the Grand Goblin MACHINE")},
                onComplete: () => {}
            });

        self.add('HelloText', () => {
            animate('.WinBoardText', {
                y: ['-10vh', '0vh'],
                ease: 'inOut(2)',
                duration: 1000,
                onBegin: () => {setWinText("Welcome to the Grand Goblin MACHINE")},
                onComplete: () => {scope?.current?.methods.clearScreen()}
            });
        });

        self.add('clearScreen', () => {
            animate('.WinBoardText', {
                y: ['0vh', '10vh'],
                ease: 'inOut(2)',
                duration: 1000,
                onComplete: () => {isAnimationPlaying.current = false}
            });
        });


    });
    
    return () => {
        if(scope.current){ scope.current.revert() }
    }
    }, []);

    const playAnimation = () => {
        if(scope.current && !isAnimationPlaying.current){
            scope.current.methods.HelloText()
            return true
        }  
        return false
    }
    

    return (
    <div ref={AnimRefPoint}>
        <div style={{position: 'relative', display: 'inline-block'}}>
            <img src={imagePaths["WinBoard"]} style={{display: 'block', width: "80vw"}} draggable={false}></img>
            <div style={{ position: 'absolute', inset: 0, alignContent: 'center', height: "100%", overflow: 'hidden' }}>
                <p style={{top: "-10vh", fontFamily: "thernaly", fontSize: "2.4vw", color: "#d3d600"}} className='WinBoardText'>{winText}</p> 
            </div>
        </div>
    </div>
    )
}

export default WinningsBoard
