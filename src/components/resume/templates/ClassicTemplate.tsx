import { Resume } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface ClassicTemplateProps {
  resume: Resume;
}

export function ClassicTemplate({ resume }: ClassicTemplateProps) {
  const { personalInfo, workExperience, education, skills, projects } = resume;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillsByCategory = (category: string) => {
    return skills?.filter(skill => skill.category === category) || [];
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-900 font-serif" style={{ minHeight: '11in' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold mb-3">{personalInfo.fullName || 'Your Name'}</h1>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-4">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span className="break-all">{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span className="break-all">{personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-8 space-y-8">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {workExperience?.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <p className="font-medium">{exp.company} | {exp.location}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    {exp.description.map((desc, index) => (
                      <li key={index} className="text-sm leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {education?.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.institution} | {edu.location}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['technical', 'soft', 'language'].map((category) => {
                const categorySkills = getSkillsByCategory(category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-900 mb-2 capitalize">
                      {category === 'technical' ? 'Technical' : category === 'soft' ? 'Soft Skills' : 'Languages'}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {categorySkills.map((skill) => (
                        <li key={skill.id}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
              NOTABLE PROJECTS
            </h2>
            <div className="space-y-4">
              {projects?.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Technologies:</strong> {project.technologies.join(', ')}
                      </p>
                      <div className="flex gap-4 text-sm mt-1">
                        {project.url && (
                          <span className="text-gray-600">Demo: {project.url}</span>
                        )}
                        {project.github && (
                          <span className="text-gray-600">GitHub: {project.github}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}