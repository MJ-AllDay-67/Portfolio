import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface D3Node extends SimulationNodeDatum {
  id: string;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface D3Link extends SimulationLinkDatum<D3Node> {
  source: string | D3Node;
  target: string | D3Node;
  value: number;
}

export interface CareerItem {
  id: number;
  role: string;
  company?: string;
  companyNote?: string;
  period: string;
  description?: string;
  technologies?: string[];
}

export enum ViewState {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  SKILLS = 'SKILLS',
  EXPERIENCE = 'EXPERIENCE',
  CONTACT = 'CONTACT'
}