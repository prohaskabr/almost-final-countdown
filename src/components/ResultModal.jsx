import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            Open() {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2> You lost</h2>}
            {!userLost && <h2> You win, score:{score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            {!userLost && <p>You stopped the timmer with <strong>{formattedRemainingTime} seconds left.</ strong></p>}
            <form method="dialog" >
                <button >Close</button>
            </form>
        </dialog>
        , document.getElementById('modal'));
})

export default ResultModal;