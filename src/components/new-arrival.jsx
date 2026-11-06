import React from "react";

const NewArrivalPage = async () => {
  const res = await fetch("http://localhost:5000/new-arrival");
  const data = await res.json();

  return <div>Arrival page</div>;
};

export default NewArrivalPage;
