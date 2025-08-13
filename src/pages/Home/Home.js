import Header from "../../components/homePage/Header";

import Content from "../../components/homePage/Content";
import { useState } from "react";
import Slider from "../../components/homePage/Footer";


export default function HomePage() {

  const [view, setView] = useState("student");

  return (
    <>
      <Header />
      <Content/>
      <Slider/>
    </>
  );
}
