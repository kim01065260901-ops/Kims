
import React, { useState } from 'react';

interface Props {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

const IngredientInput: React.FC<Props> = ({ ingredients, setIngredients }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const removeIngredient = (name: string) => {
    setIngredients(ingredients.filter(i => i !== name));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="예: 계란, 양파, 스팸"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-sm"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition-colors shadow-sm"
        >
          추가
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {ingredients.map((ing) => (
          <span
            key={ing}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-sm font-medium animate-in fade-in zoom-in duration-300"
          >
            {ing}
            <button
              onClick={() => removeIngredient(ing)}
              className="p-0.5 hover:bg-orange-200 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
        {ingredients.length === 0 && (
          <p className="text-slate-400 text-sm italic">재료를 입력해주세요...</p>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;
