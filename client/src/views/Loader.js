import React, { Component } from 'react';
import LoaderSpinner from 'react-loader-spinner';


class Loader extends Component {
  render() {
        
    return (
    <div>
        <h2>Loading...</h2>    
        <div style={{width: "100%",height: "100",display: "flex",justifyContent: "center",alignItems: "center"}}>
            
            <LoaderSpinner type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
    </div>
    );
  }
}

export default Loader;
