import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const getClient = (): GoogleGenAI => {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// System instruction to give the AI a persona
const SYSTEM_INSTRUCTION = `
You are 'Nexus', an advanced AI portfolio assistant for a Senior Frontend Engineer. 
Your goal is to answer questions about the engineer's skills, experience, and projects based on a typical high-performer profile.
- You are witty, futuristic, and professional.
- The engineer is expert in React, TypeScript, Gemini API, Tailwind, and Node.js.
- If asked about contact info, suggest looking at the Contact section of the site.
- Keep answers concise (under 100 words) as you are a chat interface.
- Do not make up specific employment dates unless hypothetical, just emphasize expertise.
`;

export const createChatSession = (): Chat => {
  const ai = getClient();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission error. Data packet lost.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "System malfunction. Unable to process request.";
  }
};
