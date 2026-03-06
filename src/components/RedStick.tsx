import { animate, createScope, type Scope } from 'animejs';
import React, { useEffect, useRef } from 'react'

interface incomingParams{
    spin?: () => void
}

const RedStick: React.FC<incomingParams> = ({ spin = () => {} }) => {
    const rotate = useRef<boolean>(false)

    const AnimRefPoint = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope>(null);

    const RunHandler = () => {
      if(rotate.current){
        return
      }
      spin()
      scope.current?.methods.startRoll()
      rotate.current = true
    }

    const endRollHandler = () => {

      rotate.current = false
    } 


    useEffect(() => {

      scope.current = createScope({ root: AnimRefPoint }).add( self => {
          if(!self){ return }
          self.add('startRoll', () => {
            animate('.redStick', {
              rotate: 45,
              ease: 'inOut(2)',
              duration: 400,
              onComplete: () => scope.current?.methods.endRoll()
            });
          });
          self.add('endRoll', () => {
            animate('.redStick', {
              rotate: 0,
              delay: 5500,
              ease: 'inOut(2)',
              duration: 400,
              onComplete: () => {endRollHandler()}
            });
          });
      });

      return () => {
          if(scope.current){ scope.current.revert() }
      }
    }, []);

  return (
    <div 
    ref={AnimRefPoint}
    onClick={() => RunHandler()}>
      <img src="./RedStick.png" alt="red stick" className='redStick' style={{height: "25vw", transformOrigin: "10% 100%"}}/>
    </div>
  )
}

export default RedStick
