import React, { useState, useEffect } from "react";

const HintLogIn = (props) => {
  const [show, setShow] = useState(false);

  const activateHint = () => {
    setShow(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 4000);
  });

  return (
    <div className="signIn">
      <span
        style={{ opacity: show ? "5" : "0", transition: "all .5s ease" }}
      >
        Type in adress line : https://mcity-9a9e9.web.app/
        <i style={{ color: "#5f2b2b" }}>
          sign_in{" "}
          <span style={{ color: "black", marginLeft: "10px" }}>
          </span>
        </i>
      </span>
      <h5 onClick={() => activateHint()}>hint</h5>
    </div>
  );
};

export default HintLogIn;
