// ParentComponent.js

import React, { useState } from 'react';
import RecipeList from './RecipeList';
import NewRecipe from './NewRecipe';

function ParentComponent() {
  const [recipes, setRecipes] = useState([]);

  // Function to add a new recipe to the list
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <div>
      <NewRecipe onRecipeCreate={addRecipe} />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default ParentComponent;
