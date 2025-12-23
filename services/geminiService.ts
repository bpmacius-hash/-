import { GoogleGenAI } from "@google/genai";
import { ScoreData } from "../types";

export const getPsychologicalAnalysis = async (scoreData: ScoreData): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "未找到API Key，无法生成分析报告。";
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are a warm, supportive, and professional psychological analysis assistant.
      A user has just completed the "HaiLiang Happiness Energy Check" (based on Psychological Capital/PsyCap).
      
      Here are their results:
      - Total Score: ${scoreData.total} (Level: ${scoreData.level})
      - Self-Efficacy Score: ${scoreData.dimensions["Self-Efficacy"]} (Max: 49)
      - Resilience Score: ${scoreData.dimensions["Resilience"]} (Max: 49)
      - Hope Score: ${scoreData.dimensions["Hope"]} (Max: 42)
      - Optimism Score: ${scoreData.dimensions["Optimism"]} (Max: 42)

      Please provide a comprehensive analysis of these results in Chinese (Mandarin).
      
      **MANDATORY OPENING**:
      You MUST start your response with exactly this paragraph:
      "您好！感谢您完成本次海亮幸福能量检测。这是一份基于积极心理资本的评估，旨在帮助您了解自己的心理能量状态。"

      After this opening paragraph, structure the rest of your response as follows:
      1. **总体评估**: A warm, professional summary of their psychological energy state based on their total score and level.
      2. **维度分析**: Briefly explain their strengths or areas for growth in each of the 4 dimensions based on their specific scores.
      3. **行动建议**: Give 3 concrete, simple, and actionable psychological tips to improve their well-being.
      
      **CRITICAL INSTRUCTIONS**:
      - Do NOT refer to yourself as a "Psychometrician" (心理测评师), "Doctor", or "Counselor".
      - Do NOT use phrases like "Psychometrician's words" (测评师寄语).
      - Do NOT include any text inviting the user to ask follow-up questions, contact you, or say "if you have doubts, feel free to ask". This is a static report and the user cannot reply.
      - Keep the tone encouraging, positive, and objective.
      - Use markdown for formatting. 
      - Keep the response concise (under 400 words).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "无法生成分析。";
  } catch (error) {
    console.error("Error generating analysis:", error);
    return "抱歉，暂时无法生成详细分析，请参考分数图表。";
  }
};