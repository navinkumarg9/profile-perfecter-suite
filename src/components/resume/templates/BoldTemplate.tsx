import { Resume } from "@/types/resume";

interface BoldTemplateProps {
  resume: Resume;
}

export function BoldTemplate({ resume }: BoldTemplateProps) {
  return (
    <div className="max-w-[8.5in] mx-auto bg-white" style={{ minHeight: '11in' }}>
      {/* Header Section with Red Background */}
      <div className="bg-red-600 text-white p-8 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-30 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-2">
            {resume.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-xl font-light mb-4">
            {resume.workExperience?.length > 0 && resume.workExperience[0].position}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              {resume.personalInfo.email && (
                <div>✉ {resume.personalInfo.email}</div>
              )}
              {resume.personalInfo.phone && (
                <div>📞 {resume.personalInfo.phone}</div>
              )}
            </div>
            <div className="space-y-1">
              {resume.personalInfo.location && (
                <div>📍 {resume.personalInfo.location}</div>
              )}
              {resume.personalInfo.linkedin && (
                <div>💼 {resume.personalInfo.linkedin}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {resume.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-3 border-red-600 pb-2">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {resume.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Professional Experience */}
        {resume.workExperience?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-3 border-red-600 pb-2">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {resume.workExperience?.map((exp, index) => (
                <div key={index} className="border-l-4 border-red-300 pl-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-lg text-red-600 font-semibold">{exp.company}</p>
                      {exp.location && (
                        <p className="text-gray-600">{exp.location}</p>
                      )}
                    </div>
                    <div className="bg-red-600 text-white px-3 py-1 rounded font-bold text-sm">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed">
                      {exp.description.map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2 font-medium">▸ {line}</p>
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
          {resume.education?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-red-600 mb-4 border-b-2 border-red-300 pb-2">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {resume.education?.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-red-600 font-semibold">{edu.institution}</p>
                    <p className="text-gray-600 text-sm font-medium">
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

          {/* Skills */}
          {resume.skills?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-red-600 mb-4 border-b-2 border-red-300 pb-2">
                CORE SKILLS
              </h2>
              <div className="space-y-3">
                {Object.entries(resume.skills?.reduce((acc, skill) => {
                  const category = skill.category || 'Other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill);
                  return acc;
                }, {} as Record<string, typeof resume.skills>) || {}).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="font-bold text-gray-900 mb-2 uppercase text-sm">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold"
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

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-3 border-red-600 pb-2">
              KEY PROJECTS
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {resume.projects?.map((project, index) => (
                <div key={index} className="border-l-4 border-red-600 pl-4">
                  <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
                  {project.description && (
                    <p className="text-gray-700 mt-1 font-medium">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold"
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