import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBBtn, MDBIcon, MDBAlert } from "mdbreact";
import DeactivateButton from "../../DeactivateButton";
import Axios from "axios";
import NotificationStatus from "../AdminNotificationStatus";

export default function ContactIconModal(props) {
  const imageFileStyle = {
    padding: "10px",
    border: "1px solid #cccccc",
    marginLeft: "12px",
    width: "90%",
    borderRadius: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#ffffff",
  };

  const inputStyle = {
    borderRadius: "30px",
  };

  const brandPageId = props.locationId;
  const [deactivatePage, setDeactivatePage] = useState(true);
  const [loader, setLoader] = useState(false);
  const [aboutSessions, setAboutSessions] = useState([]);
  const [aboutImage, setAboutImage] = useState("");
  const [aboutImagePreview, setAboutImagePreview] = useState("");
  const [weekDayStart, setWeekDayStart] = useState("");
  const [weekDayEnd, setWeekDayEnd] = useState("");
  const [weekEndStart, setWeekEndStart] = useState("");
  const [weekEndEnd, setWeekEndEnd] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editButton, setEditButton] = useState(false);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageabout/${brandPageId}`
    )
      .then((response) => {
        const brandPageResponse = response.data.data;
        //console.log(response);
        if (response.data.data !== null) {
          setEditButton(true);
        }
        setSubTitle(brandPageResponse.subTitle);
        setDeactivatePage(brandPageResponse.deactivate);
        setAboutSessions(brandPageResponse.Abouts);
        setWeekDayStart(brandPageResponse.weekDayStart);
        setWeekDayEnd(brandPageResponse.weekDayEnd);
        setWeekEndStart(brandPageResponse.weekendStart);
        setWeekEndEnd(brandPageResponse.weekendEnd);
        setAboutImagePreview(brandPageResponse.imageUrl);
        setOldImage(brandPageResponse.imageUrl);
        //console.log(brandPageResponse.Abouts);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [brandPageId]);

  const onChangeFile = (e) => {
    setAboutImage(e.target.files[0]);
    setAboutImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const addNewSession = () => {
    const sessions = [...aboutSessions];
    sessions.push({
      title: "New session title",
      description: "Enter description",
    });
    setAboutSessions(sessions);
  };

  const removeSession = (session) => {
    const sessions = [...aboutSessions];
    const index = sessions.findIndex((element) => element === session);
    sessions.splice(index, 1);
    setAboutSessions(sessions);
  };

  const changeSessionTitle = (session, e) => {
    const sessions = [...aboutSessions];
    const index = sessions.findIndex((element) => element === session);
    sessions[index].title = e.target.value;
    setAboutSessions(sessions);
  };

  const changeSessionDescription = (session, e) => {
    const sessions = [...aboutSessions];
    const index = sessions.findIndex((element) => element === session);
    sessions[index].description = e.target.value;
    setAboutSessions(sessions);
  };

  const createAbout = (e) => {
    e.preventDefault();
    setLoader(!loader);

    const sendSessionFields = aboutSessions.map((session) => {
      return { title: session.title, description: session.description };
    });

    const dataAboutImage = new FormData();
    dataAboutImage.append("image", aboutImage);

    Axios.post(
      "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
      dataAboutImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

      .then((response) => {
        Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/brandpageabout",
          {
            brandPageId: brandPageId,
            weekDayStart: weekDayStart,
            weekDayEnd: weekDayEnd,
            weekendStart: weekEndStart,
            weekendEnd: weekEndEnd,
            imageUrl: response.data.url,
            deactivate: deactivatePage,
            subTitle: subTitle,
            abouts: sendSessionFields,
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
            setAlertError(true);
            setErrorMessage(e.response.data.data);
            setLoader(false);
          });
      })
      .catch((err) => {
        setAlertError(true);
        setErrorMessage("Please select an Image");
        setLoader(false);
        console.log(err.response);
      });
  };

  const updateBrandPageAbout = async (e) => {
    e.preventDefault();
    setLoader(!loader);
    const sendSessionFields = aboutSessions.map((session) => {
      return { title: session.title, description: session.description };
    });

    let response;

    const dataAboutImage = new FormData();

    if (dataAboutImage) {
      dataAboutImage.append("image", aboutImage);
      dataAboutImage.append("imageUrl", oldImage);

      try {
        response = await Axios.post(
          "https://stadtstrandapi.ecrapps.website/api/v1/app/upload/image",
          dataAboutImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (e) {
        console.log(e.response);
      }
    }

    Axios.put(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpageabout/${brandPageId}`,
      {
        weekDayStart: weekDayStart,
        weekDayEnd: weekDayEnd,
        weekendStart: weekEndStart,
        weekendEnd: weekEndEnd,
        imageUrl: response ? response.data.url : null,
        deactivate: deactivatePage,
        subTitle: subTitle,
        abouts: sendSessionFields,
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
          notificationTitle="Admin Notification"
          notificationMessage="Strand About updated successfully"
        />
      ) : (
        <span></span>
      )}
      <MDBModalBody>
        <div className="row">
          <div className="col-12">
            <h5 className="mt-2">
              <strong>Edit About </strong>
            </h5>
          </div>
        </div>
        <hr />

        <form onSubmit={()=>createAbout()}>
          <div className="row">
            <div className="col-10 offset-1">
              {alertError ? (
                <MDBAlert color="danger">{errorMessage}</MDBAlert>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url(${aboutImagePreview})`,
              boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.4)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              borderRadius: "20px",
              color: "#000000",
              padding: "20px",
              height: "300px"
            }}
          >
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="form-group row mt-5">
                  <div className="col-md-8 offset-md-2 text-center">
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={onChangeFile}
                    />
                    <label htmlFor="file" style={imageFileStyle}>
                      Upload About image{" "}
                      <span
                        className="fa fa-download"
                        style={{
                          backgroundColor: "#39729b",
                          color: "#ffffff",
                          padding: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        {" "}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-10 offset-1 text-center">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={subTitle}
                  placeholder="Sub Title"
                  style={inputStyle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
              </div>
            </div>
          </div>

          {aboutSessions.length < 1 ? (
            <div className="row form-group mt-2">
              <div className="col-md-10 offset-md-1">
                <div className="row mt-1">
                  <div className="col-12">
                    <h5>
                      Insert new Session
                      <i
                        className="fa fa-plus-circle ml-5 mt-3"
                        onClick={addNewSession}
                      ></i>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            aboutSessions.map((session, index) => {
              return (
                <div className="mt-4" key={index}>
                  <div className="row form-group">
                    <div className="col-10 offset-1 text-center">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Session Title"
                        defaultValue={session.title}
                        style={inputStyle}
                        onChange={(e) => changeSessionTitle(session, e)}
                      />
                    </div>
                  </div>
                  <div className="row form-group mb-2">
                    <div className="col-10 offset-1">
                      <textarea
                        className="form-control"
                        rows="4"
                        style={{
                          border: "1px dotted #cccccc",
                          borderRadius: "20px",
                        }}
                        onChange={(e) => changeSessionDescription(session, e)}
                        defaultValue={session.description}
                        placeholder="Session Description"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-11 text-center">
                      {aboutSessions.length - 1 === session ? (
                        <i
                          className="fa fa-plus-circle mt-3 "
                          onClick={addNewSession}
                        ></i>
                      ) : (
                        <span></span>
                      )}

                      <i
                        className="fa fa-plus-circle ml-5 mt-3"
                        onClick={addNewSession}
                      ></i>
                      <i
                        className="fa fa-minus-circle mt-3 ml-3"
                        onClick={() => removeSession(session)}
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <hr />

          <div className="row">
            <div className="col-12 text-center">
              <h6>
                <b>Enter Opening Time (Monday - Fridays)</b>
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Opening Time</label>
              <input
                type="time"
                className="form-control"
                style={inputStyle}
                defaultValue={weekDayStart}
                onChange={(e) => {
                  setWeekDayStart(e.target.value);
                }}
              />
            </div>
            <div className="col-6">
              <label>Closing Time</label>
              <input
                type="time"
                className="form-control"
                style={inputStyle}
                defaultValue={weekDayEnd}
                onChange={(e) => setWeekDayEnd(e.target.value)}
              />
            </div>
          </div>

          <hr />
          <div className="row mt-3">
            <div className="col-12 text-center">
              <h6>
                <b>Enter Opening Time (Sat, Sundays and Public Holidays)</b>
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Opening Time</label>
              <input
                type="time"
                className="form-control"
                style={inputStyle}
                defaultValue={weekEndStart}
                onChange={(e) => setWeekEndStart(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label>Closing Time</label>
              <input
                type="time"
                className="form-control"
                style={inputStyle}
                defaultValue={weekEndEnd}
                onChange={(e) => setWeekEndEnd(e.target.value)}
              />
            </div>
          </div>
          <hr />

          <div className="row mt-3">
            <div className="col-md-12">
              <DeactivateButton
                toggle={() => {
                  setDeactivatePage(!deactivatePage);
                }}
                deactivatePage={deactivatePage}
              />
              <div className="mt-2">
                {aboutSessions.length < 1 ? (
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
                    onClick={updateBrandPageAbout}
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
            </div>
          </div>
        </form>

        <div className="mt-5 font-small text-center pb-3">
          <div onClick={props.functionName} className="black-text">
            <MDBIcon icon="chevron-circle-left" /> Back
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
