import React from 'react';
import { 
    MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBModal, MDBModalBody, MDBIcon
  } from 'mdbreact';


export default function DrinkUserModal(props) {
    

    return (
        <MDBModal isOpen={props.constName} toggle={props.functionName} size='lg' centered>
            <MDBModalBody>
                <div className="row">
                    <div className="col-12 col-md-12 text-left">
                        <div onClick={props.functionName}  className="black-text">
                            <MDBIcon icon="chevron-circle-left" /> Close 
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 col-md-12 text-center">
                        <h4><MDBIcon icon="cocktail" /> Drink Menu</h4>
                    </div>
                </div>
               
               <MDBCarousel
                    activeItem={1}
                    length={2}
                    showControls={true}
                    showIndicators={false}
                    className="z-depth-1 mt-3"
                    slide
                >
                    <MDBCarouselInner>
                    <MDBCarouselItem itemId="1">
                        <MDBView>
                        <img
                            className="d-block w-100"
                            src="/images/others/drinkmenu1.jpg"
                            alt="First slide"
                        />
                        </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                        <MDBView>
                        <img
                            className="d-block w-100"
                            src="/images/others/drinkmenu2.jpg"
                            alt="Second slide"
                        />
                        </MDBView>
                    </MDBCarouselItem>
                    </MDBCarouselInner>
                </MDBCarousel>
            </MDBModalBody>
        </MDBModal>
    )
}
