import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-8d5d7.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
    return this.http.request(req);
  }

  getRecipes() {
    this.http.get<Recipe[]>('https://ng-recipe-book-8d5d7.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
    .pipe(map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
