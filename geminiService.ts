
import { GoogleGenAI, Type } from "@google/genai";
import { MealTime, RecipeResponse, Recipe } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const generateRecipeImage = async (recipeName: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ 
          text: `A professional, appetizing, high-resolution food photography of ${recipeName}. Close up shot, soft studio lighting, wooden table background, gourmet presentation.` 
        }] 
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error(`Failed to generate image for ${recipeName}`, error);
  }
  return undefined;
};

export const getRecipes = async (ingredients: string[], mealTime: MealTime): Promise<RecipeResponse> => {
  const prompt = `냉장고에 있는 다음 재료들을 활용하여 ${mealTime} 식사에 적합한 요리 레시피 3가지를 추천해줘: ${ingredients.join(', ')}. 
  사용자의 재료를 최대한 활용하고, 부족한 기본 조미료는 일반적인 가정에 있다고 가정해줘.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recipes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                recipeName: { type: Type.STRING, description: '요리 이름' },
                description: { type: Type.STRING, description: '요리에 대한 짧은 설명' },
                prepTime: { type: Type.STRING, description: '예상 소요 시간 (예: 20분)' },
                ingredients: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING, description: '식재료 명' },
                      amount: { type: Type.STRING, description: '필요한 양' }
                    },
                    required: ["name", "amount"]
                  }
                },
                instructions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING, description: '조리 단계' }
                }
              },
              required: ["recipeName", "description", "prepTime", "ingredients", "instructions"],
              propertyOrdering: ["recipeName", "description", "prepTime", "ingredients", "instructions"]
            }
          }
        },
        required: ["recipes"]
      }
    }
  });

  const jsonStr = response.text || '{"recipes": []}';
  let data: RecipeResponse;
  try {
    data = JSON.parse(jsonStr);
  } catch (error) {
    console.error("Failed to parse recipes JSON", error);
    return { recipes: [] };
  }

  // 각 레시피에 대해 이미지 생성 (병렬 처리)
  const recipesWithImages = await Promise.all(
    data.recipes.map(async (recipe: Recipe) => {
      const imageUrl = await generateRecipeImage(recipe.recipeName);
      return { ...recipe, imageUrl };
    })
  );

  return { recipes: recipesWithImages };
};
