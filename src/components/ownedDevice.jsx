import React from 'react';
import '../css/OwnedDevice.css';
import OwnedDeviceModifier from './ownedDeviceModifier';
import Trash from '../assets/trash.png';

class OwnedDevice extends React.Component {
    getImage()
    {
        const { device } = this.props;
        if (typeof device !== 'undefined' && device.image !== null && typeof device.image !== 'undefined' && device.image.thumbnail !== null)
        {
            return (<img 
                        className="owned-image" 
                        src={device.image.thumbnail} 
                        alt="device"/>
            );
        }
        return <p>No Image Available</p>
    }

    render() { 
        const { device, count } = this.props;
        
        /* TODO: add option to delete on phone / tablets */
        return (
            <div className="owned-device">
                {this.getImage()}
                <div className="owned-device-title">{device.title}</div>
                <OwnedDeviceModifier
                    device={device}
                    count={count}
                    onDelete={this.props.onDelete}
                    onDecrement={this.props.onDecrement}
                    onIncrement={this.props.onIncrement}
                />
                <button 
                    onClick={()=>this.props.onDelete(device.wikiid)} 
                    className="delete-button"
                >
                    <img src={Trash} alt="delete: trash can"/>
                </button>
         
            </div>
        );
    }
}
 
export default OwnedDevice;