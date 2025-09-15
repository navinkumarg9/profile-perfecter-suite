import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { Resume } from "@/types/resume";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  resume: Resume;
  activeSection?: string;
}

export function Chatbot({ resume, activeSection }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm here to help you improve your resume. I can suggest improvements, help with content, and provide tips based on your current information.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const generateSuggestion = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Context-aware suggestions based on current section and resume data
    if (lowerMessage.includes('summary') || activeSection === 'personal') {
      if (!resume.personalInfo.summary || resume.personalInfo.summary.length < 50) {
        return "Your summary should be 2-3 sentences highlighting your key strengths and career goals. Try: 'Experienced [your role] with [X years] of expertise in [key skills]. Proven track record of [achievement]. Seeking to leverage [skills] to drive [impact] at [target company type].'";
      }
      return "Great summary! Consider making it more specific by adding quantifiable achievements or industry-specific keywords that match your target job description.";
    }
    
    if (lowerMessage.includes('experience') || activeSection === 'experience') {
      if (resume.workExperience.length === 0) {
        return "Add your work experience using the STAR method: Situation, Task, Action, Result. Focus on achievements rather than just job duties. Use action verbs and quantify your impact with numbers, percentages, or dollar amounts.";
      }
      return "For stronger work experience entries, use metrics like 'Increased sales by 25%' or 'Managed team of 8 people'. Start each bullet point with powerful action verbs like 'Led', 'Implemented', 'Optimized', or 'Achieved'.";
    }
    
    if (lowerMessage.includes('skills') || activeSection === 'skills') {
      return "Balance technical and soft skills. Include tools, programming languages, certifications, and methodologies relevant to your target role. Consider grouping skills by category (Technical, Leadership, Languages, etc.).";
    }
    
    if (lowerMessage.includes('education') || activeSection === 'education') {
      return "Include your degree, institution, graduation year, and GPA if it's 3.5 or higher. Add relevant coursework, honors, or academic projects if you're a recent graduate.";
    }
    
    if (lowerMessage.includes('projects') || activeSection === 'projects') {
      return "Showcase 2-3 relevant projects that demonstrate your skills. Include the technology used, your role, and the impact or results. Link to GitHub or live demos if possible.";
    }
    
    if (lowerMessage.includes('keywords') || lowerMessage.includes('ats')) {
      return "Use keywords from the job description throughout your resume. Many companies use ATS (Applicant Tracking Systems) to scan resumes. Mirror the language used in job postings you're targeting.";
    }
    
    if (lowerMessage.includes('length') || lowerMessage.includes('pages')) {
      return "Keep your resume to 1-2 pages. One page for entry-level positions, two pages for experienced professionals. Every line should add value and be relevant to your target role.";
    }
    
    // General suggestions based on resume completeness
    const missingElements = [];
    if (!resume.personalInfo.fullName) missingElements.push("name");
    if (!resume.personalInfo.email) missingElements.push("email");
    if (!resume.personalInfo.summary) missingElements.push("professional summary");
    if (resume.workExperience.length === 0) missingElements.push("work experience");
    if (resume.skills.length === 0) missingElements.push("skills");
    
    if (missingElements.length > 0) {
      return `I notice you're missing: ${missingElements.join(', ')}. These are essential elements for a strong resume. Would you like specific tips for any of these sections?`;
    }
    
    return "Your resume is looking good! Consider tailoring it for each job application by adjusting keywords and emphasizing the most relevant experiences. Would you like me to review any specific section?";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: generateSuggestion(input.trim()),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage, botResponse]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-elegant bg-gradient-primary hover:shadow-glow transition-all duration-300 z-50"
        size="lg"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-elegant z-50 flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3 gradient-card">
        <CardTitle className="flex items-center gap-2 text-white">
          <Bot className="h-5 w-5" />
          Resume Assistant
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          ×
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="bg-primary p-2 rounded-full h-8 w-8 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-white ml-auto'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.type === 'user' && (
                  <div className="bg-secondary p-2 rounded-full h-8 w-8 flex items-center justify-center">
                    <User className="h-4 w-4 text-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for resume tips..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="sm" className="px-3">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}