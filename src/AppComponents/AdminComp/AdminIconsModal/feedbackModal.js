import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import Axios from "axios";
import NotificationStatus from "../AdminNotificationStatus";

export default function FeedbackModal(props) {
  const brandPageId = props.locationId;
  const [feedBackDescription, setFeedBackDescription] = useState("");
  const [deactivatePage, setDeactivatePage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [feedBackQuestions, setFeedBackQuestions] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefeedback/${brandPageId}`
    )
      .then((response) => {
        if (response.data.data !== null) {
          setEditButton(true);
        }
        const brandPageResponse = response.data.data.Feedbacks;
        setDeactivatePage(response.data.data.deactivatePage);
        console.log(response.data.data.deactivatePage);
        setFeedBackQuestions(brandPageResponse);
        setFeedBackDescription(response.data.data.description);
      })
      .catch((e) => {
        //console.log(e.response);
      });
  }, [brandPageId]);

  const addNewQuestion = () => {
    const questions = [...feedBackQuestions];
    questions.push({
      question: "Enter Question",
    });
    setFeedBackQuestions(questions);
  };

  const removeQuestion = (question) => {
    const questions = [...feedBackQuestions];
    const index = questions.findIndex((element) => element === question);
    questions.splice(index, 1);
    setFeedBackQuestions(questions);
  };

  const changeQuestionName = (question, e) => {
    const questions = [...feedBackQuestions];
    const index = questions.findIndex((element) => element === question);
    questions[index] = {
      question: e.target.value,
    };
    setFeedBackQuestions(questions);
  };

  const createFeedBack = (e) => {
    e.preventDefault();
    setLoader(!loader);
    const sendQuestions = feedBackQuestions.map((question) => {
      return question.question;
    });

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/brandpagefeedback",
      {
        brandPageId: brandPageId,
        description: feedBackDescription,
        deactivatePage: deactivatePage,
        feedbackQuestions: sendQuestions,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setNotificationStatus(true);
        setEditButton(true);
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.data);
      });
  };

  const updateFeedBack = (e) => {
    e.preventDefault();
    setLoader(!loader);
    const sendQuestions = feedBackQuestions.map((question) => {
      return question.question;
    });

    console.log(deactivatePage);

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefeedback/${brandPageId}`,
      {
        description: feedBackDescription,
        deactivatePage: deactivatePage,
        feedbackQuestions: sendQuestions,
      }
    )
      .then((response) => {
        console.log(response);
        setLoader(false);
        setAlertError(false);
        setNotificationStatus(true);
      })
      .catch((e) => {
        console.log(e.response);
        setAlertError(true);
        setErrorMessage(e.response.data.data);
        setLoader(false);
      });
  };

  return (
    <MDBModal isOpen={props.constName} toggle={props.functionName} centered>
      {notificationStatus ? (
        <NotificationStatus
          notificationIcon="bell"
          notificationTitle="Feed Back Notification"
          notificationMessage="FeedBack Updated Successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <h5>
          <b>Edit Feedback</b>
        </h5>
        <p>Enter a number of question to be displayed on your feedback icon</p>
        <hr />
        <form onSubmit={createFeedBack}>
          <div className="row">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          {feedBackQuestions.length < 1 ? (
            <div className="row form-group mt-2">
              <div className="col-md-10 offset-md-1">
                <div className="row mt-1">
                  <div className="col-12">
                    Add First Question
                    <i
                      className="fa fa-plus-circle ml-5 mt-3"
                      onClick={addNewQuestion}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            feedBackQuestions.map((question, index) => {
              return (
                <div className="row form-group mt-1" key={index}>
                  <div className="col-md-10 offset-md-1">
                    <div className="row">
                      <div className="col-9 mt-1">
                        <input
                          className="form-control mb-3 mt-0"
                          style={{
                            border: "inset dotted #000000",
                            borderRadius: "10px",
                            fontSize: "12px",
                          }}
                          type="text"
                          defaultValue={question.question}
                          onChange={(e) => changeQuestionName(question, e)}
                        />
                      </div>
                      <div className="col-3">
                        {feedBackQuestions.length - 1 === index ? (
                          <i
                            className="fa fa-plus-circle mt-3 "
                            onClick={addNewQuestion}
                          ></i>
                        ) : (
                          <span></span>
                        )}

                        <i
                          className="fa fa-minus-circle mt-3 ml-3"
                          onClick={() => removeQuestion(question)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div className="row form-group mt-3">
            <div className="col-md-10 offset-md-1">
              <label>FeedBack Description</label>
              <textarea
                style={{ border: "1px dotted #000000" }}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                defaultValue={feedBackDescription}
                onChange={(e) => setFeedBackDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <DeactivateButton
            toggle={() => {
              setDeactivatePage(!deactivatePage);
            }}
            deactivatePage={deactivatePage}
          />

          <div className="mt-2">
            {feedBackQuestions.length < 1 ? (
              <div></div>
            ) : editButton ? (
              <MDBBtn
                type="button"
                color="#39729b"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#39729b",
                  color: "#ffffff",
                }}
                className="waves-effect z-depth-1a"
                size="md"
                onClick={updateFeedBack}
              >
                Update
                {loader ? (
                  <div
                    className="spinner-border spinner-border-sm ml-3"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <span></span>
                )}
              </MDBBtn>
            ) : (
              <MDBBtn
                type="submit"
                color="#39729b"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "#39729b",
                  color: "#ffffff",
                }}
                className="waves-effect z-depth-1a"
                size="md"
              >
                Save
                {loader ? (
                  <div
                    className="spinner-border spinner-border-sm ml-3"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <span></span>
                )}
              </MDBBtn>
            )}
          </div>

          <div className="mt-5 font-small text-center pb-3">
            <div onClick={props.functionName} className="black-text">
              <MDBIcon icon="chevron-circle-left" /> Back
            </div>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
