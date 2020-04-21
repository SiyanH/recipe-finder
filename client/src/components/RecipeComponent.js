import React from 'react';
import "./RecipeComponent.css"

//TODO: Add more recipe details
const RecipeComponent = ({recipe}) =>
    <div className="card">
        <h5 className="card-header">{recipe.label}</h5>
        <div className="card-body">
            <img className="float-md-left d-none d-md-block" id="recipe-img" alt={recipe.label}
                 src={recipe.image}/>
            <img className="float-md-left d-md-none mx-auto d-block" id="recipe-img"
                 alt={recipe.label} src={recipe.image}/>
            <h5 className="card-title">Ingredients</h5>
            <ul>
                {
                    recipe.ingredientLines.map(
                        (ingredient, index) => <li key={index}>{ingredient}</li>)
                }
            </ul>
            <div className="app-clear-left">
                <h5 className="card-title">Instructions</h5>
                <p>See full recipe on <a href={recipe.url} target="_blank"
                                         rel="noopener noreferrer">{recipe.source}</a></p>
            </div>
        </div>
    </div>;

export default RecipeComponent;
