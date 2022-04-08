import React from 'react';
import '../css/NavBar.css';

class NavBar extends React.Component {
    // -------- Helper Methods ----------------------------- 
    renderCategories() {
        const { categories, onCategorySelection } = this.props;
        return  (categories.map(category => (
                    <button
                        onClick={()=>onCategorySelection(category)}
                        key={category.deviceCategory}
                    >
                        {category.deviceCategory}
                    </button>
                )));
    }

    // ---------- Render --------------------------------------
    render() { 
        return (
            <div className="navbar">
                <div className="dropdown">
                    <button className="nav-text dropdown-button">
                        Search by Category
                    </button>
                    <div className="dropdown-content">
                    { this.renderCategories() }
                    </div>
                </div>
            </div>
        );
    }
}
 
export default NavBar;