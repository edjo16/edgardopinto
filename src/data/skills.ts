import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiRedux,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiMongodb,
} from 'react-icons/si';
import { FaServer, FaMicrosoft } from 'react-icons/fa';
import type { IconType } from 'react-icons';

export type Skill = {
  name: string;
  level: number; // 0-100
  icon: IconType;
  category: 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'Data';
};

export const skills: Skill[] = [
  { name: 'React', level: 92, icon: SiReact, category: 'Frontend' },
  { name: 'TypeScript', level: 88, icon: SiTypescript, category: 'Frontend' },
  { name: 'JavaScript', level: 93, icon: SiJavascript, category: 'Frontend' },
  { name: 'Redux', level: 80, icon: SiRedux, category: 'Frontend' },
  { name: 'Node.js', level: 86, icon: SiNodedotjs, category: 'Backend' },
  { name: 'Express', level: 84, icon: SiExpress, category: 'Backend' },
  { name: 'Python', level: 70, icon: SiPython, category: 'Backend' },
  { name: 'PostgreSQL', level: 85, icon: SiPostgresql, category: 'Data' },
  { name: 'SQL Server', level: 78, icon: FaServer, category: 'Data' },
  { name: 'MongoDB', level: 75, icon: SiMongodb, category: 'Data' },
  { name: 'Azure', level: 76, icon: FaMicrosoft, category: 'Cloud & DevOps' },
  { name: 'Docker', level: 74, icon: SiDocker, category: 'Cloud & DevOps' },
  { name: 'Git', level: 88, icon: SiGit, category: 'Cloud & DevOps' },
];

export const skillCategories = [
  'Frontend',
  'Backend',
  'Data',
  'Cloud & DevOps',
] as const;
