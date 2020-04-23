import React from "react";
import FileUpload from "./FileUpload";
import SearchBarComponent from "./SearchBarComponent";
import SearchResultContainer from "../containers/SearchResultContainer";

const RecipeFinderComponent = ({ history, query, index }) => (
  <div className='container mt-4'>
      <h4 className='app-header-font text-center mt-4'>
          The best way to search for you favorite recipes!
      </h4>
      <h4 className='app-big-font'>Search with Images</h4>
    <FileUpload />
    <h4 className='app-big-font'>Search with Words</h4>
    <SearchBarComponent history={history} query={query} />
    {query !== undefined && (
      <SearchResultContainer query={query} index={index} />
    )}

  </div>
);

export default RecipeFinderComponent;
