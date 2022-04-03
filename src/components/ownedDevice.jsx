import React from 'react';
import '../css/OwnedDevice.css';

class OwnedDevice extends React.Component {
    render() { 
        const { device, count } = this.props;

        return (
            <div className="owned-device">
                <img className="owned-image" src={device.image.thumbnail} alt="device"></img>
                <span className="owned-device-title">{device.display_title}</span>
                <span className="count">{count}</span>
            </div>
        );
    }
}
 
export default OwnedDevice;