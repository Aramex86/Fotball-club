import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './componets/Resources/css/app.css';
import {firebase} from './firebase';


const Index =(props)=>{
  return(
    <BrowserRouter>
      <App {...props}/>
    </BrowserRouter>
  )
}

firebase.auth().onAuthStateChanged((user)=>{

  
  ReactDOM.render(
    <Index user={user}/>,
  document.getElementById("root")
);
})


