import React from 'react';
import '../css/DeviceNavigation.css'

class DeviceNavigation extends React.Component {
    render() { 
        const { pageNum, onIncrement, onDecrement } = this.props;
        return (<div>
                    <div className="center-text">page {pageNum}</div>
                    <div className="center">
                    <button 
                        className={this.getBackBtnClasses(pageNum)} 
                        onClick={()=>onDecrement()}
                    >
                        Back
                    </button>
                    <button 
                    className="btn btn-primary m-2 b-4" 
                    onClick={()=>onIncrement()}
                    >
                    Next
                    </button>
                    </div>
                </div>
        );
    }

        
  // ------------------------ Helper Methods -------------------

  getBackBtnClasses(pageNum) {
    let classes = "btn m-2 b-4 btn-";
    classes += pageNum === 0 ? "basic" : "primary";
    return classes;
  }
}
 
export default DeviceNavigation;