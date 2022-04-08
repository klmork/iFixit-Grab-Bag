import React from 'react';
import '../css/Device.css'
import '../App.css'
import DeviceImg from './deviceImg';

class Device extends React.Component {
   
    render() { 
        const { device, onDrag} = this.props;
 
        return (
                <div className="device" 
                    draggable="true"
                    onDragStart={(e)=> onDrag(e, JSON.stringify(device))}>
                    
                    
                    <DeviceImg
                        device={device}
                    />
                    <p className="center-text device-text">{device.title}</p>

                </div>
        );
    }
}
 
export default Device;