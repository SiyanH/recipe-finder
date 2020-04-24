import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./SearchBarComponent.css";
import "../common/style.css";

class SearchBarComponent extends Component {
    state = {
        query: this.props.query
    };

    changeQuery = (query) => {
        this.setState({query: query})
    };

    submitQuery = (key) => {
        if (key === 'Enter') {
            this.props.history.push(`/recipes/${this.state.query}`);
        }
    };

    render() {
        return (
            <div className="input-group app-search-bar">
                <label className="sr-only" htmlFor="recipeSearchFld">Recipe name</label>
                <input id="recipeSearchFld" className="form-control"
                       placeholder="Search recipes..." type="text"
                       defaultValue={this.state.query}
                       onChange={e => this.changeQuery(e.target.value)}
                       onKeyPress={e => this.submitQuery(e.key)}/>
                <div className="input-group-append">
                    <Link to={`/recipes/${this.state.query}/0`}
                          className="btn btn-primary app-secondary-button" role="button">
                        <i className="fas fa-search"></i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default SearchBarComponent;
