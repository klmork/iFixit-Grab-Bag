import React from 'react';
import '../css/Device.css'
import '../App.css'
import DeviceImg from './deviceImg';

//TODO: fix hierarchy (maybe add different children for grab bag vs grid view).
class Device extends React.Component {
   
    render() { 
        const { device, onDrag} = this.props;
 
        return (
            <div className="device-container">
                <div className="device" 
                    draggable="true"
                    onDragStart={(e)=> onDrag(e, JSON.stringify(device))}>
                    
                    
                    <DeviceImg
                        device={device}
                    />
                    <p className="center-text device-text">{device.display_title}</p>

                </div>
            </div>
        );
    }
}
 
export default Device;