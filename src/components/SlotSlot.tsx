import React, { useEffect, useRef } from 'react'
import paths from '../const/Symbol'
import { RandomCommonSymbol } from '../hooks/RNGSymbolHook'
import { animate, createScope, type Scope } from 'animejs'

interface incomingParams{
    symbol?: string,
    playAnim?: boolean
}
const SlotSlot: React.FC<incomingParams> = ({ symbol, playAnim = false }) => {
    const {imagePaths} = paths
    const AnimRefPoint = useRef<HTMLDivElement>(null); // Animation stuff that now works
    const scope = useRef<Scope>(null);
    const playWinningAnimation = useRef<boolean>(false)

    useEffect(() => {

      scope.current = createScope({ root: AnimRefPoint }).add( self => {
          if(!self){ return }

          self.add('spinSymbol', () => {
            animate('.slotSymbol', {
              rotate: [0, Math.random() > 0.5 ? 360 : -360],
              ease: 'inOut(2)',
              duration: 300,
              onComplete: () => {scope.current?.methods.resetSymbol()}
            });
          });
          self.add('resetSymbol', () => {
            animate('.slotSymbol', {
              delay: 500,
              rotate: 0,
              ease: 'none',
              duration: 0,
              onComplete: () => {playWinningAnimation.current = false}
            });
          });
      });

      return () => {
          if(scope.current){ scope.current.revert() }
      }
    }, []);

    //const [symbol, setSymbol] = useState<string>(symbol ?? RandomCommonSymbol())
    if(symbol == undefined){
      symbol = RandomCommonSymbol()
    }
    if(!playWinningAnimation.current && playAnim){
      playWinningAnimation.current = true
      scope.current?.methods.spinSymbol()
    }


    return (

         <div  style={{ position: 'relative', display: 'inline-block', width: "100%", height: "auto"}} 
         ref={AnimRefPoint}
         >
        <img src={imagePaths["Slot"]} alt="" style={{ display: 'block', alignSelf: "center", width: "100%", height: "auto" }}/>
        <div 
          style={{
            position: 'absolute',
             top: '0',
             left: '0',
             bottom: '0',
             right: '0',
             justifyContent: 'center'
          }}
          onMouseEnter={() => {
          if(scope.current){
            scope.current.methods.spinSymbol()
          }}}
        >
            {symbol ? <img  src={imagePaths[symbol]} alt="" className='slotSymbol'  
            style={{
              //transform: 'translate(0%, 10%)', This brakes css stuff which makes animation harder.
              marginTop: '5%',
              width: '80%',
              height: '80%'
            }}
            /> : <></>}
        </div>
        
        
      </div>

       
    
  )
}

export default SlotSlot
