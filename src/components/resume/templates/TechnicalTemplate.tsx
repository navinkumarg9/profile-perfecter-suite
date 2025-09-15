import { Resume } from "@/types/resume";

interface TechnicalTemplateProps {
  resume: Resume;
}

export function TechnicalTemplate({ resume }: TechnicalTemplateProps) {
  return (
    <div className="max-w-[8.5in] mx-auto bg-white p-6 shadow-lg font-mono" style={{ minHeight: '11in' }}>
      {/* Header Section */}
      <div className="border-2 border-green-500 p-4 mb-6 bg-black text-green-400">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            $ whoami
          </h1>
          <div className="text-lg">
            {resume.personalInfo.fullName || "developer"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          {/* Contact Info */}
          <div className="border border-gray-300 p-4">
            <h2 className="text-lg font-bold mb-3 text-green-600">
              // Contact
            </h2>
            <div className="space-y-2 text-sm">
              {resume.personalInfo.email && (
                <div>
                  <span className="text-blue-600">email:</span> {resume.personalInfo.email}
                </div>
              )}
              {resume.personalInfo.phone && (
                <div>
                  <span className="text-blue-600">phone:</span> {resume.personalInfo.phone}
                </div>
              )}
              {resume.personalInfo.location && (
                <div>
                  <span className="text-blue-600">location:</span> {resume.personalInfo.location}
                </div>
              )}
              {resume.personalInfo.github && (
                <div>
                  <span className="text-blue-600">github:</span> {resume.personalInfo.github}
                </div>
              )}
              {resume.personalInfo.linkedin && (
                <div>
                  <span className="text-blue-600">linkedin:</span> {resume.personalInfo.linkedin}
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resume.skills.length > 0 && (
            <div className="border border-gray-300 p-4">
              <h2 className="text-lg font-bold mb-3 text-green-600">
                // Skills
              </h2>
              <div className="space-y-3">
                {Object.entries(resume.skills.reduce((acc, skill) => {
                  const category = skill.category || 'General';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill);
                  return acc;
                }, {} as Record<string, typeof resume.skills>)).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="text-purple-600 font-semibold text-sm mb-1">
                        {category.toLowerCase()}:
                      </h4>
                      <div className="space-y-1">
                        {skills.map((skill, index) => (
                          <div key={index} className="text-xs ml-2">
                            - {skill.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <div className="border border-gray-300 p-4">
              <h2 className="text-lg font-bold mb-3 text-green-600">
                // Education
              </h2>
              <div className="space-y-3">
                {resume.education.map((edu, index) => (
                  <div key={index} className="text-sm">
                    <div className="text-purple-600 font-semibold">{edu.degree}</div>
                    <div className="text-xs">{edu.institution}</div>
                    <div className="text-xs text-gray-600">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-6">
          {/* Summary */}
          {resume.personalInfo.summary && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-green-600">
                // About
              </h2>
              <div className="border-l-4 border-blue-500 pl-4 bg-gray-50 p-3">
                <p className="text-sm leading-relaxed">
                  {resume.personalInfo.summary}
                </p>
              </div>
            </div>
          )}

          {/* Experience */}
          {resume.workExperience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-green-600">
                // Experience
              </h2>
              <div className="space-y-4">
                {resume.workExperience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-purple-600">{exp.position}</h3>
                        <p className="text-blue-600 font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-xs text-gray-600 text-right">
                        <div>{exp.startDate} - {exp.endDate || "Present"}</div>
                        {exp.location && <div>{exp.location}</div>}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-sm text-gray-700">
                        <div className="font-semibold text-green-600 mb-1">$ cat responsibilities.txt</div>
                        {exp.description.map((line, lineIndex) => (
                          <div key={lineIndex} className="ml-2">• {line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resume.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 text-green-600">
                // Projects
              </h2>
              <div className="space-y-4">
                {resume.projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-purple-600">{project.name}</h3>
                      {project.url && (
                        <a 
                          href={project.url} 
                          className="text-blue-600 text-xs hover:underline"
                        >
                          [view code]
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-sm text-gray-700 mb-2">
                        {project.description}
                      </p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div>
                        <div className="text-green-600 text-xs mb-1">$ ls technologies/</div>
                        <div className="flex flex-wrap gap-1 ml-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-black text-green-400 px-2 py-1 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-500 border-t pt-4">
        <div className="font-mono">
          $ echo "Generated with Resume Builder" | figlet
        </div>
      </div>
    </div>
  );
}