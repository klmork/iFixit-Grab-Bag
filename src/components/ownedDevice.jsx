import React from 'react';
import '../css/Device.css'

class OwnedDevice extends React.Component {
    render() { 
        const { device, count } = this.props;

        return (
            <div className="Owned_Device">
                <p className="Device_Title">{device.display_title}</p>
                <img src={device.image.mini} alt="device"></img>
                <div>{count}</div>
            </div>
        );
    }
}
 
export default OwnedDevice;