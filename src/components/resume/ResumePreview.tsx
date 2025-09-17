import { Resume } from "@/types/resume";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { TechnicalTemplate } from "./templates/TechnicalTemplate";
import { ElegantTemplate } from "./templates/ElegantTemplate";
import { BoldTemplate } from "./templates/BoldTemplate";
import { SimpleTemplate } from "./templates/SimpleTemplate";
import { ContemporaryTemplate } from "./templates/ContemporaryTemplate";

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
      case 'professional':
        return <ProfessionalTemplate resume={resume} />;
      case 'executive':
        return <ExecutiveTemplate resume={resume} />;
      case 'technical':
        return <TechnicalTemplate resume={resume} />;
      case 'elegant':
        return <ElegantTemplate resume={resume} />;
      case 'bold':
        return <BoldTemplate resume={resume} />;
      case 'simple':
        return <SimpleTemplate resume={resume} />;
      case 'contemporary':
        return <ContemporaryTemplate resume={resume} />;
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