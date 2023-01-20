import React from 'react';
import { MDBCol, MDBContainer, MDBRow , MDBIcon} from 'mdbreact';

const FooterComponent = () => {
    const socialiconstyle = {
        color:'#ffffff',
        marginLeft:'15px',
    }

    const containerstyle = {
        backgroundColor: "#b5cdd9",
        color:'#ffffff',
        padding: "10px",
    };

  return (
  <MDBContainer fluid style={containerstyle}>
      <MDBRow>
          <MDBCol md="6">
            <h6>© 2021 STADTSTRAND-DÜSSELDORF</h6>
          </MDBCol>
          <MDBCol md="6" className="text-right">
          <a style={socialiconstyle} href="/" target="_blank"><MDBIcon fab icon="facebook-square" size="2x"/></a>
          <a style={socialiconstyle} href="/" target="_blank"><MDBIcon fab icon="instagram" size="2x"/></a>
          </MDBCol>
      </MDBRow>
  </MDBContainer>
  )
}

export default FooterComponent;