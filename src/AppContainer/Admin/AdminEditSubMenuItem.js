import React from 'react';
import { 
    MDBContainer, MDBBtn, MDBIcon
  } from 'mdbreact';
import AdminNavbar from '../../AppComponents/AdminComp/AdminNavbar';
import AdminStyle from '../../AppStyles/AdminStyles.module.css';
import { useHistory } from 'react-router-dom';



export default function AdminEditSubMenuItem(props) {
    //console.log(props.location.state.drinkdetail);
    const singleDrink = props.location.state.drinkdetail;

    const history = useHistory();

    const imageFileStyle = {
        padding:'10px',
        border:'1px solid #CCCCCC',
        marginLeft: '12px',
        width:'90%',
        borderRadius:"10px",
        textAlign:'center',
        fontSize:'12px'
    }

    const onChangeFile = (event) => {
        console.log('event.target.files[0]', event.target)
    }

    return (
        <React.Fragment>
            <MDBContainer fluid className={AdminStyle.adminbody}>
                <AdminNavbar />
            </MDBContainer>
            <MDBContainer fluid style={{height:'100vh', background:'#b5cdd9'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 text-center" style={{background:'#ffffff',borderRadius:'10px'}}>
                            
                            <div className="mt-3">
                                <h6><b>Edit {singleDrink.drinkName} </b></h6>
                            </div>
                            <form>
                                <div className="mt-5 mb-2">
                                    <img src={singleDrink.drinkImg}
                                        style={{width:'120px',height:'100px', borderRadius:'15px'}} 
                                        className="img-fluid" alt="image1"  
                                    />
                                </div>
                                <div className="form-group row mt-4">
                                    <div className="col-md-6 offset-md-3">
                                            <input type="file" id="file" style={{display: "none"}}
                                                            onChange={(e) => onChangeFile(e)}/>
                                            <label htmlFor="file" style={imageFileStyle}>
                                                        Change item Image
                                                <MDBIcon icon="cloud-download-alt" className="ml-2"
                                                style={{backgroundColor:'#39729b', color:'#ffffff', padding:'5px', borderRadius:'10px'}}/>
                                            </label>
                                    </div>
                                </div>
                                <div className="row form-group mt-3">
                                    <div className="col-md-5 offset-md-1 mt-4">
                                        <input 
                                            placeholder="Enter item name"
                                            defaultValue={singleDrink.drinkName}
                                            type="text" 
                                            className="form-control text-center" 
                                            style={{border:'1px solid #39729b',borderRadius:'20px'}} />
                                    </div>
                                    <div className="col-md-5 mt-4">
                                        <input 
                                            placeholder="Enter price"
                                            defaultValue={singleDrink.drinkPrice}
                                            type="decimal" 
                                            className="form-control text-center" 
                                            style={{border:'1px solid #39729b',borderRadius:'20px'}} />
                                    </div>
                                </div>
                                <div className="row form-group mt-3">
                                    <div className="col-md-12 mt-4 text-center">
                                        <MDBBtn
                                        type="button"
                                        color="#39729b"
                                        style={{borderRadius:'20px', backgroundColor:'#39729b', color:'#ffffff'}}
                                        className="waves-effect z-depth-1a"
                                        size="sm"
                                        >
                                        Save
                                        </MDBBtn>
                                    </div>
                                </div>
                                <div className="mt-5 font-small text-center pb-3">
                                    <div onClick={history.goBack} className="black-text">
                                        <MDBIcon icon="chevron-circle-left" /> Back 
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </MDBContainer>
        </React.Fragment>
    )
}
