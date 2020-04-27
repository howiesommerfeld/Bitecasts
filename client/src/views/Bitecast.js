import React, { Component } from 'react';


class Bitecast extends Component {

    constructor(props) {
        super(props);
        this.state = {
          bitecast: {}
        };
      }

  componentDidMount(){
      this.getBitecast()
      .then((json)=>{
          this.setState({bitecast:json["bitecast"]});
      })
  }

  getBitecast(){
    return fetch(this.props.location.pathname, {
        accept: "application/json"
      })
      .then((response)=>{return response.json()});
  }


  render() {
    return (
      <div className="Bitecast">
        <h2>LISTEN TO BITECAST</h2>
        <div className="bitecast item">
          {this.state.bitecast.title}
        </div>
      </div>
    );
  }
}

export default Bitecast;
