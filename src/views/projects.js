import db from "../firebaseConfig";
import React, { useEffect, useState } from "react";
import Projectlist from "../components/projectsList";
import toggleMobile from "../mixins/toggleMobile";

function Projects() {
  const [pageData, setPageData] = useState([]);
  const [projectItems, setProjectItems] = useState([]);

  useEffect(() => {
    db.database()
      .ref()
      .once("value")
      .then(function(snapshot) {
        return snapshot.child("projects").val();
      })
      .then(result => {
        setPageData(result.page);
        setProjectItems(result.projectItems);
      });
  }, [...projectItems]);
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
      <Projectlist
        projectItems={projectItems ? projectItems : []}
      ></Projectlist>
    </div>
  );
}

export default Projects;
