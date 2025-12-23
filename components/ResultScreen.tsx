import React, { useEffect, useState } from 'react';
import { ScoreData } from '../types';
import { getPsychologicalAnalysis } from '../services/geminiService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface Props {
  scoreData: ScoreData;
  onRestart: () => void;
}

const ResultScreen: React.FC<Props> = ({ scoreData, onRestart }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const result = await getPsychologicalAnalysis(scoreData);
      setAnalysis(result);
      setLoading(false);
    };
    fetchAnalysis();
  }, [scoreData]);

  const levelMap = {
    'Low': '低水平',
    'Medium': '中等水平',
    'High': '高水平'
  };

  const radarData = [
    { subject: '自我效能', A: scoreData.dimensions['Self-Efficacy'], fullMark: 49 },
    { subject: '韧性', A: scoreData.dimensions['Resilience'], fullMark: 49 },
    { subject: '希望', A: scoreData.dimensions['Hope'], fullMark: 42 },
    { subject: '乐观', A: scoreData.dimensions['Optimism'], fullMark: 42 },
  ];

  // Helper to format text with Markdown-ish basic parsing for bold
  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Basic formatting for headers
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} className="font-bold text-lg mt-4 mb-2">{line.replace(/\*\*/g, '')}</h3>;
      }
      if (line.startsWith('#')) {
         return <h3 key={i} className="font-bold text-lg mt-4 mb-2">{line.replace(/#/g, '')}</h3>;
      }
      // Formatting for bold inside text
      const parts = line.split(/(\*\*.*?\*\*)/);
      return (
        <p key={i} className="mb-2 text-sm md:text-base leading-relaxed font-sans">
          {parts.map((part, index) => 
            part.startsWith('**') && part.endsWith('**') 
              ? <strong key={index}>{part.replace(/\*\*/g, '')}</strong> 
              : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-[#1a1a1a] text-white font-sans">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* Header - Level Clear Style */}
        <div className="text-center mb-8 border-b-4 border-white pb-6">
            <h1 className="text-3xl md:text-5xl font-['Press_Start_2P'] text-yellow-400 mb-4 animate-pulse">
                挑战成功！
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
                <div className="bg-blue-600 p-4 rounded border-4 border-white shadow-lg">
                    <p className="text-sm font-['Press_Start_2P'] mb-2">总得分</p>
                    <p className="text-4xl font-bold">{scoreData.total}</p>
                </div>
                <div className="bg-green-600 p-4 rounded border-4 border-white shadow-lg">
                    <p className="text-sm font-['Press_Start_2P'] mb-2">水平</p>
                    <p className="text-4xl font-bold">{levelMap[scoreData.level]}</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Chart Section */}
            <div className="bg-white text-black p-4 rounded-lg border-4 border-gray-400 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
                <h3 className="text-xl font-bold text-center mb-4 font-['Press_Start_2P']">维度分析</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#000" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'black', fontSize: 14, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 49]} tick={false} axisLine={false} />
                            <Radar
                                name="Score"
                                dataKey="A"
                                stroke="#eab308"
                                strokeWidth={3}
                                fill="#eab308"
                                fillOpacity={0.6}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Analysis Section */}
            <div className="bg-[#2a2a2a] p-6 rounded-lg border-4 border-yellow-400 relative">
                <h3 className="text-xl text-yellow-400 mb-4 font-['Press_Start_2P']">结果解读：</h3>
                
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-48 space-y-4">
                        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="animate-pulse">正在生成分析报告...</p>
                    </div>
                ) : (
                    <div className="max-h-64 md:max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                        {renderText(analysis)}
                    </div>
                )}
            </div>
        </div>

        <div className="text-center pb-12">
            <button 
                onClick={onRestart}
                className="bg-red-500 hover:bg-red-600 text-white font-['Press_Start_2P'] border-4 border-white px-8 py-4 text-sm md:text-base shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-y-1 active:shadow-none transition-all"
            >
                再次检测
            </button>
        </div>

      </div>
    </div>
  );
};

export default ResultScreen;