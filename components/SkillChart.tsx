import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { SkillData } from '../types';

const data: SkillData[] = [
  { subject: 'React', A: 95, fullMark: 100 },
  { subject: 'TypeScript', A: 90, fullMark: 100 },
  { subject: 'Node.js', A: 85, fullMark: 100 },
  { subject: 'UI/UX', A: 80, fullMark: 100 },
  { subject: 'GenAI', A: 88, fullMark: 100 },
  { subject: 'DevOps', A: 70, fullMark: 100 },
];

const SkillChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full max-w-md mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'Rajdhani' }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skill Level"
            dataKey="A"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="#3b82f6"
            fillOpacity={0.3}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111827', borderColor: '#3b82f6', color: '#fff' }}
            itemStyle={{ color: '#60a5fa' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
