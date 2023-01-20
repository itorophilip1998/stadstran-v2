import React from 'react';
import { MDBRow, MDBCol} from 'mdbreact';

function NewsLetterChecker() {
    
    return(
      <>
      <MDBRow className="mt-2">
        <MDBCol md={3} sm={6} xs={12} >
          <h5 className="mt-3" style={{textAlign:'left'}}>Newsletter</h5> 
        </MDBCol>
        <MDBCol md={4} sm={6} xs={12} className="mt-3">
            <div className='custom-control custom-switch' style={{textAlign:'left'}}>
              <input
                type='checkbox'
                className='custom-control-input'
                id='customSwitchesChecked'
                defaultChecked
              />
              <label className='custom-control-label' htmlFor='customSwitchesChecked'>
              </label>
            </div>
        </MDBCol>
      </MDBRow>  

      <MDBRow className="mt-2">
        <MDBCol md={3} sm={6} xs={12}>
          <h5 className="mt-3" style={{textAlign:'left'}}>Deactive Page</h5> 
        </MDBCol>
        <MDBCol md={4} sm={6} xs={12} className="mt-3">
          <div className='custom-control custom-switch' style={{textAlign:'left'}}>
              <input
                type='checkbox'
                className='custom-control-input'
                id='deactivateSwitchesChecked'
                defaultChecked
              />
              <label className='custom-control-label' htmlFor='deactivateSwitchesChecked'>
              </label>
            </div>
        </MDBCol>
      </MDBRow>  

      <MDBRow className="mt-2">
        <MDBCol md={3} sm={12} xs={12}>
          <h5 className="mt-3" style={{textAlign:'left'}}>Get Icon</h5> 
        </MDBCol>
        <MDBCol md={4} sm={12} xs={12} className="mt-3">
          <div className='custom-control custom-switch' style={{textAlign:'left'}}>
              <input
                type='checkbox'
                className='custom-control-input'
                id='getIconSwitch'
              />
              <label className='custom-control-label' htmlFor='getIconSwitch'>
              </label>
            </div>
        </MDBCol>
      </MDBRow>  
      </>  
    );
}

export default NewsLetterChecker;