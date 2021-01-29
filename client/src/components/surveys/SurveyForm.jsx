import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CustomTextInput from "../CustomTextInput";

const SurveyForm = ({ existingFormValues, onSurveySubmit }) => {
  const initialValues = {
    title: "",
    subject: "",
    body: "",
    recipients: [""],
    ...existingFormValues,
  };

  const inputSchema = Yup.object().shape({
      title: Yup.string().min(3, 'Must be at least 3 characters long').required("Required"),
      subject: Yup.string().min(3, 'Must be at least 3 characters long').required("Required"),
      body: Yup.string().min(3, 'Must be at least 3 characters long').required("Required"),
      recipients: Yup.array().transform(function(value, originalValue){
        if(this.isType(value) && value !== null){
            return value;
        }
        return originalValue ? originalValue.split(/[\s,]+/) : [];
      }).of(Yup.string().email(({ value }) => `${value} is not a valid email.`))
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={inputSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            onSurveySubmit(values)
          }, 500);
        }}
      >
        {(props) => (
          <Form>
            <h1>Survey Form</h1>
            <CustomTextInput label="Campaign Name" name="title" type="text" />
            <CustomTextInput label="Subject Line" name="subject" type="text" />
            <CustomTextInput label="Email Body" name="body" type="text" />
            <CustomTextInput
              label="Recipient List"
              name="recipients"
              type="text"
              placeholder="Use commas to separate multiple recipients"
            />

            <Link to="/surveys" className="red btn-flat white-text">
              Cancel
            </Link>
            <button type="submit" className="teal btn-flat right white-text">
              {props.isSubmitting ? (
                "Loading..."
              ) : (
                <>
                  Next
                  <i className="material-icons right">done</i>
                </>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SurveyForm;
