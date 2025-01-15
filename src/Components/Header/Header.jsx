import { useEffect, useRef } from "react";
import "./Header.css";

function Header(props) {
  let resultRef = useRef();
  let expressionRef = useRef();
  useEffect(() => resultRef.current.scrollIntoView({ behavior: "smooth" }), [props.history]);
  useEffect(()=> {
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth
  },[props.expression])
  return (
    <div className="header custom-scroll">
      <div className="header_history">
       { props.history &&
        props.history?.map((item) => (
          <p key={item + "" + Math.random() * 44}>{item}</p>
        ))}
      </div>
      <br />
      <div className="header_expression custom-scroll">
        <p ref={expressionRef}>{props.expression}</p>
      </div>
      <p ref={resultRef} className="header_result">
        {props.result}
      </p>
    </div>
  );
}

export default Header;
