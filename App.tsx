
import React, { useState } from 'react';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import LoadingState from './components/LoadingState';
import { MealTime, Recipe } from './types';
import { getRecipes } from './geminiService';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [mealTime, setMealTime] = useState<MealTime>(MealTime.BREAKFAST);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      alert('최소 하나 이상의 재료를 추가해주세요!');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await getRecipes(ingredients, mealTime);
      setRecipes(result.recipes);
      if (result.recipes.length === 0) {
        setError('레시피를 생성하지 못했습니다. 재료를 조금 더 구체적으로 적어보세요.');
      }
    } catch (err) {
      console.error(err);
      setError('레시피를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Input Section */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">어떤 재료가 있나요?</h2>
            <p className="text-slate-500">냉장고에 잠자고 있는 재료들을 입력해주세요.</p>
          </div>

          <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">식사 시간 선택</label>
            <div className="grid grid-cols-3 gap-3">
              {(Object.values(MealTime) as MealTime[]).map((time) => (
                <button
                  key={time}
                  onClick={() => setMealTime(time)}
                  className={`py-4 px-2 rounded-2xl border-2 font-bold transition-all text-sm sm:text-base ${
                    mealTime === time 
                      ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm shadow-orange-100' 
                      : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 active:scale-[0.98] transition-all shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                생성 중...
              </>
            ) : (
              '레시피 3가지 제안받기'
            )}
          </button>
        </section>

        {/* Results Section */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-center text-red-600 font-medium animate-in fade-in slide-in-from-top">
            {error}
          </div>
        ) : recipes.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800">이런 요리는 어떠세요?</h2>
              <span className="px-2 py-1 bg-slate-800 text-white text-[10px] font-black rounded uppercase">AI Recommended</span>
            </div>
            <div className="grid gap-6">
              {recipes.map((recipe, idx) => (
                <RecipeCard key={idx} recipe={recipe} index={idx} />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center space-y-4 opacity-40 grayscale">
            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-slate-600 font-medium">재료를 넣고 버튼을 눌러보세요!</p>
          </div>
        )}
      </main>

      {/* Persistent CTA on mobile if needed, but the main one is sticky enough/easily scrollable */}
      <footer className="text-center py-10 text-slate-400 text-xs">
        <p>© 2024 Recipe Maker. powered by Gemini 3 Flash</p>
      </footer>
    </div>
  );
};

export default App;
