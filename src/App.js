import React from 'react';
import './App.css';
import Devices from './components/devices';
import NavBar from './components/navbar';
import OwnedDevice from './components/ownedDevice';
import './css/Device.css';

const API_URL = "https://www.ifixit.com/api/2.0/wikis/CATEGORY?";

class App extends React.Component {
  
  state = {
    devices: [],
    page: 0,
    numDevicesDisplayed: 12,
    grabBag: []
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

  handleDragStart = (e, v) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("device", v)
  };

  handleDrop = e => {
    const dataString = e.dataTransfer.getData("device");
    const data = JSON.parse(dataString);
    let { grabBag } = this.state;
    //TODO: check for duplicates and add counter
    grabBag.push(data);
    this.setState({ grabBag });
  };

  // -------------------- Helper Functions ---------------------
  allowDrop = ev => {
    ev.preventDefault();
  };

  
  // -------------------- Render ----------------------------
  //TODO: make class for containers with columns and title
  render() { 
    const { page, devices } = this.state;

    return (
      <React.Fragment>
        <NavBar/>
        <div className="Container">
          <main className="row">
            <div className="col-3" 
                 onDragOver={this.allowDrop}
                 onDrop={this.handleDrop}
            >
          
              <p className="title grab-bag-title text-center center">My Owned Devices</p>
            {
              //TODO: handle duplicates (add key and make sure unique)
              this.state.grabBag.map(device => (
                <OwnedDevice 
                  key={device.wikiid}
                  device={device}
                />
                    ))
                }
            </div>
            <Devices
              devices={devices}
              pageNum={page}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDrag={this.handleDragStart}
            />
          </main>
        </div>
      </React.Fragment>
    );
  }


}
 
export default App;