import React from 'react';
import FileUpload from "./FileUpload";
import SearchBarComponent from "./SearchBarComponent";
import SearchResultContainer from "../containers/SearchResultContainer";

const RecipeFinderComponent = ({history, query, index}) =>
    <div className='container mt-4 mb-4'>
        <h4 className='display-4 text-center mt-4'>
            <i className='fas fa-cookie-bite'/> Recipes Finder
        </h4>
        <FileUpload/>
        <p className="text-center">Or search by keywords...</p>
        <SearchBarComponent history={history}
                            query={query}/>
        {
            query !== undefined &&
            <SearchResultContainer query={query}
                                   index={index}/>
        }
    </div>;

export default RecipeFinderComponent;
