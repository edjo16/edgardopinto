import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiElasticsearch,
  SiGithub,
  SiGitlab,
} from 'react-icons/si';
import {
  FaServer,
  FaMicrosoft,
  FaAws,
  FaDatabase,
  FaChartBar,
  FaRobot,
  FaPeopleCarry,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import type { SkillLevel } from './levels';

export type SkillCategory =
  | 'Frontend'
  | 'Backend & APIs'
  | 'Datos & BI'
  | 'Cloud & DevOps';

export type Skill = {
  name: string;
  level: SkillLevel;
  icon: IconType;
  category: SkillCategory;
};

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 'Avanzado', icon: SiReact, category: 'Frontend' },
  { name: 'Next.js', level: 'Avanzado', icon: SiNextdotjs, category: 'Frontend' },
  { name: 'TypeScript', level: 'Avanzado', icon: SiTypescript, category: 'Frontend' },
  { name: 'JavaScript', level: 'Avanzado', icon: SiJavascript, category: 'Frontend' },
  { name: 'HTML5', level: 'Avanzado', icon: SiHtml5, category: 'Frontend' },
  { name: 'CSS', level: 'Avanzado', icon: SiCss, category: 'Frontend' },

  // Backend & APIs
  { name: 'Node.js', level: 'Avanzado', icon: SiNodedotjs, category: 'Backend & APIs' },
  { name: 'REST APIs', level: 'Avanzado', icon: FaServer, category: 'Backend & APIs' },
  { name: 'Serverless', level: 'Intermedio', icon: FaServer, category: 'Backend & APIs' },
  { name: 'Python', level: 'Intermedio', icon: SiPython, category: 'Backend & APIs' },
  { name: 'PHP', level: 'Intermedio', icon: SiPhp, category: 'Backend & APIs' },
  { name: 'AI Agents (Anthropic / OpenAI)', level: 'Intermedio', icon: FaRobot, category: 'Backend & APIs' },

  // Datos & BI
  { name: 'PostgreSQL', level: 'Avanzado', icon: SiPostgresql, category: 'Datos & BI' },
  { name: 'SQL Server', level: 'Intermedio', icon: FaDatabase, category: 'Datos & BI' },
  { name: 'MySQL', level: 'Intermedio', icon: SiMysql, category: 'Datos & BI' },
  { name: 'Power BI', level: 'Avanzado', icon: FaChartBar, category: 'Datos & BI' },
  { name: 'ELK Stack', level: 'Intermedio', icon: SiElasticsearch, category: 'Datos & BI' },

  // Cloud & DevOps
  { name: 'Azure', level: 'Intermedio', icon: FaMicrosoft, category: 'Cloud & DevOps' },
  { name: 'AWS', level: 'Intermedio', icon: FaAws, category: 'Cloud & DevOps' },
  { name: 'GitHub', level: 'Avanzado', icon: SiGithub, category: 'Cloud & DevOps' },
  { name: 'GitLab', level: 'Intermedio', icon: SiGitlab, category: 'Cloud & DevOps' },
  { name: 'Scrum / Agile', level: 'Avanzado', icon: FaPeopleCarry, category: 'Cloud & DevOps' },
];

export const skillCategories: SkillCategory[] = [
  'Frontend',
  'Backend & APIs',
  'Datos & BI',
  'Cloud & DevOps',
];
