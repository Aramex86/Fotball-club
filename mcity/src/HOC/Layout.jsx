import React from "react";
import Header from '../componets/Header/Header';
import Footer from "../componets/Footer/Footer";

const Layout = (props) => {
  return <div>
      <Header/>
      {props.children}
      <Footer />
      </div>;

};

export default Layout;
