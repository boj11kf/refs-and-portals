import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from "react-dom";

/* 
    Nagy projektek eseten a bevalt szokas a useImperativeHandle() hook,
    amely segitsegevel az erre kompnensre hatassal levo, 
    de eddig meg parent componensben meghivott akciok
    a jelenlegi kompnensben is definialhatoak, egy ujabb useRef importalasat kovetoen.

    Ezzel kevesett teret hagyunk a kesobbiekben elkovetheto hibaknak pl tag nev modositas,
    dialog -> div

    a dialog alapertelmezetten bezaharhato ESC-el,
    ebben az esetben azonban, nem csak a bezaras tortent, 
    mint action a reset gomb eseten, hanem a szamlalot reseteltuk.
    Ilyen esetben a dialog onClose prop-janak kell a megfelelo action-t atadni.
*/

const ResultModal = forwardRef(({targetTime, remainingTime, onReset }, ref) => {

    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    return (
        createPortal(<dialog ref={dialog} className='result-modal' onClose={onReset}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2> }
            <p>The target time was <strong>{targetTime} seconds</strong></p>
            <p>Yout stopped the timer with <strong>{formattedRemainingTime} seconds left</strong></p>
            <form action="" method='dialog' onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    ));
});

export default ResultModal;


/* 
    dialog eseten hasznalhatjuk az open prop-o is, 
    ha nem kell a helyzetbol adodoan referenciat hasznalnunk.
    <dialog className='result-modal' open>
*/

/* 
const ResultModal = ({ result, targetTime }) => {
    return (
        <dialog className='result-modal' open>
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime} seconds</strong></p>
            <p>Yout stopped the timer with <strong>X second left</strong></p>
            <form action="" method='dialog'>
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;
*/

/* 
    Referencia eseten, a parent komponensben a ref.current.showModal()
    a hasznalatos + forwardRef()
    A modal mogotti sotet hatter is a showModal() alapertelmezett hatasa
    <dialog ref={ref} className='result-modal'>
    Ez kisprojektek eseten működhet, ahol nem kell kigobozni 
    a parent komponens showModal()-ja mihez tartozik... 
 */

/*     
const ResultModal = forwardRef(({ result, targetTime }, ref) => {
        return (
            <dialog ref={ref} className='result-modal'>
                <h2>You {result}</h2>
                <p>The target time was <strong>{targetTime} seconds</strong></p>
                <p>Yout stopped the timer with <strong>X second left</strong></p>
                <form action="" method='dialog'>
                    <button>Close</button>
                </form>
            </dialog>
        );
    });
    
export default ResultModal; 
*/