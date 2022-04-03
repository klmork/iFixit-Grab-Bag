import React from 'react';

class DeviceImg extends React.Component {
    render() { 
        const { device } = this.props;
        return (
            <img
            id={"img-"+device.wikiid}
            className="device-img"
            src = {device.image.standard} 
            alt="device"
            />
        );
    }
}
 
export default DeviceImg;