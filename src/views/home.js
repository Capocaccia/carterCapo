import db from "../firebaseConfig";
import React, { useEffect, useState } from "react";
import toggleMobile from "../mixins/toggleMobile";

function Home() {
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    db.database()
      .ref()
      .once("value")
      .then(function(snapshot) {
        return snapshot.child("home").val();
      })
      .then(result => {
        setPageData(result.page);
      });
  }, [pageData]);

  return (
    <div
      className={pageData ? pageData.contentClass : ""}
      style={{ backgroundImage: `url(${pageData ? pageData.background : ""})` }}
    >
      <h2>{pageData ? pageData.title : ""}</h2>
      <p className="tagline">{pageData ? pageData.tagline : ""}</p>
      <div className="main"></div>
      <div className="navicon" onClick={() => toggleMobile()}></div>
    </div>
  );
}

export default Home;
