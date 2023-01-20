import React, { useState, useEffect } from "react";
import { MDBModal, MDBModalBody, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function MenuUserModal(props) {
  const brandPageId = props.pageDetails.id;
  const [menu, setMenu] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(
      `https://stadtstrandapi.ecrapps.website/api/v1/brandpagemenu/menus/${brandPageId}`
    )
      .then((response) => {
        setMenu(response.data.data);
        setLoading(false);
      })
      .catch((e) => {});
  }, [brandPageId]);

  const circleIcon = {
    width: "95px",
    height: "95px",
    background: "#39729b",
    borderRadius: "50%",
  };

  const textStyle = {
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    color: "#ffffff",
  };

  const divStyle = {
    width: "120px",
    height: "120px",
    backgroundColor: "#ffffff",
    color: "#ffffff",
    // border: "1px #cccccc solid",
    // borderTopLeftRadius: "10px",
    // borderTopRightRadius: "10px",
    // borderBottomLeftRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "10px",
  };

  return (
    <MDBModal
      isOpen={props.constName}
      toggle={props.functionName}
      size="md"
      centered
    >
      <MDBModalBody>
        <div className="row">
          <div className="col-12 col-md-12 text-left">
            <div onClick={props.functionName} className="black-text">
              <MDBIcon icon="chevron-circle-left" /> Close
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-md-12 text-center">
            <h4>
              <MDBIcon icon="clipboard-list" /> Menu
            </h4>

            {loading ? (
              <div className="col-12 mt-2 mb-2 text-center">
                <div
                  className="spinner-grow text-primary fast ml-2"
                  role="status"
                >
                  <span className="sr-only mt-2">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row mt-4">
                {menu.map((list) => {
                  return (
                    <div className="col-6 col-md-4 offset-md-2" key={list.id}>
                      <Link
                        to={{
                          pathname: `/menu/${list.name}`,
                          state: {
                            listState: list,
                          },
                        }}
                      >
                        <div style={divStyle}>
                          <div style={circleIcon}>
                            <img
                              src={list.imageUrl}
                              alt={list.name}
                              style={{
                                paddingTop: "20px",
                                fontSize: "30px",
                                color: "#ffffff",
                                width: "30px",
                              }}
                            />
                            <p style={textStyle}>{list.name}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
