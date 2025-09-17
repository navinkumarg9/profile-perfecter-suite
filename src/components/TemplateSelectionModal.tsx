import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Resume } from "@/types/resume";
import { Palette, Check } from "lucide-react";

interface TemplateSelectionModalProps {
  selectedTemplate: Resume['template'];
  onSelectTemplate: (template: Resume['template']) => void;
  trigger?: React.ReactNode;
}

const templates = [
  {
    id: 'modern' as const,
    name: 'Modern',
    description: 'Clean design with gradient header and professional layout',
    preview: (
      <div className="bg-white border rounded-lg p-3 h-40 relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded mb-2 flex items-center justify-center">
          <div className="w-16 h-1 bg-white/80 rounded"></div>
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-blue-200 rounded w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
          <div className="h-1 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="mt-3 space-y-1">
          <div className="h-1.5 bg-blue-400 rounded w-1/3"></div>
          <div className="h-1 bg-gray-200 rounded w-full"></div>
          <div className="h-1 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    ),
    category: 'professional',
  },
  {
    id: 'classic' as const,
    name: 'Classic',
    description: 'Traditional format with centered header and serif fonts',
    preview: (
      <div className="bg-white border rounded-lg p-3 h-40 relative overflow-hidden">
        <div className="text-center border-b border-gray-300 pb-2 mb-2">
          <div className="h-2 bg-gray-800 rounded w-1/2 mx-auto mb-1"></div>
          <div className="h-1 bg-gray-400 rounded w-1/3 mx-auto"></div>
        </div>
        <div className="space-y-2">
          <div className="h-1 bg-gray-600 rounded w-1/4"></div>
          <div className="space-y-1">
            <div className="h-1 bg-gray-400 rounded w-full"></div>
            <div className="h-1 bg-gray-400 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    ),
    category: 'professional',
  },
  {
    id: 'creative' as const,
    name: 'Creative',
    description: 'Two-column layout with purple gradient sidebar',
    preview: (
      <div className="bg-white border rounded-lg p-0 h-40 relative overflow-hidden flex">
        <div className="bg-gradient-to-b from-purple-500 to-purple-600 w-1/3 p-2">
          <div className="space-y-1">
            <div className="h-1 bg-white/80 rounded w-full"></div>
            <div className="h-1 bg-white/60 rounded w-3/4"></div>
            <div className="h-1 bg-white/40 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex-1 p-2">
          <div className="space-y-1">
            <div className="h-2 bg-gray-800 rounded w-2/3"></div>
            <div className="h-1 bg-gray-400 rounded w-full"></div>
            <div className="h-1 bg-gray-400 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    ),
    category: 'creative',
  },
  {
    id: 'minimal' as const,
    name: 'Minimal',
    description: 'Ultra-clean design with centered text and minimal styling',
    preview: (
      <div className="bg-white border rounded-lg p-3 h-40 relative overflow-hidden">
        <div className="text-center mb-4">
          <div className="h-2 bg-gray-600 rounded w-1/3 mx-auto mb-2"></div>
          <div className="h-1 bg-gray-400 rounded w-1/4 mx-auto"></div>
        </div>
        <div className="space-y-2">
          <div className="h-1 bg-gray-300 rounded w-1/5"></div>
          <div className="h-1 bg-gray-200 rounded w-full"></div>
          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    ),
    category: 'minimal',
  },
  {
    id: 'professional' as const,
    name: 'Professional',
    description: 'Corporate-style with blue accents and structured layout',
    preview: (
      <div className="bg-white border rounded-lg p-3 h-40 relative overflow-hidden">
        <div className="border-b-2 border-blue-600 pb-2 mb-2">
          <div className="h-2 bg-gray-800 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <div className="h-1 bg-gray-400 rounded w-full"></div>
            <div className="h-1 bg-gray-400 rounded w-3/4"></div>
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-gray-400 rounded w-full"></div>
            <div className="h-1 bg-gray-400 rounded w-2/3"></div>
          </div>
        </div>
        <div className="mt-2">
          <div className="h-1 bg-blue-600 rounded w-1/3 mb-1"></div>
          <div className="h-1 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    ),
    category: 'professional',
  },
  {
    id: 'executive' as const,
    name: 'Executive',
    description: 'Sophisticated design for senior-level positions',
    preview: (
      <div className="bg-white border rounded-lg p-0 h-40 relative overflow-hidden">
        <div className="bg-gray-900 text-white p-2 text-center">
          <div className="h-1.5 bg-white rounded w-1/2 mx-auto mb-1"></div>
          <div className="h-1 bg-gray-300 rounded w-1/3 mx-auto"></div>
        </div>
        <div className="p-2">
          <div className="border-b border-gray-400 mb-2 pb-1">
            <div className="h-1 bg-gray-800 rounded w-1/3"></div>
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-gray-400 rounded w-full"></div>
            <div className="h-1 bg-gray-400 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    ),
    category: 'professional',
  },
  {
    id: 'technical' as const,
    name: 'Technical',
    description: 'Developer-focused with code-style formatting',
    preview: (
      <div className="bg-gray-50 border rounded-lg p-3 h-40 relative overflow-hidden font-mono">
        <div className="bg-gray-800 text-green-400 p-1 rounded mb-2 text-xs">
          <div className="h-1 bg-green-400 rounded w-1/3"></div>
        </div>
        <div className="space-y-1">
          <div className="h-1 bg-gray-600 rounded w-1/4"></div>
          <div className="h-1 bg-gray-400 rounded w-full"></div>
          <div className="h-1 bg-gray-400 rounded w-2/3"></div>
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1 bg-blue-500 rounded w-1/5"></div>
          <div className="flex space-x-1">
            <div className="h-1 bg-red-400 rounded w-8"></div>
            <div className="h-1 bg-yellow-400 rounded w-8"></div>
            <div className="h-1 bg-green-400 rounded w-8"></div>
          </div>
        </div>
      </div>
    ),
    category: 'technical',
  },
  {
    id: 'elegant' as const,
    name: 'Elegant',
    description: 'Sophisticated layout with elegant typography',
    preview: (
      <div className="bg-white border rounded-lg p-3 h-40 relative overflow-hidden">
        <div className="text-center mb-3">
          <div className="h-2 bg-gray-700 rounded w-2/5 mx-auto mb-1"></div>
          <div className="h-1 bg-gray-500 rounded w-1/4 mx-auto"></div>
        </div>
        <div className="space-y-2">
          <div className="border-l-2 border-gray-400 pl-2">
            <div className="h-1 bg-gray-600 rounded w-1/3 mb-1"></div>
            <div className="h-1 bg-gray-400 rounded w-full"></div>
            <div className="h-1 bg-gray-400 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    ),
    category: 'professional',
  },
  {
    id: 'bold' as const,
    name: 'Bold',
    description: 'Strong design with red accents and bold typography',
    preview: (
      <div className="bg-white border rounded-lg p-3 h-40 relative overflow-hidden">
        <div className="bg-red-500 h-6 rounded mb-2 flex items-center px-2">
          <div className="h-1 bg-white rounded w-1/3"></div>
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-red-300 rounded w-1/2"></div>
          <div className="h-1 bg-gray-300 rounded w-full"></div>
          <div className="h-1 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mt-2">
          <div className="h-1 bg-red-500 rounded w-1/4 mb-1"></div>
          <div className="h-1 bg-gray-400 rounded w-2/3"></div>
        </div>
      </div>
    ),
    category: 'creative',
  },
  {
    id: 'simple' as const,
    name: 'Simple',
    description: 'Clean and straightforward design for any profession',
    preview: (
      <div className="bg-white border rounded-lg p-3 h-40 relative overflow-hidden">
        <div className="border-b border-gray-300 pb-2 mb-2">
          <div className="h-2 bg-gray-700 rounded w-1/3"></div>
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="h-1 bg-gray-500 rounded w-1/4"></div>
            <div className="h-1 bg-gray-300 rounded w-full"></div>
            <div className="h-1 bg-gray-300 rounded w-4/5"></div>
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-gray-500 rounded w-1/5"></div>
            <div className="h-1 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    ),
    category: 'minimal',
  },
  {
    id: 'contemporary' as const,
    name: 'Contemporary',
    description: 'Modern design with teal accents and clean sections',
    preview: (
      <div className="bg-white border rounded-lg p-0 h-40 relative overflow-hidden flex">
        <div className="bg-gradient-to-b from-teal-500 to-teal-600 w-1/4 p-2">
          <div className="space-y-1">
            <div className="h-1 bg-white/90 rounded w-full"></div>
            <div className="h-1 bg-white/70 rounded w-3/4"></div>
            <div className="h-1 bg-white/50 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex-1 p-2">
          <div className="space-y-1">
            <div className="h-2 bg-gray-800 rounded w-2/3"></div>
            <div className="h-1 bg-teal-400 rounded w-1/3"></div>
            <div className="h-1 bg-gray-300 rounded w-full"></div>
            <div className="h-1 bg-gray-300 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    ),
    category: 'modern',
  },
];

export function TemplateSelectionModal({ selectedTemplate, onSelectTemplate, trigger }: TemplateSelectionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTemplateSelect = (templateId: Resume['template']) => {
    onSelectTemplate(templateId);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button variant="outline" className="flex items-center gap-2">
      <Palette className="h-4 w-4" />
      Change Template
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Choose Resume Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                selectedTemplate === template.id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent className="p-3">
                <div className="relative mb-3">
                  {template.preview}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-1 right-1 bg-primary rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">{template.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {template.category}
                    </Badge>
                    <Button
                      size="sm"
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                      className={`text-xs h-6 px-2 ${selectedTemplate === template.id ? "bg-primary text-white" : ""}`}
                    >
                      {selectedTemplate === template.id ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}