import { Recipe } from './recipe.model'
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()

    private recipes: Recipe[] = [
        new Recipe(
            'a test recipe',
             'this is a dope car',
             'https://cdn.motor1.com/images/mgl/zZnP8/s3/2020-rimac-c-two.jpg',
             [
                 new Ingredient('tires', 1),
                 new Ingredient('screws', 20)
             ]
             ),
        new Recipe(
            'another test recipe', 
            'this another dope car',
            'https://cdn.motor1.com/images/mgl/zZnP8/s3/2020-rimac-c-two.jpg',
            [
                new Ingredient('tires', 2),
                new Ingredient('screws', 10)
            ])
        
    ];

    constructor(private slService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice()
    }

    getRecipe(index: number){
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index:number, newRecipe: Recipe){
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1)
        this.recipesChanged.next(this.recipes.slice())
    }
}