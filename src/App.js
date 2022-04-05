import React from 'react';
import './App.css';
import Devices from './components/devices';
import GrabBag from './components/grabBag';
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
    this.setState({ "grabBag": JSON.parse(localStorage.getItem("grabBag"))});
  }

    // -------------------- Helper Functions ---------------------
    allowDrop = ev => {
      ev.preventDefault();
    };
    

  // ----------- Event Handlers --------------------------------------

  // Fetch data from API (only for devices currently being displayed)
  handleFetch = () => {
    const { page, numDevicesDisplayed } = this.state;
    const offset = "offset=" + page * numDevicesDisplayed;
    const limit = "&limit=" + numDevicesDisplayed;

    // fetch("https://www.ifixit.com/api/2.0/wikis/CATEGORY/iPhone%204")//API_URL+offset+limit)
    //     .then((res) => res.json())
    //     .then((json) => {
    //         this.setState({
    //           devices: [json ]
    //         });
    //     })
    fetch(API_URL+offset+limit)
    .then((res) => res.json())
    .then((json) => {
        this.setState({
          devices: json
        });
    })
  };

  // Pagination - page left and load devices
  handlePageDecrement = () => {
      if (this.state.page === 0) return;

      const page = this.state.page - 1;
      this.setState({ page }, this.handleFetch);
  };

  // Pagination - page right and load devices
  handlePageIncrement = () => {
    const page = this.state.page + 1;
    this.setState({ page }, this.handleFetch);

  };

  // Deleting items from grab bag
  handleDelete = (deviceId) => {
      const { grabBag } = this.state;
      const newGrabBag = grabBag.filter(d => (d.device.wikiid !== deviceId));
      this.setState({grabBag: newGrabBag});
      localStorage.grabBag = JSON.stringify(newGrabBag);
  };

  // Adding copy of item to grab bag
  handleDeviceCountIncrement = (device) => {
      const grabBag = [...this.state.grabBag];
      const index = grabBag.findIndex(deviceBundle => deviceBundle.device === device);
      const deviceBundle = {...grabBag[index]};

      deviceBundle.count++;
      grabBag[index] = deviceBundle;

      this.setState({ grabBag });
      localStorage.grabBag = JSON.stringify(grabBag);
  };

  // Removing copy of item to grab bag
  handleDeviceCountDecrement = (device) => {
    const grabBag = [...this.state.grabBag];
    const index = grabBag.findIndex(deviceBundle => deviceBundle.device === device);
    const deviceBundle = {...grabBag[index]};

    if (deviceBundle.count === 0)
    {
      let confirmAction = window.confirm("Would you like to delete " + device.title + " from your list of owned devices?");
      if (confirmAction) {
        this.handleDelete(device.wikiid);
      } 
      return;
    }
    deviceBundle.count--;
    grabBag[index] = deviceBundle;

    this.setState({ grabBag });
    localStorage.grabBag = JSON.stringify(grabBag);
  };

  // ----- Dragging and Dropping Devices --------------
  handleDragStart = (e, v) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("device", v)
  };

  handleDrop = e => {
    const dataString = e.dataTransfer.getData("device");
    const data = JSON.parse(dataString);
    let grabBag = [...this.state.grabBag];

    if (grabBag.length !== 0){
      for (let i = 0; i < grabBag.length; i++)
      {
        if (grabBag[i].device.wikiid === data.wikiid)
        {
          grabBag[i] = {device: grabBag[i].device, count: grabBag[i].count + 1};
          this.setState({ grabBag });
          localStorage.grabBag = JSON.stringify(grabBag);
          return;
        }
      }
    }
    grabBag.push({device: data, count: 1});
    localStorage.grabBag = JSON.stringify(grabBag);
    this.setState({ grabBag });
  };

  // -------------------- Render ----------------------------
  //TODO: make class for containers with columns and title
  render() { 
    const { page, devices } = this.state;

    return (
      <React.Fragment>
        {/* <NavBar/> */}
        <div className="Container">
          <main>
            <div className="col-4">
              <GrabBag 
                allowDrop={this.allowDrop}
                onDrop={this.handleDrop}
                grabBag={this.state.grabBag}
                onDelete={this.handleDelete}
                onIncrement={this.handleDeviceCountIncrement}
                onDecrement={this.handleDeviceCountDecrement}
              />
            </div>
            <div className="col-8">
              <Devices
                devices={devices}
                pageNum={page}
                onIncrement={this.handlePageIncrement}
                onDecrement={this.handlePageDecrement}
                onDrag={this.handleDragStart}
              />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }


}
 
export default App;