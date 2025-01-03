import React from 'react';
import Device from './device';
import '../css/Devices.css';
import '../App.css';
import DeviceNavigation from './deviceNavigation';

class Devices extends React.Component {
    render() { 
        const { devices, pageNum, onIncrement, onDecrement, onDrag } = this.props;
        return (
            <div>
                <p className="title text-center center">iFixit Devices</p>
                <div className="devices">
                    {
                    devices.map(device => (
                        <Device 
                            key={ device.wikiid }
                            onDrag={onDrag}
                            device={ device }
                            onTouchStart={this.props.onTouchStart}
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