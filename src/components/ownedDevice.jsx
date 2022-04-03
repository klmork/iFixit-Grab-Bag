import React from 'react';
import '../css/OwnedDevice.css';
import Trash from '../assets/trash.png';

class OwnedDevice extends React.Component {
    render() { 
        const { device, count } = this.props;

        /* TODO: break into child classes */
        /* TODO: add option to delete on phone / tablets */

        return (
            <div className="owned-device">
                <img className="owned-image" src={device.image.thumbnail} alt="device"></img>
                <span className="owned-device-title">{device.display_title}</span>

                <div className="modify-device-container">
                    <button 
                        onClick={()=>this.props.onDelete(device.wikiid)} 
                        className="delete-button"
                    >
                            <img src={Trash} alt="delete: trash can"/>
                    </button>
                    <div className="count-container">
                        <button 
                            onClick={()=>this.props.onDecrement(device)} 
                            className="change-cnt-button"
                        >
                            -
                        </button>
                        <span className="count">{count}</span>
                        <button 
                            onClick={()=>this.props.onIncrement(device)} 
                            className="change-cnt-button"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default OwnedDevice;