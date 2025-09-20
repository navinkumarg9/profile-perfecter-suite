import { useState, useEffect } from 'react';
import { Resume, PersonalInfo, WorkExperience, Education, Skill, Project, Certification, Language, Interest, CustomSection } from '@/types/resume';

const defaultPersonalInfo: PersonalInfo = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890',
  location: 'New York, NY',
  website: 'johndoe.com',
  linkedin: 'linkedin.com/in/johndoe',
  github: 'github.com/johndoe',
  summary: 'Experienced software engineer with a passion for building scalable web applications.',
};

const defaultWorkExperience: WorkExperience[] = [
  {
    id: '1',
    company: 'Tech Solutions Inc.',
    position: 'Senior Software Engineer',
    location: 'New York, NY',
    startDate: '2019',
    endDate: 'Present',
    current: true,
    description: [
      'Developed and maintained web applications using React and Node.js.',
      'Improved application performance by 40%',
      'Led a team of 5 developers',
      'Implemented CI/CD pipeline'
    ]
  }
];

const defaultEducation: Education[] = [
  {
    id: '1',
    institution: 'University of Technology',
    degree: 'Bachelor of Science in Computer Science',
    field: 'Computer Science',
    location: 'Boston, MA',
    startDate: '2015',
    endDate: '2019',
    gpa: '3.8/4.0'
  }
];

const defaultSkills: Skill[] = [
  { id: '1', name: 'JavaScript', level: 5, category: 'technical' },
  { id: '2', name: 'React', level: 4, category: 'technical' },
  { id: '3', name: 'Node.js', level: 4, category: 'technical' }
];

const defaultProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    url: 'github.com/johndoe/ecommerce',
    github: 'github.com/johndoe/ecommerce',
    startDate: '2020',
    endDate: '2020'
  }
];

const defaultCertifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2021'
  }
];

const defaultLanguages: Language[] = [
  { id: '1', name: 'English', level: 'native' },
  { id: '2', name: 'Spanish', level: 'intermediate' }
];

const defaultInterests: Interest[] = [
  { id: '1', name: 'Programming', category: 'Technical' },
  { id: '2', name: 'Hiking', category: 'Outdoor' }
];

const defaultResume: Resume = {
  personalInfo: defaultPersonalInfo,
  workExperience: defaultWorkExperience,
  education: defaultEducation,
  skills: defaultSkills,
  projects: defaultProjects,
  certifications: defaultCertifications,
  languages: defaultLanguages,
  interests: defaultInterests,
  customSections: [
    {
      id: '1',
      title: 'References',
      content: 'Jane Smith - CTO at Tech Solutions Inc. | Email: jane.smith@example.com | Phone: (123) 456-7890 | Direct supervisor for 3 years.'
    },
    {
      id: '2',
      title: 'Volunteer Experience',
      content: 'Code Mentor at Code.org (2018 - Present) - Mentoring high school students in programming.'
    }
  ],
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
          workExperience: parsedResume.workExperience || defaultWorkExperience,
          education: parsedResume.education || defaultEducation,
          skills: parsedResume.skills || defaultSkills,
          projects: parsedResume.projects || defaultProjects,
          certifications: parsedResume.certifications || defaultCertifications,
          languages: parsedResume.languages || defaultLanguages,
          interests: parsedResume.interests || defaultInterests,
          customSections: parsedResume.customSections || defaultResume.customSections,
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