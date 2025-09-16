import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CustomSection } from "@/types/resume";
import { Plus, Trash2, FileText } from "lucide-react";

const customSectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  content: z.string().min(1, "Section content is required"),
});

type CustomSectionFormData = z.infer<typeof customSectionSchema>;

interface CustomSectionsFormProps {
  initialData: CustomSection[];
  onSubmit: (data: CustomSection[]) => void;
}

export function CustomSectionsForm({ initialData, onSubmit }: CustomSectionsFormProps) {
  const [customSections, setCustomSections] = useState<CustomSection[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<CustomSectionFormData>({
    resolver: zodResolver(customSectionSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleSubmit = (data: CustomSectionFormData) => {
    const newCustomSection: CustomSection = {
      id: editingIndex !== null ? customSections[editingIndex].id : Date.now().toString(),
      ...data,
    };

    let updatedCustomSections: CustomSection[];
    if (editingIndex !== null) {
      updatedCustomSections = customSections.map((section, index) =>
        index === editingIndex ? newCustomSection : section
      );
      setEditingIndex(null);
    } else {
      updatedCustomSections = [...customSections, newCustomSection];
    }

    setCustomSections(updatedCustomSections);
    onSubmit(updatedCustomSections);
    form.reset();
  };

  const handleEdit = (index: number) => {
    const section = customSections[index];
    setEditingIndex(index);
    form.reset({
      title: section.title,
      content: section.content,
    });
  };

  const handleDelete = (index: number) => {
    const updatedCustomSections = customSections.filter((_, i) => i !== index);
    setCustomSections(updatedCustomSections);
    onSubmit(updatedCustomSections);
    if (editingIndex === index) {
      setEditingIndex(null);
      form.reset();
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Custom Sections
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Awards, Publications, Volunteer Work..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your achievements, publications, volunteer work, or any other relevant information..."
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              {editingIndex !== null ? "Update Section" : "Add Section"}
            </Button>
          </form>
        </Form>

        {customSections.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Added Sections</h3>
            {customSections.map((section, index) => (
              <div
                key={section.id}
                className="p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-2">{section.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {section.content}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}