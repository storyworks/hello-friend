import React from "react";
import "./Button.css";

const Button = triggeredEvent => {
  return (
    <button type="button" className="button" onClick={() => triggeredEvent}>
      Reset
    </button>
  );
};

export default Button;
