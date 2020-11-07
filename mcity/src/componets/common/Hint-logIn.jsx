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
    <div className="signIn" >
      <h5 onClick={() => activateHint()} style={{position:'relative'}}>hint</h5>
      <span
        style={{ opacity: show ? "5" : "0", transition: "all .5s ease", }}
      >
        Type in adress line : https://mcity-9a9e9.web.app/
        <i style={{ color: "#5f2b2b" }}>
          sign_in{" "}
          <span style={{ color: "black", marginLeft: "10px" }}>
          </span>
        </i>
      </span>
    </div>
  );
};

export default HintLogIn;
