import React from 'react';

import '../css/OwnedDevice.css';

class OwnedDeviceModifier extends React.Component {
    render() { 
        const { device, count } = this.props;

        return (
            <div className="modify-device-container">
                <button 
                    onClick={()=>this.props.onDecrement(device)} 
                    className="change-cnt-button"
                >
                     -
                </button>
                <p className="count">{count}</p>
                <button 
                    onClick={()=>this.props.onIncrement(device)} 
                    className="change-cnt-button"
                >
                    +
                </button>
            </div>
        );
    }
}
 
export default OwnedDeviceModifier;