import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBBtn } from 'mdbreact';

const AboutComponent = () => {
  return (
  <MDBContainer fluid className="mt-5" style={{backgroundColor:"#f3f3f3"}}>
      <MDBRow>
          <MDBCol>
            <h1 className="text-center font-weight-bold mt-5">A CITY BEACH FOR EVERYONE</h1>
          </MDBCol>
      </MDBRow>
      <MDBRow className="mt-3">
          <MDBCol md="5">
            <img src="/images/others/STADTSTRAND_3gang.webp" className="img-fluid" alt="" />
          </MDBCol>
          <MDBCol md="7" className="mt-5">
            <p>
                CITY BEACH Düsseldorf is different!
            </p>
            <p className="d-inline-block text-justify">
                No entry, no fences or borders! But with a lot of space 
                in the large open spaces, which of course remain without 
                any obligation to eat - and whoever likes can use the cool furniture, 
                umbrellas or blankets or get goodies from the changing food trucks. And there is 
                also a handpicked beach program - adapted to each location. From "Oh, this calm!" to cinema, 
                fashion shows and dance events.
            </p>
            <MDBRow>
                <MDBCol md="6">
                    <MDBBtn color="blue darken-3" style={{borderRadius:"500px",backgroundColor:"#39729b"}} size="sm">Tell me more</MDBBtn>
                </MDBCol>
            </MDBRow>
          </MDBCol>
      </MDBRow>
  </MDBContainer>
  )
}

export default AboutComponent;