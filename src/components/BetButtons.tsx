import React, { useEffect, useRef } from 'react'
import path from '../const/Symbol'
import { animate, createScope, spring, type Scope } from 'animejs';
interface incomingParams{
    changeBet?: (bet: number) => void
}

const BetButtons: React.FC<incomingParams> = ({changeBet = (bet: number)  => {console.log(bet)}}) => {
    const {imagePaths} = path

    const AnimRefPoint = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);
    
    useEffect(() => {
    
    scope.current = createScope({ root: AnimRefPoint }).add( self => {
        if(!self){ return }

        self.add('bet1down', () => {
            animate('.bet1', {
                y: '1vw',
                filter: 'brightness(100%)',
                ease: spring({
                    bounce: 0.41,
                    duration: 300
                })
            });
        });

        self.add('bet1up', () => {
            animate('.bet1', {
                y: '0vw',
                filter: 'brightness(70%)',
                ease: spring({
                    bounce: 0.41,
                    duration: 300
                })
            });
        });
        self.add('bet5down', () => {
            animate('.bet5', {
                y: '1vw',
                filter: 'brightness(100%)',
                ease: spring({
                    bounce: 0.41,
                    duration: 300
                })
            });
        });

        self.add('bet5up', () => {
            animate('.bet5', {
                y: '0vw',
                filter: 'brightness(70%)',
                ease: spring({
                    bounce: 0.41,
                    duration: 300
                })
            });
        });
        self.add('bet25down', () => {
            animate('.bet25', {
                y: '1vw',
                filter: 'brightness(100%)',
                ease: spring({
                    bounce: 0.41,
                    duration: 300
                })
            });
        });

        self.add('bet25up', () => {
            animate('.bet25', {
                y: '0vw',
                filter: 'brightness(70%)',
                ease: spring({
                    bounce: 0.41,
                    duration: 300
                })
            });
        });

    });
    
    return () => {
        if(scope.current){ scope.current.revert() }
    }
    }, []);
    
    const pressButton = (bet: number) => {

        switch (bet) {
            case 1:
                scope?.current?.methods.bet1down()
                scope?.current?.methods.bet5up()
                scope?.current?.methods.bet25up()
                break;
            case 5:
                scope?.current?.methods.bet1up()
                scope?.current?.methods.bet5down()
                scope?.current?.methods.bet25up()
                break;
            case 25:
                scope?.current?.methods.bet1up()
                scope?.current?.methods.bet5up()
                scope?.current?.methods.bet25down()
                break;
        
            default:
                break;
        
        }
        changeBet(bet)
    }

    return (
    <div ref={AnimRefPoint}>
        <div style={{position: 'relative'}}>
            
            <div style={{ position: 'absolute', inset: 0, }}>
                <img className='bet1' src={imagePaths["Bet1"]} style={{width: "7.85vw", filter: 'brightness(70%)' }} onClick={() => pressButton(1)} draggable={false}></img>
                
            </div>
            <div style={{ position: 'absolute', inset: 0, left: "15vw" }}>
                <img className='bet5' src={imagePaths["Bet5"]} style={{width: "7.85vw", filter: 'brightness(70%)' }} onClick={() => pressButton(5)} draggable={false}></img>
            </div>
            <div style={{ position: 'absolute', inset: 0, left: "30vw" }}>
                <img className='bet25' src={imagePaths["Bet25"]} style={{width: "7.85vw", filter: 'brightness(70%)' }} onClick={() => pressButton(25)} draggable={false}></img>
            </div>
            <div style={{ position: 'absolute', inset: 0, left: "-2.15vw", top: "3vw" }}>
                <img src={imagePaths["BetBase"]} style={{width: "12.3vw" }} onClick={() => pressButton(1)} draggable={false}/>
            </div>
            <div style={{ position: 'absolute', inset: 0, left: "12.85vw", top: "3vw" }}>
                <img src={imagePaths["BetBase"]} style={{width: "12.3vw" }} onClick={() => pressButton(5)} draggable={false}/>
            </div>
            <div style={{ position: 'absolute', inset: 0, left: "27.85vw", top: "3vw" }}>
                <img src={imagePaths["BetBase"]} style={{width: "12.3vw" }} onClick={() => pressButton(25)} draggable={false} />
            </div>
            
        </div>
    </div>
    )
}

export default BetButtons