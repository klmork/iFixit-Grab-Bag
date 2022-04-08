import React from 'react';
import '../css/NavBar.css';

class NavBar extends React.Component {
    render() { 
        const { categories, onCategorySelection } = this.props;
        console.log(categories);
        return (
            <div className="navbar">
                {/* <p className="nav-text nav-title">GrabBag App</p> */}
                <div className="dropdown">
                    <button className="nav-text dropdown-button">
                        Search by Category
                    </button>
                    <div className="dropdown-content">
                { 
                         
                    categories.map(category => (
                                    <button
                                        onClick={()=>onCategorySelection(category)}
                                        key={category.deviceCategory}
                                    >
                                        {category.deviceCategory}
                                    </button>
                                ))
                }
                </div>
                </div>

            </div>
        );
    }
}
 
export default NavBar;