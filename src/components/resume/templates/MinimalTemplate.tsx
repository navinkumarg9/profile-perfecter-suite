import { Resume } from "@/types/resume";

interface MinimalTemplateProps {
  resume: Resume;
}

export function MinimalTemplate({ resume }: MinimalTemplateProps) {
  const { personalInfo, workExperience, education, skills, projects } = resume;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white text-gray-900 font-sans" style={{ minHeight: '11in' }}>
      <div className="p-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light tracking-wide">{personalInfo.fullName || 'Your Name'}</h1>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            {personalInfo.website && <span>{personalInfo.website}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="text-center">
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section>
            <h2 className="text-xl font-light tracking-wider text-center mb-8 text-gray-800">
              EXPERIENCE
            </h2>
            <div className="space-y-8">
              {workExperience.map((exp) => (
                <div key={exp.id} className="text-center">
                  <h3 className="text-lg font-medium">{exp.position}</h3>
                  <p className="text-gray-700 font-light">{exp.company} • {exp.location}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                  <div className="max-w-3xl mx-auto">
                    {exp.description.map((desc, index) => (
                      <p key={index} className="text-sm text-gray-700 leading-relaxed mb-2 font-light">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-light tracking-wider text-center mb-8 text-gray-800">
              EDUCATION
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="text-center">
                  <h3 className="text-lg font-medium">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700 font-light">{edu.institution} • {edu.location}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </p>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xl font-light tracking-wider text-center mb-8 text-gray-800">
              SKILLS
            </h2>
            <div className="space-y-6">
              {['technical', 'soft', 'language'].map((category) => {
                const categorySkills = getSkillsByCategory(category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="text-center">
                    <h3 className="text-lg font-medium mb-3 capitalize text-gray-700">
                      {category === 'technical' ? 'Technical Skills' : category === 'soft' ? 'Soft Skills' : 'Languages'}
                    </h3>
                    <p className="text-gray-600 font-light">
                      {categorySkills.map(skill => skill.name).join(' • ')}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xl font-light tracking-wider text-center mb-8 text-gray-800">
              PROJECTS
            </h2>
            <div className="space-y-8">
              {projects.map((project) => (
                <div key={project.id} className="text-center">
                  <h3 className="text-lg font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(project.startDate)} – {formatDate(project.endDate)}
                  </p>
                  <p className="text-gray-700 font-light mb-3 max-w-3xl mx-auto">
                    {project.description}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {project.technologies.join(' • ')}
                  </p>
                  <div className="flex justify-center gap-6 text-sm">
                    {project.url && (
                      <span className="text-gray-600">Demo: {project.url}</span>
                    )}
                    {project.github && (
                      <span className="text-gray-600">GitHub: {project.github}</span>
                    )}
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