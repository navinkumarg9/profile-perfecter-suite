import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, AlertCircle, XCircle, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { Resume } from "@/types/resume";

interface ResumeScoreProps {
  resume: Resume;
}

interface ScoreItem {
  label: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'needs-improvement';
  suggestions: string[];
}

export function ResumeScore({ resume }: ResumeScoreProps) {
  const [isOpen, setIsOpen] = useState(false);
  const calculateScore = (): { totalScore: number; maxScore: number; items: ScoreItem[] } => {
    const items: ScoreItem[] = [];
    
    // Personal Information Score (20 points)
    let personalScore = 0;
    const personalSuggestions: string[] = [];
    
    if (resume.personalInfo.fullName) personalScore += 3;
    else personalSuggestions.push("Add your full name");
    
    if (resume.personalInfo.email) personalScore += 3;
    else personalSuggestions.push("Add your email address");
    
    if (resume.personalInfo.phone) personalScore += 2;
    else personalSuggestions.push("Add your phone number");
    
    if (resume.personalInfo.location) personalScore += 2;
    else personalSuggestions.push("Add your location");
    
    if (resume.personalInfo.summary && resume.personalInfo.summary.length >= 50) personalScore += 6;
    else personalSuggestions.push("Add a professional summary (50+ characters)");
    
    if (resume.personalInfo.linkedin) personalScore += 2;
    else personalSuggestions.push("Add LinkedIn profile");
    
    if (resume.personalInfo.github) personalScore += 2;
    else personalSuggestions.push("Add GitHub profile (if relevant)");
    
    items.push({
      label: "Personal Information",
      score: personalScore,
      maxScore: 20,
      status: personalScore >= 16 ? 'excellent' : personalScore >= 12 ? 'good' : 'needs-improvement',
      suggestions: personalSuggestions
    });
    
    // Work Experience Score (25 points)
    let experienceScore = 0;
    const experienceSuggestions: string[] = [];
    
    if (resume.workExperience.length > 0) {
      experienceScore += 10;
      
      // Check for detailed descriptions
      const hasDetailedDescriptions = resume.workExperience.some(exp => 
        exp.description && exp.description.length >= 100
      );
      if (hasDetailedDescriptions) experienceScore += 8;
      else experienceSuggestions.push("Add detailed job descriptions (100+ characters)");
      
      // Check for multiple experiences
      if (resume.workExperience.length >= 2) experienceScore += 4;
      else experienceSuggestions.push("Add more work experiences if available");
      
      // Check for achievements/metrics
      const hasMetrics = resume.workExperience.some(exp => 
        exp.description && (
          exp.description.join(' ').includes('%') || 
          exp.description.join(' ').includes('$') || 
          /\d+/.test(exp.description.join(' '))
        )
      );
      if (hasMetrics) experienceScore += 3;
      else experienceSuggestions.push("Include quantifiable achievements (numbers, percentages)");
      
    } else {
      experienceSuggestions.push("Add work experience entries");
    }
    
    items.push({
      label: "Work Experience",
      score: experienceScore,
      maxScore: 25,
      status: experienceScore >= 20 ? 'excellent' : experienceScore >= 15 ? 'good' : 'needs-improvement',
      suggestions: experienceSuggestions
    });
    
    // Education Score (15 points)
    let educationScore = 0;
    const educationSuggestions: string[] = [];
    
    if (resume.education.length > 0) {
      educationScore += 8;
      
      const hasCompletedEducation = resume.education.some(edu => edu.degree && edu.institution);
      if (hasCompletedEducation) educationScore += 7;
      else educationSuggestions.push("Complete education details (degree and school)");
      
    } else {
      educationSuggestions.push("Add education information");
    }
    
    items.push({
      label: "Education",
      score: educationScore,
      maxScore: 15,
      status: educationScore >= 12 ? 'excellent' : educationScore >= 8 ? 'good' : 'needs-improvement',
      suggestions: educationSuggestions
    });
    
    // Skills Score (20 points)
    let skillsScore = 0;
    const skillsSuggestions: string[] = [];
    
    if (resume.skills.length >= 5) skillsScore += 15;
    else if (resume.skills.length >= 3) skillsScore += 10;
    else if (resume.skills.length >= 1) skillsScore += 5;
    else skillsSuggestions.push("Add relevant skills");
    
    const hasVariedSkills = resume.skills.some(skill => skill.category !== resume.skills[0]?.category);
    if (hasVariedSkills) skillsScore += 5;
    else skillsSuggestions.push("Add skills from different categories");
    
    if (skillsScore < 15) {
      skillsSuggestions.push("Add more skills (aim for 5+ skills)");
    }
    
    items.push({
      label: "Skills",
      score: skillsScore,
      maxScore: 20,
      status: skillsScore >= 16 ? 'excellent' : skillsScore >= 12 ? 'good' : 'needs-improvement',
      suggestions: skillsSuggestions
    });
    
    // Projects Score (20 points)
    let projectsScore = 0;
    const projectsSuggestions: string[] = [];
    
    if (resume.projects.length > 0) {
      projectsScore += 10;
      
      const hasDetailedProjects = resume.projects.some(project => 
        project.description && project.description.length >= 50
      );
      if (hasDetailedProjects) projectsScore += 5;
      else projectsSuggestions.push("Add detailed project descriptions");
      
      const hasProjectLinks = resume.projects.some(project => project.url);
      if (hasProjectLinks) projectsScore += 3;
      else projectsSuggestions.push("Add project URLs or GitHub links");
      
      if (resume.projects.length >= 2) projectsScore += 2;
      else projectsSuggestions.push("Add more projects to showcase your skills");
      
    } else {
      projectsSuggestions.push("Add relevant projects");
    }
    
    items.push({
      label: "Projects",
      score: projectsScore,
      maxScore: 20,
      status: projectsScore >= 16 ? 'excellent' : projectsScore >= 12 ? 'good' : 'needs-improvement',
      suggestions: projectsSuggestions
    });
    
    const totalScore = items.reduce((sum, item) => sum + item.score, 0);
    const maxScore = items.reduce((sum, item) => sum + item.maxScore, 0);
    
    return { totalScore, maxScore, items };
  };
  
  const { totalScore, maxScore, items } = calculateScore();
  const percentage = Math.round((totalScore / maxScore) * 100);
  
  const getOverallStatus = () => {
    if (percentage >= 80) return { status: 'excellent', label: 'Excellent', color: 'text-green-600' };
    if (percentage >= 60) return { status: 'good', label: 'Good', color: 'text-yellow-600' };
    return { status: 'needs-improvement', label: 'Needs Improvement', color: 'text-red-600' };
  };
  
  const overallStatus = getOverallStatus();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'good': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="shadow-card">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Resume Analysis
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold text-primary">{percentage}%</div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </CardTitle>
            <p className="text-sm text-muted-foreground text-left">
              Your resume is approximately {percentage}% complete with {items.reduce((acc, item) => acc + item.suggestions.length, 0)} suggestions
            </p>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="text-center space-y-3">
              <div className="text-4xl font-bold text-primary">{percentage}%</div>
              <Badge variant={overallStatus.status === 'excellent' ? 'default' : 'secondary'} className="text-sm">
                {overallStatus.label}
              </Badge>
              <Progress value={percentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {totalScore} out of {maxScore} points
              </p>
            </div>
            
            {/* Detailed Breakdown */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Detailed Breakdown</h4>
              {items.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.score}/{item.maxScore}
                    </span>
                  </div>
                  <Progress value={(item.score / item.maxScore) * 100} className="h-2" />
                  {item.suggestions.length > 0 && (
                    <div className="ml-6 space-y-1">
                      {item.suggestions.map((suggestion, suggestionIndex) => (
                        <p key={suggestionIndex} className="text-xs text-muted-foreground">
                          • {suggestion}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}