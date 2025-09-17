import { Resume } from "@/types/resume";

interface SimpleTemplateProps {
  resume: Resume;
}

export function SimpleTemplate({ resume }: SimpleTemplateProps) {
  return (
    <div className="max-w-[8.5in] mx-auto bg-white p-8 shadow-lg" style={{ minHeight: '11in' }}>
      {/* Header Section */}
      <div className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {resume.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="space-y-1">
            {resume.personalInfo.email && (
              <div>{resume.personalInfo.email}</div>
            )}
            {resume.personalInfo.phone && (
              <div>{resume.personalInfo.phone}</div>
            )}
          </div>
          <div className="space-y-1">
            {resume.personalInfo.location && (
              <div>{resume.personalInfo.location}</div>
            )}
            {resume.personalInfo.linkedin && (
              <div>{resume.personalInfo.linkedin}</div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {resume.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resume.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resume.workExperience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {resume.workExperience?.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>{exp.startDate} - {exp.endDate || "Present"}</div>
                    {exp.location && <div>{exp.location}</div>}
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education?.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
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

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Skills
          </h2>
          <div className="space-y-2">
            {Object.entries(resume.skills?.reduce((acc, skill) => {
              const category = skill.category || 'Other';
              if (!acc[category]) acc[category] = [];
              acc[category].push(skill);
              return acc;
            }, {} as Record<string, typeof resume.skills>) || {}).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="font-medium text-gray-900 capitalize">{category}:</h4>
                  <p className="text-gray-700 text-sm">
                    {skills.map(skill => skill.name).join(', ')}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects?.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  {project.url && (
                    <a href={project.url} className="text-gray-600 text-sm hover:underline">
                      View
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-xs text-gray-600">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}