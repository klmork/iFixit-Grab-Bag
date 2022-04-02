import React from 'react';
import '../css/DeviceNavigation.css'

class DeviceNavigation extends React.Component {
    render() { 
        const { pageNum, onIncrement, onDecrement } = this.props;
        return (<div>
                    <div className="center-text page-num-text">page {pageNum}</div>
                    <div className="center">
                    <button 
                        className={this.getBackBtnClasses(pageNum)} 
                        onClick={()=>onDecrement()}
                    >
                        Back
                    </button>
                    <button 
                    className="nav-button button-clickable" 
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
    let classes = "nav-button button-";
    classes += pageNum === 0 ? "no-click" : "clickable";
    return classes;
  }
}
 
export default DeviceNavigation;