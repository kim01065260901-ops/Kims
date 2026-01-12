
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="py-20 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-orange-100 rounded-full border-t-orange-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
      </div>
      <div className="text-center space-y-3">
        <h3 className="text-xl font-black text-slate-800">요리와 이미지를 생성하고 있어요</h3>
        <p className="text-slate-400 text-sm max-w-[280px] leading-relaxed">
          Gemini가 재료에 딱 맞는 레시피와 먹음직스러운 사진을 준비 중입니다. 잠시만 기다려주세요!
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
