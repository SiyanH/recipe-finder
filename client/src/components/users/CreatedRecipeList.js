import React from "react";

const CreatedRecipeList = ({recipes}) =>
    <div className="card-columns">
        {
            recipes.map(
                (recipe, index) =>
                    <div key={index} className="card bg-light mb-3">
                        <div
                            className="card-header">{recipe.label}{recipe._id}</div>
                        <div className="card-body">
                            <h5 className="card-title">Ingredients</h5>
                            <p>{recipe.userProvidedIngredients}</p>
                            <h5 className="card-title">Instructions</h5>
                            <p>{recipe.userProvidedInstructions}</p>
                        </div>
                    </div>)
        }
    </div>;

export default CreatedRecipeList;
