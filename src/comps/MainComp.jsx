import { Button, Col, Container, Row } from "react-bootstrap";
import alphabet from "../utils/alphabet.json";
import { useState } from "react";

const MainComp = () => {
  const times = Array.from({ length: 5 });

  const [guessedWord, setGuessedWord] = useState([]);
  const [goNext, setGoNext] = useState(0);

  let wordtoGuess = "PIANO";

  const [guessedIndexes, setGuessedIndexes] = useState([]);

  const goToNextRow = () => {
    checkWin();
    if (goNext <= 5) {
      setGoNext(goNext + 1);
      setGuessedWord([]);
    } else {
      console.log("end game");
    }
  };

  // Funzione per verificare se la lettera indovinata corrisponde all'indice e alla lettera nella parola da indovinare
  const isCorrectLetter = (letter, index) => {
    return (
      guessedIndexes.includes(index) && letter === wordtoGuess.charAt(index)
    );
  };

  // Funzione per verificare se la lettera indovinata è corretta ma in un indice diverso
  const isPartiallyCorrectLetter = (letter, index) => {
    return (
      guessedIndexes.includes(index) && letter !== wordtoGuess.charAt(index)
    );
  };

  const checkWin = () => {
    const splittedWord = wordtoGuess.split("");
    const guessedLettersWithIndices = [];

    // Controlla se la lunghezza delle parole coincide
    if (guessedWord.length === wordtoGuess.length) {
      // Controlla se le lettere corrispondono e sono nelle stesse posizioni
      const isWin = guessedWord.every((letter, index) => {
        return letter === splittedWord[index];
      });

      if (isWin) {
        console.log("Hai indovinato!");
        // Aggiungi qui la logica per gestire la vittoria
        return;
      }
    }

    // Controlla se ci sono lettere simili
    guessedWord.forEach((letter, index) => {
      const correspondingIndexInWord = splittedWord.indexOf(letter);
      if (correspondingIndexInWord !== -1) {
        guessedLettersWithIndices.push({
          letter,
          guessedIndex: index,
          actualIndex: correspondingIndexInWord,
        });
      }
    });

    if (guessedLettersWithIndices.length > 0) {
      console.log("Hai indovinato alcune lettere:");
      guessedLettersWithIndices.forEach(
        ({ letter, guessedIndex, actualIndex }) => {
          console.log(
            `Lettera: ${letter}, Indice nell'input: ${guessedIndex}, Indice nella parola da indovinare: ${actualIndex}`
          );
        }
      );

      const newGuessedIndexes = guessedLettersWithIndices.map(
        ({ actualIndex }) => actualIndex
      );
      setGuessedIndexes(newGuessedIndexes);
      return;
    }

    console.log("Hai perso, riprova!");
    // Aggiungi qui la logica per gestire la sconfitta
  };

  console.log(guessedIndexes);

  const writeValue = (value) => {
    const rows = document.querySelectorAll(".main-row");

    for (let i = 0; i < rows.length; i++) {
      for (let x = 0; x < rows[i].childNodes.length; x++) {
        let children =
          goNext > 0 ? rows[goNext].childNodes[x] : rows[i].childNodes[x];
        const isEmpty = children.textContent === "";
        if (isEmpty) {
          if (guessedWord.length < 5) {
            children.textContent = value;
            setGuessedWord([...guessedWord, value]);
            return;
          } else {
            console.log("premi invio");
          }
        }
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col className="d-flex flex-column col-md-3">
          {times.map((item, i) => {
            return (
              <div
                key={i}
                className="main-row d-flex justify-content-between mb-2"
              >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <div className="buttons-row">
            {alphabet.slice(0, 10).map((l, i) => {
              return (
                <Button
                  key={i}
                  value={l}
                  onClick={(e) => {
                    writeValue(e.target.value);
                  }}
                >
                  {l}
                </Button>
              );
            })}
          </div>
          <div className="buttons-row my-1">
            {alphabet.slice(10, 19).map((l, i) => {
              return (
                <Button
                  key={i}
                  value={l}
                  onClick={(e) => {
                    writeValue(e.target.value);
                  }}
                >
                  {l}
                </Button>
              );
            })}
          </div>
          <div className="buttons-row">
            <Button
              value={"Enter"}
              onClick={(e) => {
                goToNextRow();
              }}
            >
              Enter
            </Button>
            {alphabet.slice(19, 26).map((l, i) => {
              return (
                <Button
                  key={i}
                  value={l}
                  onClick={(e) => {
                    writeValue(e.target.value);
                  }}
                >
                  {l}
                </Button>
              );
            })}
            <Button
              value="Back"
              onClick={(e) => {
                writeValue(e.target.value);
              }}
            >
              <i className="bi bi-backspace"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export { MainComp };
