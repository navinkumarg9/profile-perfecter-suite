import { useState, useEffect } from 'react';
import { Resume, PersonalInfo, WorkExperience, Education, Skill, Project, Certification, Language, Interest, CustomSection } from '@/types/resume';

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
  certifications: [],
  languages: [],
  interests: [],
  customSections: [],
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
        const parsedResume = JSON.parse(savedResume);
        // Ensure all arrays exist to prevent undefined errors
        setResume({
          ...defaultResume,
          ...parsedResume,
          workExperience: parsedResume.workExperience || [],
          education: parsedResume.education || [],
          skills: parsedResume.skills || [],
          projects: parsedResume.projects || [],
          certifications: parsedResume.certifications || [],
          languages: parsedResume.languages || [],
          interests: parsedResume.interests || [],
          customSections: parsedResume.customSections || [],
        });
      } catch (error) {
        console.error('Error parsing saved resume data:', error);
        setResume(defaultResume);
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

  const updateCertifications = (certifications: Certification[]) => {
    setResume(prev => ({ ...prev, certifications }));
  };

  const addCertification = (certification: Omit<Certification, 'id'>) => {
    const newCertification: Certification = {
      ...certification,
      id: Date.now().toString(),
    };
    setResume(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification],
    }));
  };

  const updateLanguages = (languages: Language[]) => {
    setResume(prev => ({ ...prev, languages }));
  };

  const addLanguage = (language: Omit<Language, 'id'>) => {
    const newLanguage: Language = {
      ...language,
      id: Date.now().toString(),
    };
    setResume(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage],
    }));
  };

  const updateInterests = (interests: Interest[]) => {
    setResume(prev => ({ ...prev, interests }));
  };

  const addInterest = (interest: Omit<Interest, 'id'>) => {
    const newInterest: Interest = {
      ...interest,
      id: Date.now().toString(),
    };
    setResume(prev => ({
      ...prev,
      interests: [...prev.interests, newInterest],
    }));
  };

  const updateCustomSections = (customSections: CustomSection[]) => {
    setResume(prev => ({ ...prev, customSections }));
  };

  const addCustomSection = (customSection: Omit<CustomSection, 'id'>) => {
    const newCustomSection: CustomSection = {
      ...customSection,
      id: Date.now().toString(),
    };
    setResume(prev => ({
      ...prev,
      customSections: [...prev.customSections, newCustomSection],
    }));
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
    updateCertifications,
    addCertification,
    updateLanguages,
    addLanguage,
    updateInterests,
    addInterest,
    updateCustomSections,
    addCustomSection,
    updateTemplate,
    resetResume,
  };
};