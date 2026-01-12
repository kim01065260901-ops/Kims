
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-orange-100 rounded-full border-t-orange-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold text-slate-800">최적의 레시피를 찾고 있어요</h3>
        <p className="text-slate-500 text-sm animate-pulse">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
};

export default LoadingState;
