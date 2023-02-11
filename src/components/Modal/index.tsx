import React from "react";
import "./style.css";
import cancel from "../../assets/cancel.png";

interface ModalProps {
  word?: string;
  winner: boolean;
  setToggle: any
}

const Modal = ({ word, winner, setToggle }: ModalProps) => {
  return (
    <div className="background-modal">
      <div className="modal">
        <header className="top">
          <button>
            <img src={cancel} alt="" onClick={() => setToggle(false)}/>
          </button>
        </header>
        <div className="content">
          {winner ? (
            <span>Parabens, voce ganhou!!</span>
          ) : (
            <>
              <span>Sinto muito, a palavra era:</span>
              <span className="word">{word}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
