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
        headers : { 
          'Accept': 'application/json'
         }
  
      })
    .then((response)=>{
        return this.parseJSON(response)});
  }
  
  parseJSON(response) {
    return response.json();;
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
