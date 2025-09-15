import { useState, useEffect } from 'react';
import { Resume, PersonalInfo, WorkExperience, Education, Skill, Project } from '@/types/resume';

const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  github: '',
  summary: '',
};

const defaultResume: Resume = {
  personalInfo: defaultPersonalInfo,
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  template: 'modern',
};

export const useResumeData = () => {
  const [resume, setResume] = useState<Resume>(defaultResume);
  const [isLoading, setIsLoading] = useState(true);

  // Load resume data from localStorage on mount
  useEffect(() => {
    const savedResume = localStorage.getItem('resume-data');
    if (savedResume) {
      try {
        setResume(JSON.parse(savedResume));
      } catch (error) {
        console.error('Error parsing saved resume data:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever resume changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('resume-data', JSON.stringify(resume));
    }
  }, [resume, isLoading]);

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setResume(prev => ({ ...prev, personalInfo }));
  };

  const updateWorkExperience = (workExperience: WorkExperience[]) => {
    setResume(prev => ({ ...prev, workExperience }));
  };

  const addWorkExperience = (experience: Omit<WorkExperience, 'id'>) => {
    const newExperience: WorkExperience = {
      ...experience,
      id: Date.now().toString(),
    };
    setResume(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience],
    }));
  };

  const updateEducation = (education: Education[]) => {
    setResume(prev => ({ ...prev, education }));
  };

  const addEducation = (edu: Omit<Education, 'id'>) => {
    const newEducation: Education = {
      ...edu,
      id: Date.now().toString(),
    };
    setResume(prev => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateSkills = (skills: Skill[]) => {
    setResume(prev => ({ ...prev, skills }));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString(),
    };
    setResume(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateProjects = (projects: Project[]) => {
    setResume(prev => ({ ...prev, projects }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateTemplate = (template: Resume['template']) => {
    setResume(prev => ({ ...prev, template }));
  };

  const resetResume = () => {
    setResume(defaultResume);
    localStorage.removeItem('resume-data');
  };

  return {
    resume,
    isLoading,
    updatePersonalInfo,
    updateWorkExperience,
    addWorkExperience,
    updateEducation,
    addEducation,
    updateSkills,
    addSkill,
    updateProjects,
    addProject,
    updateTemplate,
    resetResume,
  };
};