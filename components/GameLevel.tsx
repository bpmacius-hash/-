import React, { useState } from 'react';
import { Question, Option } from '../types';
import { OPTIONS } from '../constants';

interface Props {
  question: Question;
  currentLevel: number;
  totalLevels: number;
  onAnswer: (score: number) => void;
  totalCoins: number;
}

const GameLevel: React.FC<Props> = ({ question, currentLevel, totalLevels, onAnswer, totalCoins }) => {
  const [animating, setAnimating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (val: number) => {
    setSelectedOption(val);
    setAnimating(true);
    setTimeout(() => {
      onAnswer(val);
      setAnimating(false);
      setSelectedOption(null);
    }, 500);
  };

  // Calculate actual score based on logic (reverse or direct)
  const calculateDisplayCoins = (val: number) => {
    return question.isReverse ? (8 - val) : val;
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Header UI */}
      <div className="flex justify-between items-center p-2 md:p-8 relative z-20 shrink-0">
        <div className="bg-black/40 text-white p-2 border-2 border-white rounded scale-75 md:scale-100 origin-top-left">
          <p className="text-xs">关卡</p>
          <p className="text-lg">1-{currentLevel}</p>
        </div>
        
        <div className="flex flex-col items-center scale-75 md:scale-100 origin-top">
             <h2 className="text-xs text-white mb-1">金币</h2>
             <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border-2 border-yellow-400">
                <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 shadow-inner coin-spin flex items-center justify-center text-[10px] font-bold text-yellow-800">$</div>
                <span className="text-yellow-400 text-xl md:text-2xl">x {totalCoins}</span>
            </div>
        </div>

        {/* Spacer to balance layout */}
        <div className="hidden md:block w-20"></div> 
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 relative z-10 w-full max-w-5xl mx-auto">
        
        {/* Question Box */}
        <div className={`
            bg-[#b85c38] border-4 border-black p-3 md:p-10 mb-2 md:mb-8 w-full max-w-3xl text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]
            bg-[url('https://www.transparenttextures.com/patterns/brick-wall.png')]
            transform transition-all duration-300 ${animating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
        `}>
            {/* Corner bolts */}
            <div className="absolute top-1 left-1 md:top-2 md:left-2 w-1 h-1 md:w-2 md:h-2 bg-black"></div>
            <div className="absolute top-1 right-1 md:top-2 md:right-2 w-1 h-1 md:w-2 md:h-2 bg-black"></div>
            <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-1 h-1 md:w-2 md:h-2 bg-black"></div>
            <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-1 h-1 md:w-2 md:h-2 bg-black"></div>

            <h2 className="text-white text-sm md:text-2xl leading-relaxed font-sans font-bold drop-shadow-md">
                {question.id}. {question.text}
            </h2>
        </div>

        {/* Character Avatar (Super Mario 2D Style) */}
        <div className={`mb-2 md:mb-8 transition-transform duration-500 ${animating ? 'mario-jump' : ''} shrink-0`}>
             <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-44 md:h-44 drop-shadow-[0_5px_0_rgba(0,0,0,0.3)] md:drop-shadow-[0_10px_0_rgba(0,0,0,0.3)]">
                {/* 
                   Style Guide: Super Mario / Paper Mario
                   - Thick Black Outlines (strokeWidth)
                   - Vibrant Flat Colors
                   - Simple Shading
                */}
                <g stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    
                    {/* --- Back Limbs --- */}
                    <ellipse cx="20" cy="70" rx="10" ry="8" fill="#FFC1CC" transform="rotate(-20 20 70)"/>
                    <ellipse cx="80" cy="70" rx="10" ry="8" fill="#FFC1CC" transform="rotate(20 80 70)"/>

                    {/* --- Ears --- */}
                    <circle cx="25" cy="30" r="13" fill="#FFC1CC" />
                    <circle cx="25" cy="30" r="7" fill="#F06292" stroke="none"/>
                    <circle cx="75" cy="30" r="13" fill="#FFC1CC" />
                    <circle cx="75" cy="30" r="7" fill="#F06292" stroke="none"/>

                    {/* --- Feet --- */}
                    <ellipse cx="32" cy="90" rx="13" ry="9" fill="#FFC1CC" />
                    <ellipse cx="68" cy="90" rx="13" ry="9" fill="#FFC1CC" />

                    {/* --- Body --- */}
                    <ellipse cx="50" cy="75" rx="36" ry="30" fill="#FFC1CC" />

                    {/* --- Glass Belly --- */}
                    <circle cx="50" cy="80" r="21" fill="#E1F5FE" strokeWidth="2.5" />
                    <path d="M38,72 Q42,65 52,68" fill="none" stroke="white" strokeWidth="3" opacity="0.9" strokeLinecap="round" />
                    <circle cx="48" cy="85" r="1" fill="white" stroke="none" opacity="0.8"/>
                    
                    {/* Hearts Inside */}
                    <g stroke="none">
                         <path d="M50,88 C50,88 42,82 42,78 C42,75 44,75 46,75 C48,75 50,77 50,77 C50,77 52,75 54,75 C56,75 58,75 58,78 C58,82 50,88 50,88" 
                               fill="#03A9F4" 
                               style={{filter: "drop-shadow(1px 1px 0px rgba(0,0,0,0.1))"}}/>
                         <path d="M58,82 C58,82 54,79 54,77 C54,75 55,75 56,75 C57,75 58,76 58,76 C58,76 59,75 60,75 C61,75 62,75 62,77 C62,79 58,82 58,82" 
                               fill="#E91E63" 
                               transform="translate(4, -8) rotate(15)"
                               style={{filter: "drop-shadow(1px 1px 0px rgba(0,0,0,0.1))"}}/>
                    </g>

                    {/* --- Head --- */}
                    <circle cx="50" cy="45" r="30" fill="#FFC1CC" />

                    {/* --- Face --- */}
                    <g stroke="none" fill="#1a1a1a">
                        <ellipse cx="38" cy="42" rx="3.5" ry="5.5" />
                        <circle cx="39.5" cy="39.5" r="1.5" fill="white" />
                        <ellipse cx="62" cy="42" rx="3.5" ry="5.5" />
                        <circle cx="63.5" cy="39.5" r="1.5" fill="white" />
                    </g>
                    <g stroke="none" fill="#F06292" opacity="0.5">
                        <ellipse cx="28" cy="50" rx="6" ry="4" />
                        <ellipse cx="72" cy="50" rx="6" ry="4" />
                    </g>
                    <ellipse cx="50" cy="52" rx="10" ry="7" fill="white" strokeWidth="2" />
                    <circle cx="50" cy="49" r="3" fill="#3E2723" stroke="none"/>
                    <path d="M47,54 Q50,57 53,54" fill="none" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />

                </g>
             </svg>
        </div>

        {/* Options Grid - optimized for mobile (3 cols) */}
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2 md:gap-3 w-full px-1">
            {OPTIONS.map((opt, index) => {
                const coinValue = calculateDisplayCoins(opt.value);
                const isSelected = selectedOption === opt.value;
                
                // For the last item (7th item, index 6), if we are on mobile (grid-cols-3), 
                // it ends up in the 3rd row, 1st column.
                // We want it centered, so we place it in col-start-2.
                // On desktop (md), it's a 7-col grid, so we reset to auto.
                const gridPlacementClass = index === 6 ? 'col-start-2 md:col-start-auto' : '';

                return (
                    <button
                        key={opt.value}
                        onClick={() => handleOptionClick(opt.value)}
                        disabled={animating}
                        className={`group relative flex flex-col items-center justify-end h-24 md:h-40 transition-transform hover:-translate-y-2 focus:outline-none ${gridPlacementClass}`}
                    >
                        {/* Mystery Block - Compact on mobile */}
                        <div className="w-full h-10 md:h-16 bg-yellow-400 border-2 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center text-lg md:text-2xl font-bold text-yellow-800 mb-1 md:mb-2 group-hover:bg-yellow-300">
                            ?
                        </div>
                        
                        {/* Label - Compact on mobile */}
                        <div className="bg-white border-2 border-black px-1 py-1 text-[9px] md:text-xs text-center w-full min-h-[32px] md:min-h-[40px] flex items-center justify-center font-sans font-bold leading-tight break-words">
                            {opt.label}
                        </div>

                         {/* Coin Pop-up */}
                         {isSelected && (
                             <div className="absolute top-0 -translate-y-8 md:-translate-y-12 text-yellow-300 font-bold drop-shadow-[0_2px_0_rgba(0,0,0,1)] text-xl md:text-2xl z-20 animate-bounce">
                                +{coinValue}
                             </div>
                         )}
                    </button>
                )
            })}
        </div>

      </div>

      {/* Ground Decoration - Thinner on mobile */}
      <div className="h-8 md:h-12 w-full bg-[#795548] border-t-4 md:border-t-8 border-[#4CAF50] relative z-0 shrink-0">
         {/* Left Pipe */}
         <div className="absolute bottom-0 left-4 md:left-10 w-10 md:w-16 h-12 md:h-24 bg-green-500 border-2 md:border-4 border-black border-b-0">
            <div className="w-[120%] -ml-[10%] h-6 md:h-8 bg-green-500 border-2 md:border-4 border-black mb-1 md:mb-2"></div>
         </div>
         {/* Right Pipe */}
         <div className="absolute bottom-0 right-4 md:right-10 w-10 md:w-16 h-12 md:h-24 bg-green-500 border-2 md:border-4 border-black border-b-0">
            <div className="w-[120%] -ml-[10%] h-6 md:h-8 bg-green-500 border-2 md:border-4 border-black mb-1 md:mb-2"></div>
         </div>
      </div>
    </div>
  );
};

export default GameLevel;