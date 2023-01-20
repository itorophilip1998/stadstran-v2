/*eslint-disable*/




import React, { useState, useEffect } from "react";
import UserNavbar from "../../AppComponents/UserComp/UserNavbar";
import { MDBContainer, MDBIcon, MDBBtn } from "mdbreact";
import { Link, useHistory } from "react-router-dom";
import UserStyles from "../../AppStyles/UserStyles.module.css";
import Axios from "axios";

export default function BrandPageJobs(props) {
  const brandPageId = props.match.params.brandpageid;
  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagejob/${brandPageId}`
    )
      .then((response) => {
        console.log(response);
        setJobsList(response.data.data.Jobs);
        setLoading(false);
      })
      .catch((e) => {});
  }, [brandPageId]);

  const cardStyle = {
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    paddingTop: "20px",
  };

  const dateFormat = (createdDate) => {
    const dateObj = new Date(createdDate);
    const newdate = dateObj.toDateString();
    return newdate;
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
                  <b>Available Jobs</b>
                </h3>
              </div>
            </div>

            <div className="row">
              {jobsList.map((job) => {
                return (
                  <div
                    className="col-10 offset-1 mt-4 mt-3 font-small text-left"
                    key={job.id}
                    style={cardStyle}
                  >
                    <div className="row">
                      <div className="col-5">
                        <img
                          className="img-fluid"
                          src={job.jobImageUrl}
                          alt={job.title}
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <div className="col-7">
                        <div>
                          <h5 style={{ fontWeight: "500" }}>{job.title}</h5>
                          <p>
                            <span style={{ fontSize: "10px" }}>
                              Posted {dateFormat(job.createdAt)}
                            </span>{" "}
                            <br />
                            <Link
                              to={{
                                pathname: `/jobs/apply/${job.id}`,
                                state: {
                                  jobDetail: job,
                                },
                              }}
                            >
                              <MDBBtn
                                type="button"
                                color="blue"
                                style={{ borderRadius: "20px" }}
                                className="waves-effect z-depth-1a"
                                size="sm"
                              >
                                Apply
                              </MDBBtn>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-11 offset-1">
                        <div>
                          <p>
                            <span className="mr-2" style={{ fontSize: "12px" }}>
                              <MDBIcon icon="clock" />
                            </span>
                            <span style={{ fontSize: "12px" }}>
                              Application Close Date:{" "}
                              {dateFormat(job.expiryDate)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="row mt-3">
              <div className="col-12 text-center">
                <div onClick={history.goBack} className="black-text">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBContainer>
    </React.Fragment>
  );
}
