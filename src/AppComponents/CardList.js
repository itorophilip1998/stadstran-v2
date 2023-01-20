import React from 'react';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBView } from 'mdbreact';

const CardList = (props) => {
  return (
      <MDBCol md='4' className="mt-2">
        <MDBCard wide cascade>
          <MDBView cascade>
            <MDBCardImage
              hover
              overlay='white-slight'
              className='card-img-top'
              src={props.cardImg}
              alt={props.cardAlt}
            />
          </MDBView>

          <MDBCardBody cascade className='text-center'>
            <MDBCardTitle className='card-title'>
              {props.cardTitle}
            </MDBCardTitle>

            <MDBCardText>
                {props.cardBody}
            </MDBCardText>

          </MDBCardBody>
        </MDBCard>
      </MDBCol>
  )
}

export default CardList;