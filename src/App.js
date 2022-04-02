import React, { Component } from 'react';
import './App.css';

const API_URL = "https://www.ifixit.com/api/2.0/wikis/CATEGORY?offset=0&limit=10";

class App extends React.Component {
  
  state = {
    devices: [],
  };

  componentDidMount() {
    this.handleFetch();
  }

  // fetch data from API - for now just first 10 pages
  handleFetch() {
    fetch(API_URL)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
              devices: json 
            });
        })
  }

  render() { 
    const { devices } = this.state;

    //TODO: make grid ... testing as list for now
    return (
      <div className = "App">
        <h1>Device Grab Bag</h1>
        <div>
          {
            devices.map(device => (
              <ol key = { device.id }>
                <span>Device { device.display_title } </span><br></br>
                <img src={device.image.thumbnail} alt="image of device"/>
              </ol>
            ))
          }
        </div>
      </div>
      
    );
  }
}
 
export default App;