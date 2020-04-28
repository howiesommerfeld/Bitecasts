import React, { Component } from 'react';
import Loader from './Loader';


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
    let fetchUrl = ""
    if(this.props.location.pathname){
        fetchUrl = "/api"+this.props.location.pathname;
        
    }
    fetch(fetchUrl, {
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
        this.state.isLoading === true ? <Loader></Loader> : <div> {bitecast} </div>
     );
        

    return (
        
      <div className="Bitecast">
        <br></br>
        
        {currentBitecast}
      </div>
    );
  }
}

export default Bitecast;
