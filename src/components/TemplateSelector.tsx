import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Resume } from "@/types/resume";
import { Palette, Check } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: Resume['template'];
  onSelectTemplate: (template: Resume['template']) => void;
}

const templates = [
  {
    id: 'modern' as const,
    name: 'Modern',
    description: 'Clean design with gradient header and professional layout',
    preview: '🎨',
    category: 'professional',
  },
  {
    id: 'classic' as const,
    name: 'Classic',
    description: 'Traditional format with centered header and serif fonts',
    preview: '📄',
    category: 'professional',
  },
  {
    id: 'creative' as const,
    name: 'Creative',
    description: 'Two-column layout with purple gradient sidebar',
    preview: '✨',
    category: 'creative',
  },
  {
    id: 'minimal' as const,
    name: 'Minimal',
    description: 'Ultra-clean design with centered text and minimal styling',
    preview: '⚪',
    category: 'minimal',
  },
  {
    id: 'professional' as const,
    name: 'Professional',
    description: 'Corporate-style with blue accents and structured layout',
    preview: '💼',
    category: 'professional',
  },
  {
    id: 'executive' as const,
    name: 'Executive',
    description: 'Sophisticated design for senior-level positions',
    preview: '🏆',
    category: 'professional',
  },
  {
    id: 'technical' as const,
    name: 'Technical',
    description: 'Developer-focused with code-style formatting',
    preview: '💻',
    category: 'technical',
  },
];

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <Card className="gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Resume Templates
        </CardTitle>
        <CardDescription>
          Choose a template that best fits your style and industry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedTemplate === template.id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{template.preview}</div>
                  {selectedTemplate === template.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full capitalize">
                    {template.category}
                  </span>
                  <Button
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    size="sm"
                    className={selectedTemplate === template.id ? "gradient-primary text-white" : ""}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}