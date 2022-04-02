import React, { Component } from 'react';
import '../css/Device.css'
import '../App.css'

class Device extends React.Component {
   
    render() { 
        const { device } = this.props;
        const srcImage = device.image.thumbnail  + " 96w, " + device.image.standard +" 300w";
        return (
            <div className="Device">
                {/*<span>Device { device.display_title } </span><br></br>*/}
                
                {/* Pick smaller image when screen size is smaller 
                ... 780 fits thumbnail nicely*/}
                <img
                    srcset= {srcImage}
                    sizes = "(max-width: 780px) 96px, 300px"
                    src = {device.image.standard} 
                    alt="device"
                />

            </div>
        );
    }
}
 
export default Device;