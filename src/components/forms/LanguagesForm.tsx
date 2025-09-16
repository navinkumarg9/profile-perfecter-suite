import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Language } from "@/types/resume";
import { Plus, Trash2, Globe } from "lucide-react";

const languageSchema = z.object({
  name: z.string().min(1, "Language name is required"),
  level: z.enum(["basic", "intermediate", "advanced", "fluent", "native"]),
});

type LanguageFormData = z.infer<typeof languageSchema>;

interface LanguagesFormProps {
  initialData: Language[];
  onSubmit: (data: Language[]) => void;
}

const levelLabels = {
  basic: "Basic",
  intermediate: "Intermediate", 
  advanced: "Advanced",
  fluent: "Fluent",
  native: "Native"
};

export function LanguagesForm({ initialData, onSubmit }: LanguagesFormProps) {
  const [languages, setLanguages] = useState<Language[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<LanguageFormData>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      name: "",
      level: "intermediate",
    },
  });

  const handleSubmit = (data: LanguageFormData) => {
    const newLanguage: Language = {
      id: editingIndex !== null ? languages[editingIndex].id : Date.now().toString(),
      ...data,
    };

    let updatedLanguages: Language[];
    if (editingIndex !== null) {
      updatedLanguages = languages.map((lang, index) =>
        index === editingIndex ? newLanguage : lang
      );
      setEditingIndex(null);
    } else {
      updatedLanguages = [...languages, newLanguage];
    }

    setLanguages(updatedLanguages);
    onSubmit(updatedLanguages);
    form.reset();
  };

  const handleEdit = (index: number) => {
    const language = languages[index];
    setEditingIndex(index);
    form.reset({
      name: language.name,
      level: language.level,
    });
  };

  const handleDelete = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
    onSubmit(updatedLanguages);
    if (editingIndex === index) {
      setEditingIndex(null);
      form.reset();
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Languages
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input placeholder="English, Spanish, French..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proficiency Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select proficiency level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="fluent">Fluent</SelectItem>
                        <SelectItem value="native">Native</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              {editingIndex !== null ? "Update Language" : "Add Language"}
            </Button>
          </form>
        </Form>

        {languages.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Added Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {languages.map((language, index) => (
                <div
                  key={language.id}
                  className="p-3 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-foreground">{language.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {levelLabels[language.level]}
                      </p>
                    </div>
                    <div className="flex gap-1">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}