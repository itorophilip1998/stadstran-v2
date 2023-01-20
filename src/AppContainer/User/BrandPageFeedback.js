import React, { useState, useEffect } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import { MDBContainer, MDBIcon, MDBBtn, MDBAlert } from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import UserStyles from "../../AppStyles/UserStyles.module.css";
import Axios from "axios";
import ReactStars from "react-rating-stars-component";

export default function BrandPageFeedback(props) {
  const brandPageId = props.match.params.brandpageid;

  const history = useHistory();

  const clientId = localStorage.getItem("clientId");
  const [feedbackQuestions, setFeedbackQuestion] = useState([]);
  const [feedbackFormData, setFeedbackFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const imageFileStyle = {
    padding: "10px",
    border: "1px dotted #CCCCCC",
    marginLeft: "12px",
    width: "90%",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "12px",
  };

  const redirect = (brandPageId) => {
    window.location = `/user/form/${brandPageId}`;
  };

  const ratingChanged = (newRating) => {
    if (newRating === 1) {
      setRating("Very Bad");
    } else if (newRating === 2) {
      setRating("Poor");
    } else if (newRating === 3) {
      setRating("Ok");
    } else if (newRating === 4) {
      setRating("Good");
    } else {
      setRating("Excellent");
    }
  };

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagefeedback/${brandPageId}`
    )
      .then((response) => {
        setFeedbackQuestion(response.data.data.Feedbacks);
        setLoading(false);
      })
      .catch((e) => {});
  }, [brandPageId]);

  const singleFieldInput = (feedback, value) => {
    const formData = [...feedbackFormData];
    const index = formData.findIndex(
      (element) => element.feedbackId === feedback.id
    );
    if (index !== -1) {
      formData[index].answer = value;
    } else {
      const data = {
        feedbackId: feedback.id,
        answer: value,
      };
      formData.push(data);
    }
    setFeedbackFormData(formData);
  };

  const saveFeedbackResponse = (e) => {
    e.preventDefault();
    setLoader(true);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/feedback/report",
      {
        clientId: clientId,
        brandPageId: brandPageId,
        clientFeedBacks: feedbackFormData,
        description: description,
        rating: rating,
      }
    )
      .then((response) => {
        setLoader(false);
        setAlertError(false);
        setAlertSuccess(true);
        setSuccessMessage("Feedback submitted successfully.");
        setInterval(redirect(brandPageId), 6000);
      })
      .catch((e) => {
        console.log(e.response);
        setLoader(false);
        setAlertError(true);
        setErrorMessage(e.response.data.message);
      });
  };

  return (
    <React.Fragment>
      <UserNavbar />
      <MDBContainer fluid style={{ height: "100vh", background: "#b5cdd9" }}>
        <div className="row">
          <div
            className="col-10 offset-1 col-md-5 offset-md-3 mt-3 mb-5"
            id={UserStyles.listCard}
          >
            <div className="row mt-3">
              <div className="col-2 text-left">
                <div onClick={history.goBack} className="black-text">
                  <MDBIcon
                    className="mt-2"
                    style={{ fontSize: "25px", color: "#000000" }}
                    icon="chevron-circle-left"
                  />
                </div>
              </div>
              <div className="col-10 text-left mt-1">
                <h3>
                  <b>Give Feedback</b>
                </h3>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                {alertError ? (
                  <MDBAlert color="danger">{errorMessage}</MDBAlert>
                ) : alertSuccess ? (
                  <MDBAlert color="info">{successMessage}</MDBAlert>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-10 offset-1 mt-3 font-small text-left ">
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#c2c2c2",
                  }}
                  className="mt-4"
                >
                  Rate us on how you feel about our service
                </span>
              </div>
            </div>
            {loading ? (
              <div className="col-12 mt-2 mb-2 text-center">
                <div
                  className="spinner-grow text-primary fast ml-2"
                  role="status"
                >
                  <span className="sr-only mt-2">Loading...</span>
                </div>
              </div>
            ) : feedbackQuestions.length < 1 ? (
              <h4>No Feed back questions</h4>
            ) : (
              <div>
                <form onSubmit={saveFeedbackResponse}>
                  <div className="row">
                    <div className="col-10 offset-1 mt-3 font-small text-left ">
                      {feedbackQuestions.map((feedback) => {
                        return (
                          <div className="mt-2" key={feedback.id}>
                            <span style={{ fontSize: "14px" }}>
                              {feedback.question} <br />
                              <span>
                                <input
                                  type="text"
                                  className="form-control text-left"
                                  onChange={(e) =>
                                    singleFieldInput(feedback, e.target.value)
                                  }
                                  style={imageFileStyle}
                                />
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-10 offset-1 mt-3 font-small text-left ">
                      <div className="mt-2">
                        <span style={{ fontSize: "14px" }}>
                          Please rate our Strand <br />
                          <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={16}
                            activeColor="#ffd700"
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-10 offset-1 mt-3 text-left">
                      <textarea
                        className="form-control text-left"
                        style={imageFileStyle}
                        defaultValue="Care to share any personal feedback?"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 text-center">
                      <MDBBtn
                        type="submit"
                        color="blue"
                        style={{ borderRadius: "20px" }}
                        className="waves-effect z-depth-1a"
                        size="md"
                      >
                        Send
                        {loader ? (
                          <div
                            className="spinner-grow spinner-grow-sm ml-3"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </MDBBtn>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="row mt-3">
              <div className="col-12 text-center">
                <div className="black-text">
                  <Link
                    to={{
                      pathname: `/user/form/${brandPageId}`,
                    }}
                  >
                    <MDBIcon
                      className="mt-2"
                      style={{ fontSize: "15px", color: "#000000" }}
                      icon="chevron-circle-left"
                    />
                    <span
                      className="ml-1"
                      style={{ fontSize: "15px", color: "#000000" }}
                    >
                      Back to Menu Icons
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
