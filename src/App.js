import React from 'react';
import './App.css';
import Devices from './components/devices';
import NavBar from './components/navbar';

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
    e.dataTransfer.setData("text/plain", v)
  };

  handleDrop = e => {
    const data = e.dataTransfer.getData("text/plain");
    let { grabBag } = this.state;
    grabBag.push(data);
    this.setState({ grabBag });
  };

  // -------------------- Helper Functions ---------------------
  allowDrop = ev => {
    ev.preventDefault();
  };

  
  // -------------------- Render ----------------------------
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
            {
              this.state.grabBag.map(deviceName => (
                        <ol>{deviceName}</ol>
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