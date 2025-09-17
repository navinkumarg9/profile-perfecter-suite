import { Resume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from "lucide-react";

interface CreativeTemplateProps {
  resume: Resume;
}

export function CreativeTemplate({ resume }: CreativeTemplateProps) {
  const { personalInfo, workExperience, education, skills, projects } = resume;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillsByCategory = (category: string) => {
    return skills?.filter(skill => skill.category === category) || [];
  };

  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < level ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-800 font-sans" style={{ minHeight: '11in' }}>
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 via-purple-700 to-indigo-800 text-white p-6">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold">
                {personalInfo.fullName ? personalInfo.fullName.split(' ').map(n => n[0]).join('') : 'YN'}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">CONTACT</h2>
            <div className="space-y-3 text-sm">
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all text-xs">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all text-xs">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-start gap-2">
                  <Github className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all text-xs">{personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">SKILLS</h2>
              <div className="space-y-6">
                {['technical', 'soft', 'language'].map((category) => {
                  const categorySkills = getSkillsByCategory(category);
                  if (categorySkills.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-white/90 mb-3 capitalize">
                        {category === 'technical' ? 'Technical' : category === 'soft' ? 'Soft Skills' : 'Languages'}
                      </h3>
                      <div className="space-y-2">
                        {categorySkills.map((skill) => (
                          <div key={skill.id}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs">{skill.name}</span>
                            </div>
                            {renderSkillLevel(skill.level)}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">EDUCATION</h2>
              <div className="space-y-4">
                {education?.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                    <p className="text-white/90">{edu.field}</p>
                    <p className="text-white/80 text-xs">{edu.institution}</p>
                    <p className="text-white/70 text-xs">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && <p className="text-white/70 text-xs">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-4 relative">
                PROFILE
                <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {workExperience?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-6 relative">
                EXPERIENCE
                <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </h2>
              <div className="space-y-6">
                {workExperience?.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <div className="ml-6 border-l-2 border-gray-200 pl-6 pb-6">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-purple-600 font-medium">{exp.company}</p>
                          <p className="text-gray-600 text-sm">{exp.location}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1 lg:mt-0 bg-gray-100 px-3 py-1 rounded-full">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </div>
                      </div>
                      <ul className="space-y-1 text-gray-700">
                        {exp.description.map((desc, descIndex) => (
                          <li key={descIndex} className="text-sm leading-relaxed flex items-start">
                            <span className="text-purple-500 mr-2">▸</span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-purple-700 mb-6 relative">
                PROJECTS
                <div className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </h2>
              <div className="space-y-6">
                {projects?.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1 lg:mt-0">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 text-sm">
                      {project.url && (
                        <a href={project.url} className="text-purple-600 hover:underline">
                          🔗 Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} className="text-purple-600 hover:underline">
                          📁 GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}