import React from 'react';
import '../css/Device.css'
import '../App.css'

//TODO: fix hierarchy (maybe add different children for grab bag vs grid view).
class Device extends React.Component {
   
    render() { 
        const { device, onDrag} = this.props;
        const srcImage = device.image.thumbnail  + " 96w, " + device.image.standard +" 300w";
        return (
            <div className="device-container">
                <div className="Device" 
                    draggable="true"
                    onDragStart={(e)=> onDrag(e, JSON.stringify(device))}>
                    
                        
                    {/*<span>Device { device.display_title } </span><br></br>*/}
                    
                    {/* Pick smaller image when screen size is smaller:
                        -> since columns are already reduced as screen scales down,
                        shouldn't switch to thumbnail until screen is around 320px (maybe phones) */}
                    {/*TODO: maybe organize css and resizing better*/}
                    <img
                        srcSet= {srcImage}
                        sizes = "(max-width: 300px) 96px, 320px"
                        src = {device.image.standard} 
                        alt="device"
                    />
                    <p className="center-text device-text">{device.display_title}</p>

                </div>
            </div>
        );
    }
}
 
export default Device;