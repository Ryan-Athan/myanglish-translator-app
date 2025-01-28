import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import translator from "./func.js"; // Import translation functions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [direction, setDirection] = useState("toBurmese");
  const [copyMessage, setCopyMessage] = useState("");

  const debouncedTranslate = useCallback(
    debounce((text, direction) => {
      try {
        if (direction === "toBurmese") {
          setOutputText(translator.convertToBurmese(text));
        } else {
          setOutputText(translator.convertToMyanglish(text));
        }
      } catch (error) {
        setOutputText("Error translating text");
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    debouncedTranslate(text, direction);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopyMessage("Copied!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  return (
    <div className="min-h-screen p-4 lg:p-16 bg-gray-900 text-gray-100">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center lg:text-left">
          Myanmar - MyanEnglish Translator
        </h1>
        
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="mb-6">
            <textarea
              rows="5"
              placeholder="Enter text"
              value={inputText}
              onChange={handleInputChange}
              className="w-full p-4 rounded-lg shadow-sm bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <label className="font-medium">Translate to:</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="p-2 rounded-lg shadow-sm bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="toBurmese">Burmese</option>
                <option value="toMyanglish">Myanglish</option>
              </select>
            </div>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              Clear
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Translated Text:</h2>
          <div className="relative p-6 rounded-lg shadow-sm bg-gray-200 text-gray-900">
            {outputText}
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 text-gray-700 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
            {copyMessage && (
              <div className="absolute top-2 right-12 p-2 text-sm text-green-500">
                {copyMessage}
              </div>
            )}
          </div>
        </div>

        {/* Larger Devices Layout */}
        <div className="hidden lg:flex lg:space-x-8">
          <div className="lg:w-1/2 mb-6 lg:mb-0">
            <textarea
              rows="10"
              placeholder="Enter text"
              value={inputText}
              onChange={handleInputChange}
              className="w-full p-4 rounded-lg shadow-sm bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="lg:w-1/2 mb-6 lg:mb-0 relative p-6 rounded-lg shadow-sm bg-gray-200 text-gray-900">
            {outputText}
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 text-gray-700 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
            {copyMessage && (
              <div className="absolute top-2 right-12 p-2 text-sm text-green-500">
                {copyMessage}
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-between mt-8">
          <div className="mb-6 lg:mb-0">
            <label className="mr-4 font-medium">Translate to:</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="p-2 rounded-lg shadow-sm bg-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="toBurmese">Burmese</option>
              <option value="toMyanglish">Myanglish</option>
            </select>
          </div>
          <div className="mb-6 lg:mb-0">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700"
            >
              Clear
            </button>
          </div>
          <div className="mb-6 lg:mb-0">
            <h2 className="text-2xl font-semibold">Translated Text:</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;