import React, { Component } from 'react';

class Device extends React.Component {
   
    render() { 
        const { device } = this.props;
        return (
            <div>
                <span>Device { device.display_title } </span><br></br>
                <img src={device.image.thumbnail} alt="device"/>
            </div>
        );
    }
}
 
export default Device;