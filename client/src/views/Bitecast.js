import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class Bitecast extends Component {

    constructor(props) {
        super(props);
        this.state = {
          bitecast: {},
          isLoading: true
        };
      }

  componentDidMount() {

    const linkedState = this.props.location.state;
    if(linkedState) {
        this.setState({
            bitecast:linkedState.bitecast,
            isLoading: false
      });
      return;
    }


    fetch(this.props.location.pathname, {
        accept: "application/json"
      })
      //TODO Handle 404 elegantly here:
      .then(res => res.json())
      .then((json)=>{
          this.setState({
              bitecast:json["bitecast"],
              isLoading: false
        });
      })
      .catch( error => {
        console.log(error);
      })
  }

  render() {

    const loadingIndicator = (
        <div>
            <h2>Loading Bitecast...</h2>    
            <div style={{width: "100%",height: "100",display: "flex",justifyContent: "center",alignItems: "center"}}>
                
                <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
            </div>
        </div>
        
    );
        
    //TODO: Refacotr into it's own component & style
    const bitecast = (
        <div className="bitecast item">
            <div className="bitecast title">
                Title: {this.state.bitecast.title}
            </div>
            <div className="bitecast image">
                <div>Cover Image:</div>
                <img alt="Bitecast cover"src={this.state.bitecast.coverImageLink} height="100" width="100"></img>
            </div>
            <div className="bitecast creator">
                Creator: {this.state.bitecast.creatorName}
            </div>
            <div className="bitecast categories">

            </div>
            <div className="bitecast audio">
                <audio controls>
                    <source src={this.state.bitecast.audioLink} type="audio/aac"/>
                </audio>
            </div>
        </div>
    );

    const currentBitecast = ( 
        this.state.isLoading === true ? <div> {loadingIndicator} </div> : <div> {bitecast} </div>
     );
        

    return (
      <div className="Bitecast">
        {currentBitecast}
      </div>
    );
  }
}

export default Bitecast;
