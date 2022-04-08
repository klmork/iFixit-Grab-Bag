import React from 'react';

import './App.css';
import './css/Device.css';

import Devices from './components/devices';
import GrabBag from './components/grabBag';
import NavBar from './components/navBar';


const API_URL = "https://www.ifixit.com/api/2.0/wikis/CATEGORY?";
const CONTENT_HIERARCHY_URL = "https://www.ifixit.com/api/2.0/categories/";

class App extends React.Component {
  state = {
    devices: [],
    page: 0,
    numDevicesDisplayed: 12,
    grabBag: [],
    deviceCategories: []
  };

  componentDidMount() {
    this.handleFetch();
    this.handleFetchCategories();
    this.setState({ "grabBag": JSON.parse(localStorage.getItem("grabBag"))});
  }

  ////////////////////////////////////////////////////////////////////
  //                 Helper Functions                               //
  ////////////////////////////////////////////////////////////////////
    
  allowDrop = ev => {
    ev.preventDefault();
  };
    
   // Create object for categories of devices you can seach through
    // and the associated api call for each one
  createCategoryObjects = (deviceCategories) =>
  {
    const catObjects = [{deviceCategory: "All", url: API_URL + "display=hierarchy"}];
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
    const offset = "offset=" + page * numDevicesDisplayed;
    const limit = "&limit=" + numDevicesDisplayed;
    return API_URL+offset+limit;
  }

  ////////////////////////////////////////////////////////////////////
  //                   Event Handlers                               //
  ////////////////////////////////////////////////////////////////////
  
  // ----------------------- Fetching from API -----------------------

  // Fetch data from API (only for devices currently being displayed)
  handleFetch = () => {
    fetch(this.getPageOffsetURL())
    .then((res) => res.json())
    .then((json) => {
        this.setState({
          devices: json
        });
    })
  };

  /*TODO: combine with above */
  handleFetchItem = item => {
    fetch("https://www.ifixit.com/api/2.0/wikis/CATEGORY/"+item)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
              devices: [json] // device needs to be wrapped in list since single device
            });
        })
  };

  /* TODO: combine with above */
  handleFetchCategory = (url) => {

    fetch(url)
    .then((res) => res.json())
    .then((json) => {
      // if no children, render device
      if (json.children.length === 0) {
        this.handleFetchItem(json.wiki_title);
      } else {
        this.setState({
          deviceCategories: this.createCategoryObjects(json.children)
        });
      }    
    })
  };

  // Fetch list of categories for nav bar options (narrow search)
  handleFetchCategories = () => {
    const url = API_URL + "display=hierarchy";
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        this.setState({
          deviceCategories: this.createCategoryObjects(Object.keys(json.hierarchy))
        });
    })
  };

  // ----------------------- Searching by Category -----------------------
  
  handleCategorySelection = cat => {
      if (cat.deviceCategory === "All") {
        this.handleFetchCategories();
        this.handleFetch();
      }
      else {
      
        this.handleFetchCategory(cat.url);
      }
  };

  // ----------------------- Page Navigation for Device List -----------------------

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