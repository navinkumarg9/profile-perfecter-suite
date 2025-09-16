import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { WorkExperienceForm } from "@/components/forms/WorkExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { TemplateSelector } from "@/components/TemplateSelector";
import { PDFExport } from "@/components/PDFExport";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";
import { toast } from "@/hooks/use-toast";
import { Chatbot } from "@/components/Chatbot";
import { ResumeScore } from "@/components/ResumeScore";
import { FileText, Eye, Edit, Sparkles } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const {
    resume,
    isLoading,
    updatePersonalInfo,
    updateWorkExperience,
    updateEducation,
    updateSkills,
    updateProjects,
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
    toast({
      title: "Personal Information Updated",
      description: "Your personal information has been saved successfully.",
    });
    setActiveTab("experience");
  };

  const handleWorkExperienceSubmit = (data: any) => {
    updateWorkExperience(data);
    toast({
      title: "Work Experience Updated",
      description: "Your work experience has been saved successfully.",
    });
    setActiveTab("education");
  };

  const handleEducationSubmit = (data: any) => {
    updateEducation(data);
    toast({
      title: "Education Updated",
      description: "Your education information has been saved successfully.",
    });
    setActiveTab("skills");
  };

  const handleSkillsSubmit = (data: any) => {
    updateSkills(data);
    toast({
      title: "Skills Updated",
      description: "Your skills have been saved successfully.",
    });
    setActiveTab("projects");
  };

  const handleProjectsSubmit = (data: any) => {
    updateProjects(data);
    toast({
      title: "Projects Updated",
      description: "Your projects have been saved successfully.",
    });
    setActiveTab("template");
  };

  const handleTemplateSelect = (template: any) => {
    updateTemplate(template);
    toast({
      title: "Template Updated",
      description: `Switched to ${template} template successfully.`,
    });
  };

  const completionPercentage = (() => {
    let completed = 0;
    const total = 5;
    
    if (resume.personalInfo.fullName && resume.personalInfo.email) completed++;
    if (resume.workExperience.length > 0) completed++;
    if (resume.education.length > 0) completed++;
    if (resume.skills.length > 0) completed++;
    if (resume.projects.length > 0) completed++;
    
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
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  {showPreview ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showPreview ? 'Edit' : 'Preview'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showPreview ? (
          // Preview Mode
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <ResumeScore resume={resume} />
                <TemplateSelector
                  selectedTemplate={resume.template}
                  onSelectTemplate={handleTemplateSelect}
                />
                <PDFExport
                  resumeRef={resumeRef}
                  fileName={resume.personalInfo.fullName ? 
                    resume.personalInfo.fullName.replace(/\s+/g, '_').toLowerCase() + '_resume' : 
                    'resume'
                  }
                />
              </div>
              
              <div className="lg:col-span-3">
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Resume Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div ref={resumeRef} className="w-full overflow-auto">
                      <ResumePreview resume={resume} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode with Live Preview
          <div className="max-w-7xl mx-auto">
            <Card className="mb-8 gradient-card shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Build Your Professional Resume
                </CardTitle>
                <p className="text-muted-foreground">
                  Follow the steps below to create a stunning resume that stands out
                </p>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Side - Forms */}
              <div className="xl:col-span-2 space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5 h-12 bg-white shadow-card">
                    <TabsTrigger value="personal" className="data-[state=active]:gradient-primary data-[state=active]:text-white text-xs">
                      Personal
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="data-[state=active]:gradient-primary data-[state=active]:text-white text-xs">
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="education" className="data-[state=active]:gradient-primary data-[state=active]:text-white text-xs">
                      Education
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="data-[state=active]:gradient-primary data-[state=active]:text-white text-xs">
                      Skills
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="data-[state=active]:gradient-primary data-[state=active]:text-white text-xs">
                      Projects
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal">
                    <PersonalInfoForm
                      initialData={resume.personalInfo}
                      onSubmit={handlePersonalInfoSubmit}
                    />
                  </TabsContent>

                  <TabsContent value="experience">
                    <WorkExperienceForm
                      initialData={resume.workExperience}
                      onSubmit={handleWorkExperienceSubmit}
                    />
                  </TabsContent>

                  <TabsContent value="education">
                    <EducationForm
                      initialData={resume.education}
                      onSubmit={handleEducationSubmit}
                    />
                  </TabsContent>

                  <TabsContent value="skills">
                    <SkillsForm
                      initialData={resume.skills}
                      onSubmit={handleSkillsSubmit}
                    />
                  </TabsContent>

                  <TabsContent value="projects">
                    <ProjectsForm
                      initialData={resume.projects}
                      onSubmit={handleProjectsSubmit}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Side - Live Preview */}
              <div className="xl:col-span-1 space-y-6">
                <ResumeScore resume={resume} />
                <Card className="shadow-elegant sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Live Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div 
                      ref={resumeRef} 
                      className="w-full overflow-auto max-h-[600px]"
                      style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: '142.86%' }}
                    >
                      <ResumePreview resume={resume} />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <TemplateSelector
                    selectedTemplate={resume.template}
                    onSelectTemplate={handleTemplateSelect}
                  />
                  <PDFExport
                    resumeRef={resumeRef}
                    fileName={resume.personalInfo.fullName ? 
                      resume.personalInfo.fullName.replace(/\s+/g, '_').toLowerCase() + '_resume' : 
                      'resume'
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Chatbot */}
      <Chatbot resume={resume} activeSection={activeTab} />
    </div>
  );
};

export default Index;