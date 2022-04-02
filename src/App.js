import React from 'react';
import './App.css';

const API_URL = "https://www.ifixit.com/api/2.0/wikis/CATEGORY?";

class App extends React.Component {
  
  state = {
    devices: [],
    page: 0,
    numDevicesDisplayed: 10
  };

  componentDidMount() {
    this.handleFetch();
  }

  // ----------- Event Handlers --------------------------------------

  // Fetch data from API (only for devices currently being displayed)
  handleFetch = () => {
    const { page, numDevicesDisplayed } = this.state;
    const offset = "offset=" + page * numDevicesDisplayed;
    const limit = "&limit=" + numDevicesDisplayed;

    fetch(API_URL+offset+limit)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
              devices: json 
            });
        })
  };

  // Pagination - page left and load devices
  handleDecrement = () => {
      if (this.state.page === 0) return;

      const page = this.state.page - 1;
      this.setState({ page }, this.handleFetch);
  };

  // Pagination - page right and load devices
  handleIncrement = () => {
    const page = this.state.page + 1;
    this.setState({ page }, this.handleFetch);

  };
    
  // ------------------------ Helper Methods -------------------

  getBackBtnClasses() {
    let classes = "btn m-2 b-4 btn-";
    classes += this.state.page === 0 ? "basic" : "primary";
    return classes;
  }


  // -------------------- Render ----------------------------
  render() { 
    const { devices } = this.state;

    //TODO: make grid and other components... testing as list for now
    return (
      <div className = "App">
        <h1>Device Grab Bag</h1>
        <div>
          {
            devices.map(device => (
              <ol key={ device.wikiid }>
                <span>Device { device.display_title } </span><br></br>
                <img src={device.image.thumbnail} alt="device"/>
              </ol>
            ))
          }
        </div>
        <p>page {this.state.page}</p>
        <button 
          className={this.getBackBtnClasses()} 
          onClick={this.handleDecrement}
        >
          Back
        </button>
        <button 
          className="btn btn-primary m-2 b-4" 
          onClick={this.handleIncrement}
        >
          Next
        </button>
      </div>
      
    );
  }


}
 
export default App;