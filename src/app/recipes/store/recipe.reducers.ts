import {Ingredient} from '../../shared/ingredient.model';
import * as fromApp from '../../store/app.reducers';
import {Recipe} from '../recipe.model';

import * as RecipeActions from './recipe.actions';

export interface RecipeState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe('Kotlet pożarski',
      'Minced meat with potatoes',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potatoe', 3)
      ]
    ),
    new Recipe('Big Fat Burger',
      'Ground beef burger with bacon and cheese',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const updatedRecipes = [...state.recipes];
      updatedRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: updatedRecipes
      };
    default:
      return state;
  }
}
