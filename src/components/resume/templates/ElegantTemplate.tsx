import { Resume } from "@/types/resume";

interface ElegantTemplateProps {
  resume: Resume;
}

export function ElegantTemplate({ resume }: ElegantTemplateProps) {
  return (
    <div className="max-w-[8.5in] mx-auto bg-white p-8 shadow-lg" style={{ minHeight: '11in' }}>
      {/* Header Section */}
      <div className="text-center border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-wide">
          {resume.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="text-lg text-gray-600 font-light mb-4">
          {resume.workExperience?.length > 0 && resume.workExperience[0].position}
        </div>
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          {resume.personalInfo.email && (
            <span>{resume.personalInfo.email}</span>
          )}
          {resume.personalInfo.phone && (
            <span>{resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo.location && (
            <span>{resume.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-800 mb-4 tracking-wide border-l-3 border-gray-400 pl-4">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify italic">
            {resume.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resume.workExperience?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-800 mb-4 tracking-wide border-l-3 border-gray-400 pl-4">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {resume.workExperience?.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-1.5 top-0"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 italic">{exp.company}</p>
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

      <div className="grid grid-cols-2 gap-8">
        {/* Education */}
        {resume.education?.length > 0 && (
          <div>
            <h2 className="text-lg font-light text-gray-800 mb-4 tracking-wide border-l-3 border-gray-400 pl-4">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {resume.education?.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700 italic">{edu.institution}</p>
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

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <div>
            <h2 className="text-lg font-light text-gray-800 mb-4 tracking-wide border-l-3 border-gray-400 pl-4">
              CORE COMPETENCIES
            </h2>
            <div className="space-y-3">
              {Object.entries(resume.skills?.reduce((acc, skill) => {
                const category = skill.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(skill);
                return acc;
              }, {} as Record<string, typeof resume.skills>) || {}).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="font-medium text-gray-900 mb-1 capitalize">{category}</h4>
                    <div className="text-sm text-gray-700">
                      {skills.map((skill, index) => skill.name).join(' • ')}
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
          <h2 className="text-lg font-light text-gray-800 mb-4 tracking-wide border-l-3 border-gray-400 pl-4">
            NOTABLE PROJECTS
          </h2>
          <div className="space-y-4">
            {resume.projects?.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  {project.url && (
                    <a href={project.url} className="text-gray-600 text-sm hover:underline italic">
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
                  <div className="text-xs text-gray-600">
                    <strong>Technologies:</strong> {project.technologies.join(' • ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}