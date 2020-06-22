import db from "../firebaseConfig";
import React, { useEffect, useState } from "react";
import toggleMobile from "../mixins/toggleMobile";

function Connect() {
  const [pageData, setPageData] = useState([]);
  const [contactItems, setContactItems] = useState([]);

  useEffect(() => {
    db.database()
      .ref()
      .once("value")
      .then(function(snapshot) {
        return snapshot.child("contact").val();
      })
      .then(result => {
        setPageData(result.page);
        setContactItems(result.contactItems);
      });
  }, [contactItems]);

  let items = contactItems.map((item, idx) => {
    return (
      <div key={idx} className="contactItem">
        <p className="title">{item.title}</p>
        <a className="project--item__link" href={item.link}>
          <img src={item.icon} alt={item.email}></img>
        </a>
      </div>
    );
  });

  return (
    <div
      className={pageData ? pageData.contentClass : ""}
      style={{
        backgroundImage: `url(${pageData ? pageData.background : ""})`
      }}
    >
      <h2>{pageData ? pageData.title : ""}</h2>
      <p className="tagline">{pageData ? pageData.title : ""}</p>
      <div className="main"></div>
      <div className="navicon" onClick={() => toggleMobile()}></div>
      <div className="contact">{items}</div>
    </div>
  );
}

export default Connect;
