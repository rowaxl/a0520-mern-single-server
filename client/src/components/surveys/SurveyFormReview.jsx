import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  //{"title":"this is a title", "body","this is a body","subject".......}
  //[ {"title":"this is a title"} , { "body": "this is a body"}]

  const reviewFields = Object.entries(formValues).map(([key, val], index) => {
    return (
      <div key={index}>
        <label>{key}</label>
        <div>{val}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

export default compose(connect(null, actions), withRouter)(SurveyFormReview);
