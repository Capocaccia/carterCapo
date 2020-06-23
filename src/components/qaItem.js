import React from "react";

function QaItem(props) {
  const questionClass = "content-item--question";
  const answerClass = "content-item--answer";

  function toggleAnswer(idx) {
    document.querySelector(`.${answerClass}-${idx}`).classList.toggle("open");
    document
      .querySelector(`.${questionClass}-${idx}`)
      .classList.toggle("js_arrow_rotate");
  }

  function makeAnswerClassName(idx) {
    return `${answerClass} ${answerClass}-${idx}`;
  }

  function makeQuestionClassName(idx) {
    return `${questionClass} ${questionClass}-${idx}`;
  }

  const items = props.qas.map((qa, idx) => (
    <div key={idx} className="content-item" onClick={() => toggleAnswer(idx)}>
      <div className={makeQuestionClassName(idx)}>{qa.question}</div>
      <div className={makeAnswerClassName(idx)}>{qa.answer}</div>
    </div>
  ));

  return <div>{items}</div>;
}

export default QaItem;
