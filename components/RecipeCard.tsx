
import React, { useState } from 'react';
import { Recipe } from '../types';

interface Props {
  recipe: Recipe;
  index: number;
}

const RecipeCard: React.FC<Props> = ({ recipe, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all overflow-hidden animate-in slide-in-from-bottom duration-500 delay-${index * 100}`}>
      {/* Image Section */}
      <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.recipeName}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">이미지를 생성할 수 없습니다</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-bold text-slate-700">{recipe.prepTime}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-1 block">Recommended Menu {index + 1}</span>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">{recipe.recipeName}</h3>
        </div>
        
        <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">
          {recipe.description}
        </p>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            isOpen 
            ? 'bg-slate-100 text-slate-600' 
            : 'bg-orange-500 text-white shadow-lg shadow-orange-100 hover:bg-orange-600'
          }`}
        >
          {isOpen ? '레시피 접기' : '상세 레시피 보기'}
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-top duration-500">
            <div>
              <h4 className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2 uppercase tracking-wider">
                <span className="w-8 h-[2px] bg-orange-500"></span>
                Ingredients
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between items-center text-sm bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                    <span className="text-slate-700 font-medium">{ing.name}</span>
                    <span className="text-orange-500 font-bold text-xs">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2 uppercase tracking-wider">
                <span className="w-8 h-[2px] bg-orange-500"></span>
                Step by Step
              </h4>
              <div className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <span className="flex-shrink-0 w-7 h-7 bg-white border-2 border-slate-200 text-slate-400 group-hover:border-orange-500 group-hover:text-orange-500 rounded-full flex items-center justify-center text-xs font-black transition-colors">
                      {i + 1}
                    </span>
                    <p className="text-[15px] text-slate-600 leading-relaxed pt-0.5">{step}</p>
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
