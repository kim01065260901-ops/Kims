
export enum MealTime {
  BREAKFAST = '아침',
  LUNCH = '점심',
  DINNER = '저녁'
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string;
  ingredients: Ingredient[];
  instructions: string[];
}

export interface RecipeResponse {
  recipes: Recipe[];
}
