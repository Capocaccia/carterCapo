import React, { useState, useEffect } from "react";

function projectsList(props) {
  const [projectItems, setProjectItems] = useState([]);
  const [filterApplied, setFilters] = useState([]);

  useEffect(() => {
    setProjectItems(props.projectItems);
  }, [props.projectItems]);

  useEffect(() => {
    if (filterApplied.length > 0) {
      let matchedItems = props.projectItems.filter(
        project => project.categories.indexOf(filterApplied.toLowerCase()) >= 0
      );
      setProjectItems(matchedItems);
    }
  }, [filterApplied]);

  const projects = projectItems.map((project, idx) => (
    <a
      className="project--item__link"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      key={idx}
    >
      <div className="project--item">
        <h3 className="project--item__title">{project.title}</h3>
        <p className="project--item__description">{project.description}</p>
        <div
          className="background"
          style={{ backgroundImage: `url(${project.image})` }}
        ></div>
      </div>
    </a>
  ));

  const filters = [
    "JavaScript",
    "HTML5",
    "PHP",
    "MySQL",
    "CSS",
    "Art",
    "Game",
    "Vue"
  ];

  const resetAll = () => {
    setProjectItems(props.projectItems);
    setFilters([]);
  };

  const applyFilters = tag => {
    if (filterApplied === tag) {
      resetAll();
    } else {
      setFilters(tag);
    }
  };

  const filterClassName = filter => {
    let className = filterApplied.includes(filter)
      ? "filters-group__filter active"
      : "filters-group__filter";
    return className;
  };

  const filterComp = filters.map((filter, idx) => (
    <div
      className={filterClassName(filter)}
      onClick={() => applyFilters(filter)}
      key={idx}
    >
      {filter}
    </div>
  ));

  return (
    <div className="projects-wrapper">
      <div className="filters">
        <div className="filters-title">Filters:</div>
        <div className="filters-group">
          {filterComp}
          <div
            className="filters--clear filters-group__filter"
            onClick={resetAll}
          >
            Clear Filters
          </div>
        </div>
      </div>
      <div className="project">
        {projects.length > 0 ? (
          projects
        ) : (
          <div className="filters-title">No Matches Found</div>
        )}
      </div>
    </div>
  );
}

export default projectsList;
