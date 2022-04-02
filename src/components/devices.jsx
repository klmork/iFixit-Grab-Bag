import React, { Component } from 'react';
import Device from './device';
import '../css/Devices.css';
import '../App.css';

class Devices extends React.Component {
    render() { 
        const { devices } = this.props;
        return (
            <div className="col-9 Devices">
            {
                devices.map(device => (
                    <Device
                        key={ device.wikiid }
                        device={ device }
                    />
                ))
            }
            </div>
        );
    }
}
 
export default Devices;