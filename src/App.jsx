import { useState, useEffect } from "react";

import Header from "./Components/Header/Header.jsx";
import KeyPad from "./Components/KeyPad/KeyPad.jsx";

import moonIcon from "./assets/moon.png";
import sunIcon from "./assets/sun.png";

import "./App.css";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  let [expression,setExpression] = useState('')
  let [result,setResult] = useState('')
  let [history,setHistory] = useState([])
  console.log(isDarkMode);
  function handleKeyPress(keyCode,key){
    if(!keyCode) return
    if(!usedKeyCodes.includes(keyCode)) return
    if(numbers.includes(key)){
      if (key === 0) {
       if(expression.length === 0 ) return
      }
      calculateResult(expression + key)
      setExpression(expression + key)
    }
    else if (operators.includes(key)){
      if (!expression) return 
      let lastCharacter = expression.slice(-1)
      if(operators.includes(lastCharacter)) return
      if(lastCharacter === '.') return
      setExpression(expression + key)
    }
    else if(key === '.'){
      if(!expression ) return
      let lastCharacter = expression.slice(-1);
      if (!numbers.includes(lastCharacter)) return
      setExpression(expression + key)
    }
    else if (keyCode === 8) {
      if(!expression) return
      calculateResult(expression.slice(0,-1))
      setExpression(expression.slice(0,-1))
    }
    else if (keyCode === 13) {
      calculateResult(expression)
      let tempHistory = [...history]
      if (tempHistory.length > 20) tempHistory = tempHistory.slice(0,1)
      tempHistory.push(expression)
      setHistory(tempHistory)
    }
  }
  function calculateResult(expression){
    if(!expression){
      setResult('')
      return
    }
    let lastCharacter = expression.slice(-1);
    if (!numbers.includes(lastCharacter)) {
      expression = expression.slice(0,-1)
    }
   setResult(eval(expression).toFixed(2))
  }
  return (
    <div
      className="app"
      tabIndex="0"
      onKeyDown={(event)=> handleKeyPress(event.keyCode,event.key)}
      data-theme={isDarkMode ? "dark" : ""}
    >
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div
            className="app_calculator_navbar_toggle"
          onClick={()=> setIsDarkMode(!isDarkMode)}
          >
            <div
              className={`app_calculator_navbar_toggle_circle ${
                isDarkMode ? "app_calculator_navbar_toggle_circle_active" : ""
              }`}
            />
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt="mode" />
        </div>

        <Header history={history} result={result} expression={expression}/>
        <KeyPad handleKeyPress={handleKeyPress}/>
      </div>
    </div>
  );
}

export default App;
