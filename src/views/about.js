import db from "../firebaseConfig";
import React, { useState, useEffect } from "react";
import Qaitems from "../components/qaItem";
import toggleMobile from "../mixins/toggleMobile";

function About() {
  const [pageData, setPageData] = useState([]);
  const [aboutItems, setAboutItems] = useState([]);

  useEffect(() => {
    db.database()
      .ref()
      .once("value")
      .then(function(snapshot) {
        return snapshot.child("about").val();
      })
      .then(result => {
        setPageData(result.page);
        setAboutItems(result.aboutItems);
      });
  }, [...aboutItems]);

  return (
    <div
      className={pageData ? pageData.contentClass : ""}
      style={{
        backgroundImage: `url(${pageData ? pageData.background : ""})`
      }}
    >
      <h2>{pageData ? pageData.title : ""}</h2>
      <p className="tagline">{pageData ? pageData.tagline : ""}</p>
      <div className="main"></div>
      <div className="navicon" onClick={() => toggleMobile()}></div>
      <div className="qa">
        <Qaitems qas={aboutItems ? aboutItems : []} />
      </div>
    </div>
  );
}

export default About;
