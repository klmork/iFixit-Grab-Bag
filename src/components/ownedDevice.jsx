import React, { Component } from 'react';
import '../css/Device.css'

class OwnedDevice extends React.Component {
    render() { 
        const { device } = this.props;

        return (
            <div className="Owned_Device">
                {device.display_title}<br></br>
                <img src={device.image.mini} alt="device"></img>
            </div>
        );
    }
}
 
export default OwnedDevice;