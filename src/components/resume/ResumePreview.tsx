import { Resume } from "@/types/resume";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";

interface ResumePreviewProps {
  resume: Resume;
  className?: string;
}

export function ResumePreview({ resume, className }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (resume.template) {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'classic':
        return <ClassicTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-card overflow-hidden ${className}`}>
      <div className="w-full h-full overflow-auto">
        {renderTemplate()}
      </div>
    </div>
  );
}