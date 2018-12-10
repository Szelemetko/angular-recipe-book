import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  constructor(private action$: Actions,
              private http: HttpClient,
              private store: Store<fromRecipe.RecipeState>) {
  }

  @Effect()
  recipeFetch = this.action$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(
      switchMap(() => {
        return this.http.get<Recipe[]>('https://ng-recipe-book-8d5d7.firebaseio.com/recipes.json', {
          observe: 'body',
          responseType: 'json'
        });
      }),
      map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          };
        }
      )
    );

  @Effect({dispatch: false})
  recipeStore = this.action$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(
      withLatestFrom(
        this.store.select('recipes')
      ),
      switchMap(([action, state]) => {
          const req = new HttpRequest('PUT', 'https://ng-recipe-book-8d5d7.firebaseio.com/recipes.json',
            state.recipes, {reportProgress: true});
          return this.http.request(req);
        }
      )
    );
}

