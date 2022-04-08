import React from 'react';
import '../css/Device.css'
import '../App.css'
import DeviceImg from './deviceImg';

class Device extends React.Component {
   getImage()
   {
       const { device } = this.props;

        if (device.image !== null && device.image.standard !== null)
        {
            return (<DeviceImg
                        device={device}
                    />);
        }
        return <p>No Image Available</p>
   }
    render() { 
        const { device, onDrag} = this.props;
 
        return (
                <div className="device" 
                    draggable="true"
                    onDragStart={(e)=> onDrag(e, JSON.stringify(device))}
                    onTouchStart={this.props.onTouchStart}
                >
                    
                    
                    {this.getImage()}
                    <p className="center-text device-text">{device.title}</p>

                </div>
        );
    }
}
 
export default Device;