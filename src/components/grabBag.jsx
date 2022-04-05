import React from 'react';
import OwnedDevice from './ownedDevice';
import '../css/Device.css';
import '../App.css';

class GrabGab extends React.Component {
    // -------- Helper Methods -----------------------------
    renderDevices = () => {
        if (this.props.grabBag.length === 0)
          return <p className="center">Drop Files Here</p>
    
        return (this.props.grabBag.map(deviceBundle => (
          <OwnedDevice 
            key={deviceBundle.device.wikiid}
            device={deviceBundle.device}
            count={deviceBundle.count}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
          />
        )));
      }

    // ---------- Render --------------------------------------
    render() { 
        const { allowDrop, onDrop } = this.props;
        return (
                <div className="grab-bag"   
                 onDragOver={allowDrop}
                 onDrop={onDrop}
                >
                    <p className="title text-center center">My Owned Devices</p>
                    <div className="grab-bag-drop-box">
                    { this.renderDevices() }
                    </div>
                </div>
        );
    }
}
 
export default GrabGab;