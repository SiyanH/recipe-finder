import React from "react";
import FileUpload from "./FileUpload";
import SearchBarComponent from "./SearchBarComponent";
import SearchResultContainer from "../containers/SearchResultContainer";

const RecipeFinderComponent = ({ history, query, index }) => (
  <div className='container mt-4'>
      <h4 className='app-header-font text-center'>
          The best way to search for you favorite recipes!
      </h4>
    <FileUpload />
    <p className='text-center'>...or search using words!</p>
    <SearchBarComponent history={history} query={query} />
    {query !== undefined && (
      <SearchResultContainer query={query} index={index} />
    )}
  </div>
);

export default RecipeFinderComponent;
