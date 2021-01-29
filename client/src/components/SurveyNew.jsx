import React, { useState } from "react";

import SurveyForm from "./surveys/SurveyForm";
import SurveyFormReview from "./surveys/SurveyFormReview";

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);
  const [surveyFormValues, setSurveyFormValues] = useState([]);

  const onSurveySubmit = (values) => {
    setShowFormReview(true);
    setSurveyFormValues(values);
  };

  const renderContent = () => {
    if (showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => setShowFormReview(false)}
          formValues={surveyFormValues}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={onSurveySubmit}
        existingFormValues={surveyFormValues}
      />
    );
  };

  return <div className="container">{renderContent()}</div>;
};

export default SurveyNew;
