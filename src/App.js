import React from 'react';
import './App.css';
import Devices from './components/devices';
import NavBar from './components/navbar';

const API_URL = "https://www.ifixit.com/api/2.0/wikis/CATEGORY?";

class App extends React.Component {
  
  state = {
    devices: [],
    page: 0,
    numDevicesDisplayed: 12
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


  // -------------------- Render ----------------------------
  render() { 
    const { devices } = this.state;

    //TODO: make grid and other components... testing as list for now
    return (
      <React.Fragment>
        <NavBar/>
        <div className="Container">
          <main className="row">
            <div className="col-3"><span>hi</span></div>
            <Devices
              devices={this.state.devices}
              pageNum={this.state.page}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
            />
          </main>
          {/* <div className="row">
          <div className="col-3"></div>
          <PageNavigation
            pageNum={this.state.page}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
          />
          </div> */}
        </div>
      </React.Fragment>
    );
  }


}
 
export default App;