import React from "react";
import { useLocation } from "react-router-dom";

const Test = () => {
  const location = useLocation();
  const testData = location.state;

  return <div>제발 좀 되라 왜 안돼{testData && testData.paymenntInfo}</div>;
};

export default Test;
