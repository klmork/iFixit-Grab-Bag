import React, { Component } from 'react';
import Device from './device';

class Devices extends React.Component {
    render() { 
        const { devices } = this.props;
        return (
            <div>
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