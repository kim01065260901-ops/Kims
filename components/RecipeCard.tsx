
import React, { useState } from 'react';
import { Recipe } from '../types';

interface Props {
  recipe: Recipe;
  index: number;
}

const RecipeCard: React.FC<Props> = ({ recipe, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden animate-in slide-in-from-bottom duration-500 delay-${index * 100}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1 block">추천 레시피 {index + 1}</span>
            <h3 className="text-xl font-bold text-slate-800">{recipe.recipeName}</h3>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.prepTime}
          </span>
        </div>
        
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {recipe.description}
        </p>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2.5 px-4 bg-orange-50 text-orange-600 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-orange-100 transition-colors"
        >
          {isOpen ? '닫기' : '레시피 보기'}
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top duration-300">
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                준비물
              </h4>
              <ul className="grid grid-cols-2 gap-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between text-sm bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-700">{ing.name}</span>
                    <span className="text-slate-400 font-medium">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                조리 순서
              </h4>
              <div className="space-y-3">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
