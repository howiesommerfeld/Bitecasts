import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bitecasts: []
    };
  }

  componentDidMount() {
      this.getRecentBitecasts().then(response => {
          let bitecasts = response["bitecasts"];
          console.log("Bitecasts: "+bitecasts);
          console.log(bitecasts.length);
        if (bitecasts.length) {
            const sortedBitecasts = this.sortItemNames(bitecasts);
            this.setState({bitecasts: sortedBitecasts});
        }
      });
  }

  sortItemNames(items) {
    return items.sort((item1, item2) => {
      if (item2.title.toLowerCase() < item1.title.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  }

    getRecentBitecasts() {
    return fetch(`bitecasts/`, {
      accept: "application/json"
    })
    //.then((response)=>{return this.checkStatus(response)})
    .then((response)=>{return this.parseJSON(response)});
  }
  
  checkStatus(response) {
    console.log(response.status);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
  
  parseJSON(response) {
      //console.log(response.json());
    return response.json();
  }

  renderBitecasts() {
    return this.state.bitecasts.map(bitecast => {
        const newTo = { 
            pathname: `/bitecasts/${bitecast.id}`, 
            state: {bitecast: bitecast}
        };
      return (
        <Link to={newTo}
           className="item"
           key={bitecast.id}>
           <h3>{bitecast.title}</h3>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="Landing">
        <h2>LATEST BITECASTS</h2>
        <div className="bitecast item-list">
          {this.renderBitecasts()}
        </div>
      </div>
    );
  }
}

export default Landing;
