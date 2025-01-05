import React, { useState } from "react";
import translator from "./func.js"; // Import translation functions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [direction, setDirection] = useState("toBurmese");

  const handleTranslate = () => {
    try {
      if (direction === "toBurmese") {
        setOutputText(translator.convertToBurmese(inputText));
      } else {
        setOutputText(translator.convertToMyanglish(inputText));
      }
    } catch(error) {
      setOutputText("Error translating text");
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "20px",
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#ffffff" }}>Myanmar - MyanEnglish Translator</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          backgroundColor: "#2c2c2c",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
        }}
      />
      <div style={{ margin: "10px 0" }}>
        <label style={{ marginRight: "10px" }}>
          Translate to:
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              backgroundColor: "#2c2c2c",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            <option value="toBurmese">Burmese</option>
            <option value="toMyanglish">Myanglish</option>
          </select>
        </label>
      </div>
      <button
        onClick={handleTranslate}
        style={{
          padding: "10px 20px",
          margin: "10px 5px",
          backgroundColor: "#4a90e2",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Translate
      </button>
      <button
        onClick={handleClear}
        style={{
          padding: "10px 20px",
          margin: "10px 5px",
          backgroundColor: "#d9534f",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
      <h2 style={{ color: "#ffffff" }}>Translated Text:</h2>
      <div
        style={{
          border: "1px solid #4a90e2",
          padding: "10px",
          minHeight: "100px",
          backgroundColor: "#2c2c2c",
          color: "#ffffff",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        {outputText}
        <button
          onClick={handleCopy}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
    </div>
  );
};

export default App;
