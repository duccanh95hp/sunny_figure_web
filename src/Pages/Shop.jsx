import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offer from "../Components/Offer/Offer";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";

const Shop = () => {
  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <Hero />
      <div style={{ marginBottom: "50px" }}>
      <Popular />
      </div>
      <Offer />
      <NewCollections />
      {/* <NewsLetter /> */}
    </div>
  );
};

export default Shop;
