import React from "react";
import { MDBModal, MDBModalBody, MDBIcon } from "mdbreact";

export default function SocialMediaModel(props) {
  const socialMediaBrandPageDetails = props.pageDetails.BrandPageSocialMedium;

  const iconStyle = {
    backgroundImage: `url(/images/others/beachparty.jpg)`,
    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.6)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    fontSize: "80px",
    padding: "10px",
    borderRadius: "20px",
    color: "#ffffff",
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
          <div className="col-3 text-left">
            <div onClick={props.functionName} className="black-text">
              <MDBIcon icon="chevron-circle-left" />
            </div>
          </div>
          <div className="col-8 text-left">
            <h4 style={{ fontWeight: "400" }}> Connect with us</h4>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-9 offset-2 text-center">
            <div className="row mt-3 text-center">
              {socialMediaBrandPageDetails.SocialMedias.map((medialink) => {
                return (
                  <div key={medialink.id}>
                    {medialink.title === "Facebook" ? (
                      <div className="col-4 text-center">
                        <div>
                          <a
                            href={medialink.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MDBIcon
                              fab
                              icon="facebook-square"
                              style={iconStyle}
                            />
                          </a>
                        </div>
                        <div className="mt-2 ml-3">Facebook</div>
                      </div>
                    ) : medialink.title === "Twitter" ? (
                      <div className="col-4 text-center">
                        <div>
                          <a
                            href={medialink.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MDBIcon
                              fab
                              icon="twitter-square"
                              style={iconStyle}
                            />
                          </a>
                        </div>
                        <div className="mt-2 ml-3">Twitter</div>
                      </div>
                    ) : medialink.title === "Instagram" ? (
                      <div className="col-4 text-center">
                        <div>
                          <a
                            href={medialink.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MDBIcon
                              fab
                              icon="instagram-square"
                              style={iconStyle}
                            />
                          </a>
                        </div>
                        <div className="mt-2 ml-3">Instagram</div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </MDBModalBody>
    </MDBModal>
  );
}
