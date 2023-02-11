import { useEffect, useRef, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import allWords from "./utils/allWords";
import validadorDoJogoTermo from "./utils/CheckSameWord";

type ValuesCheckTypes = Array<{
  color: string;
  status: string;
}>;

function App() {
  const [countRows, setCountRows] = useState<number>(0);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<boolean>(false);
  const [wordOfDay, setWord] = useState<string>("");

  let arrayOfInputs: string[] = [];

  const rows = useRef<HTMLDivElement>(null);

  const updateWord = () => {
    const word = allWords[Math.ceil(Math.random() * allWords.length)];
    return word;
  };

  

  useEffect(() => {
    setWord(updateWord());
  }, []);

  useEffect(() => {

    rows.current
      ?.querySelectorAll("input")
      .forEach((item: HTMLInputElement) => {
        item.disabled = true;
      });

    rows.current
      ?.querySelectorAll("div")
      [countRows].querySelectorAll("input")
      .forEach((item: HTMLInputElement) => {
        item.disabled = false;
      });

    rows.current
      ?.querySelectorAll("div")
      [countRows].querySelectorAll("input")[0]
      .focus();

  }, [countRows]);

  const focusInput = (index: number) => {
    rows.current
      ?.querySelectorAll("div")
      [countRows].querySelectorAll("input")
      [index].focus();

  };

  const handleCheckWord = () => {


    const inputsSelect = rows.current
      ?.querySelectorAll("div")
      [countRows].querySelectorAll("input")!;

    inputsSelect.forEach((item: HTMLInputElement) => {
      arrayOfInputs = [...arrayOfInputs, item.value.toLowerCase()];
    });


    if (allWords.filter((word) => word.includes(arrayOfInputs.join(''))).length) {

      setCountRows(countRows + 1);

      const value: ValuesCheckTypes = validadorDoJogoTermo(wordOfDay, arrayOfInputs);

     inputsSelect.forEach((item: HTMLInputElement, key: number) => {

          item.style.backgroundColor = value[key].color;
          item.style.animationName = "rotate"
           
        });

      if (value.filter((val) => val.status === "certo").length === 5) {

        setTimeout(() => {
          setToggleModal(true);
        }, 1500)

        setWinner(true);
                
      } else if (countRows === 4) {
        
        setCountRows(4)

        setTimeout(() => {
          setToggleModal(true);
        }, 2000)

        setWinner(false);

      }

    } else {

      arrayOfInputs = [];

      

      inputsSelect.forEach((item: HTMLInputElement) => {
        item.value = ''
      })
    }

    focusInput(0)

    console.log(wordOfDay)

  };


  
  const keyPressInInput = (index: number, e: any) => {
    
    const wordParsed = rows
      .current!.querySelectorAll("div")
      [countRows].querySelectorAll("input")
      [index].value.trim().length;
      

    switch (index) {
      case 0:
        if (wordParsed > 0 && e.keyCode !== 8) {
          focusInput(index + 1);
        }
        break;
      case 4:
        if (e.keyCode === 13 && wordParsed > 0) {
          handleCheckWord();
        } else if (e.keyCode === 8) {
          focusInput(index - 1);
        }

        break;

      default:
        if (e.keyCode === 8) {
          focusInput(index - 1);
        } else if (wordParsed > 0) {
          focusInput(index + 1);
        }

        break;
    }
  };

  const placeholderArray = Array.from({ length: 5 });

  return (
    <div className="App">
      <main>
        {toggleModal && (
          <Modal winner={winner} word={wordOfDay} setToggle={setToggleModal} />
        )}
        <div className="game">
          <h1>Termo</h1>
          <div className="rows" ref={rows}>
            {placeholderArray.map((_, index) => (
              <div className="inputs" key={index}>
                {placeholderArray.map((_, index) => (
                  <input
                    type="text"
                    maxLength={1}
                    key={index}
                    style={{ transitionDelay: index + 2 +'00ms', animationDelay: index + '00ms' }}
                    onKeyUp={(e) => keyPressInInput(index, e)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
