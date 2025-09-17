import { Resume } from "@/types/resume";

interface ContemporaryTemplateProps {
  resume: Resume;
}

export function ContemporaryTemplate({ resume }: ContemporaryTemplateProps) {
  return (
    <div className="max-w-[8.5in] mx-auto bg-white flex" style={{ minHeight: '11in' }}>
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-teal-600 to-teal-700 text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {resume.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-teal-100 text-sm">
            {resume.workExperience?.length > 0 && resume.workExperience[0].position}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-teal-100">CONTACT</h3>
          <div className="space-y-2 text-sm">
            {resume.personalInfo.email && (
              <div className="flex items-center">
                <span className="mr-2">✉</span>
                <span className="break-all">{resume.personalInfo.email}</span>
              </div>
            )}
            {resume.personalInfo.phone && (
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <span>{resume.personalInfo.phone}</span>
              </div>
            )}
            {resume.personalInfo.location && (
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{resume.personalInfo.location}</span>
              </div>
            )}
            {resume.personalInfo.linkedin && (
              <div className="flex items-center">
                <span className="mr-2">💼</span>
                <span className="break-all">{resume.personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-teal-100">SKILLS</h3>
            <div className="space-y-3">
              {Object.entries(resume.skills?.reduce((acc, skill) => {
                const category = skill.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(skill);
                return acc;
              }, {} as Record<string, typeof resume.skills>) || {}).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-teal-200 text-sm mb-1 uppercase">{category}</h4>
                    <div className="space-y-1">
                      {skills.map((skill, index) => (
                        <div key={index} className="text-sm">
                          <div className="flex justify-between items-center mb-1">
                            <span>{skill.name}</span>
                            <span className="text-xs">{skill.level}/5</span>
                          </div>
                          <div className="w-full bg-teal-800 rounded-full h-1">
                            <div 
                              className="bg-teal-300 h-1 rounded-full"
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resume.languages?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-teal-100">LANGUAGES</h3>
            <div className="space-y-2">
              {resume.languages?.map((language, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between">
                    <span>{language.name}</span>
                    <span className="text-teal-200 capitalize">{language.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8">
        {/* Professional Summary */}
        {resume.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-200 pb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {resume.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {resume.workExperience?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-200 pb-2">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-6">
              {resume.workExperience?.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-teal-600 font-medium">{exp.company}</p>
                      {exp.location && (
                        <p className="text-gray-600 text-sm">{exp.location}</p>
                      )}
                    </div>
                    <div className="bg-teal-100 text-teal-700 px-3 py-1 rounded text-sm font-semibold">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm leading-relaxed">
                      {exp.description.map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-1">• {line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-200 pb-2">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {resume.education?.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-teal-600">{edu.institution}</p>
                    {edu.field && (
                      <p className="text-sm text-gray-600 mt-1">{edu.field}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>{edu.startDate} - {edu.endDate || "Present"}</div>
                    {edu.location && <div>{edu.location}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-200 pb-2">
              PROJECTS
            </h2>
            <div className="space-y-4">
              {resume.projects?.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.url && (
                      <a href={project.url} className="text-teal-600 text-sm hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                      {project.description}
                    </p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}