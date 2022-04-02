import React, { Component } from 'react';
import '../App.css'

class PageNavigation extends React.Component {
    render() { 
        const { pageNum, onIncrement, onDecrement } = this.props;
        return (<div className="center col-9">
                    <p>page {pageNum}</p><br></br>
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
        );
    }

        
  // ------------------------ Helper Methods -------------------

  getBackBtnClasses(pageNum) {
    let classes = "btn m-2 b-4 btn-";
    classes += pageNum === 0 ? "basic" : "primary";
    return classes;
  }
}
 
export default PageNavigation;