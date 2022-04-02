import React from 'react';
import Device from './device';
import '../css/Devices.css';
import '../App.css';
import DeviceNavigation from './deviceNavigation';

class Devices extends React.Component {
    render() { 
        const { devices, pageNum, onIncrement, onDecrement, onDrag } = this.props;
        return (
            <div className="col-9">
                <div className="Devices">
                    {
                    devices.map(device => (
                        <Device 
                            key={ device.wikiid }
                            onDrag={onDrag}
                            device={ device }
                        />
                    ))
                }
                </div>
                <DeviceNavigation
                    pageNum={pageNum}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                />
            </div>
        );
    }
}
 
export default Devices;