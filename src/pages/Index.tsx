import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { WorkExperienceForm } from "@/components/forms/WorkExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { CertificationsForm } from "@/components/forms/CertificationsForm";
import { LanguagesForm } from "@/components/forms/LanguagesForm";
import { InterestsForm } from "@/components/forms/InterestsForm";
import { CustomSectionsForm } from "@/components/forms/CustomSectionsForm";
import { TemplateSelector } from "@/components/TemplateSelector";
import { TemplateSelectionModal } from "@/components/TemplateSelectionModal";

import { ResumePreview } from "@/components/resume/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";
import { Chatbot } from "@/components/Chatbot";
import { ResumeScore } from "@/components/ResumeScore";
import { FileText, Eye, Sparkles, Download, ZoomIn, ZoomOut, Printer, Maximize2, Palette } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const [zoom, setZoom] = useState(0.75);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const {
    resume,
    isLoading,
    updatePersonalInfo,
    updateWorkExperience,
    updateEducation,
    updateSkills,
    updateProjects,
    updateCertifications,
    updateLanguages,
    updateInterests,
    updateCustomSections,
    updateTemplate,
    resetResume,
  } = useResumeData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary-glow/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your resume...</p>
        </div>
      </div>
    );
  }

  const handlePersonalInfoSubmit = (data: any) => {
    updatePersonalInfo(data);
  };

  const handleWorkExperienceSubmit = (data: any) => {
    updateWorkExperience(data);
  };

  const handleEducationSubmit = (data: any) => {
    updateEducation(data);
  };

  const handleSkillsSubmit = (data: any) => {
    updateSkills(data);
  };

  const handleProjectsSubmit = (data: any) => {
    updateProjects(data);
  };

  const handleCertificationsSubmit = (data: any) => {
    updateCertifications(data);
  };

  const handleLanguagesSubmit = (data: any) => {
    updateLanguages(data);
  };

  const handleInterestsSubmit = (data: any) => {
    updateInterests(data);
  };

  const handleCustomSectionsSubmit = (data: any) => {
    updateCustomSections(data);
  };

  const handleTemplateSelect = (template: string) => {
    updateTemplate(template as any);
  };

  const completionPercentage = (() => {
    let completed = 0;
    const total = 8;
    
    if (resume.personalInfo?.fullName && resume.personalInfo?.email) completed++;
    if (resume.workExperience?.length > 0) completed++;
    if (resume.education?.length > 0) completed++;
    if (resume.skills?.length > 0) completed++;
    if (resume.projects?.length > 0) completed++;
    if (resume.certifications?.length > 0) completed++;
    if (resume.languages?.length > 0) completed++;
    if (resume.interests?.length > 0) completed++;
    if (resume.customSections?.length > 0) completed++;
    
    return Math.round((completed / total) * 100);
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary-glow/10">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  Resume Builder
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create your professional resume in minutes
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-sm font-medium text-primary">{completionPercentage}% Complete</div>
                <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-primary transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Save
                </button>
                <TemplateSelectionModal
                  selectedTemplate={resume.template}
                  onSelectTemplate={handleTemplateSelect}
                  trigger={
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-secondary transition-colors">
                      <Palette className="h-4 w-4" />
                      Change Template
                    </button>
                  }
                />
                <button
                  onClick={async () => {
                    if (!resumeRef.current) return;
                    
                    const html2canvas = (await import("html2canvas")).default;
                    const jsPDF = (await import("jspdf")).default;
                    
                    try {
                      const canvas = await html2canvas(resumeRef.current, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: '#ffffff',
                      });

                      const imgData = canvas.toDataURL('image/png');
                      const imgWidth = 210;
                      const pageHeight = 297;
                      const imgHeight = (canvas.height * imgWidth) / canvas.width;
                      
                      const pdf = new jsPDF('p', 'mm', 'a4');
                      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                      
                      const fileName = resume.personalInfo.fullName ? 
                        resume.personalInfo.fullName.replace(/\s+/g, '_').toLowerCase() + '_resume' : 
                        'resume';
                      pdf.save(`${fileName}.pdf`);
                      
                      toast({
                        title: "PDF Downloaded",
                        description: "Your resume has been downloaded successfully.",
                      });
                    } catch (error) {
                      toast({
                        title: "Export Failed",
                        description: "There was an error downloading your resume.",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Content - Split Layout matching reference image */}
        <div className="max-w-full mx-auto h-[calc(100vh-140px)]">
          <div className="grid grid-cols-2 gap-6 h-full">
            {/* Left Side - Forms */}
            <div className="bg-white rounded-lg border overflow-auto">
              {/* Resume Analysis */}
              <div className="p-4 bg-yellow-50 border-b border-yellow-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-yellow-800 mb-1">Resume Analysis</h3>
                    <p className="text-sm text-yellow-700">Your resume is approximately 45% complete with 2 suggestions</p>
                  </div>
                  <button className="text-yellow-600 hover:text-yellow-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-gray-100">
                    <TabsTrigger value="personal" className="data-[state=active]:bg-white text-sm px-3 py-2">
                      Personal
                    </TabsTrigger>
                    <TabsTrigger value="education" className="data-[state=active]:bg-white text-sm px-3 py-2">
                      Education
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="data-[state=active]:bg-white text-sm px-3 py-2">
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="data-[state=active]:bg-white text-sm px-3 py-2">
                      Projects
                    </TabsTrigger>
                    <TabsTrigger value="more" className="data-[state=active]:bg-white text-sm px-3 py-2">
                      More
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal">
                    <PersonalInfoForm
                      initialData={resume.personalInfo}
                      onSubmit={handlePersonalInfoSubmit}
                    />
                  </TabsContent>

                  <TabsContent value="education">
                    <EducationForm
                      initialData={resume.education}
                      onSubmit={handleEducationSubmit}
                    />
                  </TabsContent>

                  <TabsContent value="experience">
                    <WorkExperienceForm
                      initialData={resume.workExperience}
                      onSubmit={handleWorkExperienceSubmit}
                    />
                  </TabsContent>

                  <TabsContent value="projects">
                    <ProjectsForm
                      initialData={resume.projects}
                      onSubmit={handleProjectsSubmit}
                    />
                  </TabsContent>

                  <TabsContent value="more">
                    <div className="space-y-6">
                      <SkillsForm
                        initialData={resume.skills}
                        onSubmit={handleSkillsSubmit}
                      />
                      <CertificationsForm
                        initialData={resume.certifications}
                        onSubmit={handleCertificationsSubmit}
                      />
                      <LanguagesForm
                        initialData={resume.languages}
                        onSubmit={handleLanguagesSubmit}
                      />
                      <InterestsForm
                        initialData={resume.interests}
                        onSubmit={handleInterestsSubmit}
                      />
                      <CustomSectionsForm
                        initialData={resume.customSections}
                        onSubmit={handleCustomSectionsSubmit}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Side - Resume Preview */}
            <div className="bg-white rounded-lg border flex flex-col">
              {/* Preview Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold">Resume Preview</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    Full Preview
                  </button>
                  <TemplateSelectionModal
                    selectedTemplate={resume.template}
                    onSelectTemplate={handleTemplateSelect}
                    trigger={
                      <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Palette className="h-4 w-4" />
                        Change Template
                      </button>
                    }
                  />
                  <button
                    onClick={async () => {
                      if (!resumeRef.current) return;
                      
                      try {
                        const html2canvas = (await import("html2canvas")).default;
                        const jsPDF = (await import("jspdf")).default;
                        
                        const canvas = await html2canvas(resumeRef.current, {
                          scale: 2,
                          useCORS: true,
                          allowTaint: true,
                          backgroundColor: '#ffffff',
                          logging: false,
                        });
                        
                        const pdf = new jsPDF({
                          orientation: 'portrait',
                          unit: 'px',
                          format: [595, 842]
                        });
                        
                        const imgData = canvas.toDataURL('image/jpeg', 1.0);
                        pdf.addImage(imgData, 'JPEG', 0, 0, 595, 842);
                        pdf.save(`${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
                        
                        toast({
                          title: "Success!",
                          description: "Resume downloaded successfully.",
                        });
                      } catch (error) {
                        console.error('Error generating PDF:', error);
                        toast({
                          title: "Error",
                          description: "Failed to generate PDF. Please try again.",
                          variant: "destructive",
                        });
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 p-4 overflow-auto bg-gray-50">
                <div 
                  className="mx-auto bg-white shadow-lg"
                  style={{ 
                    width: '100%',
                    maxWidth: '794px',
                    transform: 'scale(0.75)',
                    transformOrigin: 'top center'
                  }}
                >
                  <div 
                    ref={resumeRef} 
                    data-resume-content
                    className="w-full"
                    style={{ width: '794px', minHeight: '1123px' }}
                  >
                    <ResumePreview resume={resume} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chatbot */}
      <Chatbot resume={resume} activeSection={activeTab} />
    </div>
  );
};

export default Index;