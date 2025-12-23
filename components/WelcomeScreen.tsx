import React from 'react';

interface Props {
  onStart: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative z-10 p-4">
      {/* Clouds Background decoration */}
      <div className="absolute top-10 left-10 text-white opacity-80 text-6xl select-none">☁️</div>
      <div className="absolute top-20 right-20 text-white opacity-80 text-6xl select-none">☁️</div>

      <div className="bg-white/90 border-4 border-black p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl">
        <h1 className="text-3xl md:text-5xl text-red-600 mb-6 drop-shadow-md leading-tight font-bold">
          海亮幸福<br />能量检测站
        </h1>
        
        <p className="text-gray-800 text-sm md:text-base mb-8 leading-relaxed font-sans font-bold">
          通过26个关卡探索你的内心世界！
          <br/><br/>
          收集金币，发现你的隐藏超能力：<br/>
          自我效能、韧性、希望和乐观。
        </p>

        <button 
          onClick={onStart}
          className="bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black px-8 py-4 text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all animate-pulse font-bold"
        >
          开始冒险
        </button>
      </div>
      
      <div className="absolute bottom-0 w-full h-16 bg-[#5c94fc] border-t-4 border-[#80d010] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Super_Mario_Bros._Ground_Texture.png/120px-Super_Mario_Bros._Ground_Texture.png')] bg-repeat-x bg-contain"></div>
    </div>
  );
};

export default WelcomeScreen;