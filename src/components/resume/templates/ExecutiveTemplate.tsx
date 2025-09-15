import { Resume } from "@/types/resume";

interface ExecutiveTemplateProps {
  resume: Resume;
}

export function ExecutiveTemplate({ resume }: ExecutiveTemplateProps) {
  return (
    <div className="max-w-[8.5in] mx-auto bg-white" style={{ minHeight: '11in' }}>
      {/* Header Section with Dark Background */}
      <div className="bg-gray-900 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            {resume.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-lg text-gray-300 mb-4">
            {resume.workExperience.length > 0 && resume.workExperience[0].position}
          </div>
          <div className="flex justify-center space-x-6 text-sm">
            {resume.personalInfo.email && (
              <span>✉ {resume.personalInfo.email}</span>
            )}
            {resume.personalInfo.phone && (
              <span>📞 {resume.personalInfo.phone}</span>
            )}
            {resume.personalInfo.location && (
              <span>📍 {resume.personalInfo.location}</span>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Executive Summary */}
        {resume.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">
              EXECUTIVE SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {resume.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Professional Experience */}
        {resume.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {resume.workExperience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-lg text-gray-700 font-semibold">{exp.company}</p>
                      {exp.location && (
                        <p className="text-gray-600">{exp.location}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="bg-gray-900 text-white px-3 py-1 rounded text-sm">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed">
                      {exp.description.map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2">• {line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {resume.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {resume.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 font-semibold">{edu.institution}</p>
                    <p className="text-gray-600 text-sm">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                    {edu.field && (
                      <p className="text-sm text-gray-600 mt-1">{edu.field}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Competencies */}
          {resume.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                CORE COMPETENCIES
              </h2>
              <div className="space-y-3">
                {Object.entries(resume.skills.reduce((acc, skill) => {
                  const category = skill.category || 'Leadership';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill);
                  return acc;
                }, {} as Record<string, typeof resume.skills>)).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-gray-900 mb-1">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Key Achievements/Projects */}
        {resume.projects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">
              KEY ACHIEVEMENTS
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {resume.projects.map((project, index) => (
                <div key={index} className="border-l-4 border-gray-900 pl-4">
                  <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-700 mt-1">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
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