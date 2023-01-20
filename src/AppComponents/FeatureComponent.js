import React from 'react';
import CardList from './CardList';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';

const FeatureComponent = () => {
 
  return (
  <MDBContainer className="mt-5">
      <MDBRow>
          <MDBCol>
            <h5 className="text-center text-monospace">This is how it works</h5>
            <h3 className="text-center text-monospace mt-4">Guests order via smartphone in restaurant</h3>
          </MDBCol>
      </MDBRow>
      <MDBRow className="mt-3">
        <CardList
            cardTitle="Guest Login"
            cardBody="Use one of the available table stand designs or create your own order QR code.
                             Your guests can scan it with their smartphoneto order contactless at their table"
            cardImg="/images/others/stadtstrandFeature1.jpeg"
            cardAlt="Card 1" />
        <CardList
            cardTitle="Food menu/Drinks Menu"
            cardBody="Guests select the desired product from a visually appealing digital menu and send 
            order to the waiter terminal. In addition to ordering, other functions can also be selected. 
            Such as waiter call or invoice request."
            cardImg="/images/others/stadtstrandFeature3.jpeg"
            cardAlt="Card 2" />
        <CardList
            cardTitle="Orders are received"
            cardBody="Counter staffs receive the order digitally and optionally include
            automatic receipt printing.All orders are sorted by tableso that no more
            orders are lost."
            cardImg="/images/others/stadtstrandFeature2.jpg"
            cardAlt="Card 3" />
      </MDBRow>
  </MDBContainer>
  )
}

export default FeatureComponent;