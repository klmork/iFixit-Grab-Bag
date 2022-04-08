import React from 'react';

import './App.css';
import './css/Device.css';

import Devices from './components/devices';
import GrabBag from './components/grabBag';
import NavBar from './components/navBar';

const MAX_DISPLAYED = 12;
const API_URL = "https://www.ifixit.com/api/2.0/";
const DEVICE_URL = API_URL+"wikis/CATEGORY";
const CONTENT_HIERARCHY_URL = API_URL+"categories/";

class App extends React.Component {
  state = {
    devices: [],
    page: 0,
    numDevicesDisplayed: MAX_DISPLAYED,
    grabBag: [],
    deviceCategories: [],
    // moving: null
  };

  componentDidMount() {
    const url = this.getPageOffsetURL();

    // fetch list of devices for grid
    this.handleFetch(url, this.setDevices);

    // fetch categories for navbar
    this.handleFetch(DEVICE_URL + "?display=hierarchy", this.setCategories);
    this.setState({ "grabBag": JSON.parse(localStorage.getItem("grabBag"))});
  }

  ////////////////////////////////////////////////////////////////////
  //                 Helper Functions                               //
  ////////////////////////////////////////////////////////////////////
    
  allowDrop = ev => {
    ev.preventDefault();
  };

  // pickup = ev => {
  //   this.setState({moving: ev.target})
  // };

  // drop = ev => {
  //   if (this.state.moving !== null)
  //   {
  //       this.setState({moving: null});
  //   }
  // };
    
   // Create object for categories of devices you can seach through
    // and the associated api call for each one
  createCategoryObjects = (deviceCategories) =>
  {
    const catObjects = [{deviceCategory: "All", url: DEVICE_URL + "?display=hierarchy"}];
    deviceCategories.forEach(cat => {
      catObjects.push(
        { 
          deviceCategory: cat,
          url: CONTENT_HIERARCHY_URL+cat
        })

    });
    return catObjects;
  };

  // url for requesting devices within appropriate range based on page number
  getPageOffsetURL() {
    const { page, numDevicesDisplayed } = this.state;
    const offset = "?offset=" + page * numDevicesDisplayed;
    const limit = "&limit=" + numDevicesDisplayed;
    return DEVICE_URL+offset+limit;
  }

  // ----------------------- Fetching from API -----------------------
  
  // Set list of devices to a single device.
  setDevicesOneItem = json => {
    this.setState({
      devices: [json] // device needs to be wrapped in list since single device
    });
  };

  // Set list of devices to display based on page numbers.
  setDevices = json => {
    this.setState({
      devices: json
    });
  };

  // Set original categories for navbar drop-down
  setCategories = json => {
    this.setState({
      deviceCategories: this.createCategoryObjects(Object.keys(json.hierarchy))
    });
  };

  // Update navbar drop-down category after clicking on a parent category.
  // If a node is selected, set device list to that node.
  setCategory = json => {
      // if no children, render device
      if (json.children.length === 0) {
        this.handleFetch(DEVICE_URL+"/"+json.wiki_title, this.setDevicesOneItem);
      } else {
        this.setState({
          deviceCategories: this.createCategoryObjects(json.children)
        });
      }   
  }
  ////////////////////////////////////////////////////////////////////
  //                   Event Handlers                               //
  ////////////////////////////////////////////////////////////////////
  
  // ----------------------- Fetching from API -----------------------

  // Fetch data from API (only for devices currently being displayed)
  handleFetch = (apiUrl, setMyData) => {
    fetch(apiUrl)
    .then((res) => res.json())
    .then((json) => setMyData(json));
  };


  // ----------------------- Searching by Category -----------------------
  
  // Nav bar handlers -> handle if selected category or 'All'
  handleCategorySelection = cat => {
      if (cat.deviceCategory === "All") {
        this.handleFetch(DEVICE_URL + "?display=hierarchy", this.setCategories);
        this.handleFetch(this.getPageOffsetURL(), this.setDevices);
      }
      else {
      
        this.handleFetch(cat.url, this.setCategory);
      }
  };

  // ----------------------- Page Navigation for Device List -----------------------

  // Pagination - page left and load devices
  handlePageDecrement = () => {
      if (this.state.page === 0) return;

      const page = this.state.page - 1;
      this.setState({ page }, ()=>this.handleFetch(this.getPageOffsetURL(), this.setDevices));
  };

  // Pagination - page right and load devices
  handlePageIncrement = () => {
    const page = this.state.page + 1;
    this.setState({ page }, ()=>this.handleFetch(this.getPageOffsetURL(), this.setDevices));

  };

  // ----------------------- Grab Bag -----------------------

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
    e.dataTransfer.setData("device", v);
  };

  handleDrop = e => {
    const dataString = e.dataTransfer.getData("device");
    const data = JSON.parse(dataString);
    let grabBag = [];
    if (this.state.grabBag !== null)
    {
      grabBag = [...this.state.grabBag];
    }

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

  ////////////////////////////////////////////////////////////////////
  //                        Render                                  //
  ////////////////////////////////////////////////////////////////////

  //TODO: make class for containers with columns and title
  render() { 
    const { page, devices } = this.state;

    return (
      <React.Fragment>
        <NavBar
          categories ={this.state.deviceCategories}
          onCategorySelection={this.handleCategorySelection}
        />
        <p>{"Hi " + this.state.moving}</p>
        <div className="Container">
          <main>
            <div className="col-4">
              <GrabBag 
                allowDrop={this.allowDrop}
                onDrop={this.handleDrop}
                onTouchEnd={this.handleDrop}
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
                onTouchStart={this.handleDragStart}
              />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }


}
 
export default App;