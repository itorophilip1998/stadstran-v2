import React from 'react';
import FormDetailFields from './FormDetailFields';


function FormManagerComponent (props) {
    const location = props.location; 
   
    return(
               <div className="col-12">
                   <div className="row mb-2">
                        <div className="col-12 text-center">
                            <h4><span style={{fontSize:'12px'}}>Brand Page Location Name</span>
                                <br/>{location.name}
                            </h4>
                        </div>
                   </div>

                    <div className="row">
                        <div className="col-12">
                        <FormDetailFields 
                            location={location}
                        />
                        </div>
                    </div>

               </div>
    );
}

export default FormManagerComponent;