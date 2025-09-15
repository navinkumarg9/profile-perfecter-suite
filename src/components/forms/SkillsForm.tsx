import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skill } from "@/types/resume";
import { Star, Plus, Trash2 } from "lucide-react";

const skillsSchema = z.object({
  skills: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, "Skill name is required"),
    level: z.number().min(1).max(5),
    category: z.enum(['technical', 'soft', 'language']),
  })),
});

interface SkillsFormProps {
  initialData: Skill[];
  onSubmit: (data: Skill[]) => void;
}

export function SkillsForm({ initialData, onSubmit }: SkillsFormProps) {
  const form = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: initialData.length > 0 ? initialData : [{
        id: Date.now().toString(),
        name: "",
        level: 3,
        category: 'technical' as const,
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const handleSubmit = (data: { skills: Skill[] }) => {
    onSubmit(data.skills);
  };

  const addSkill = () => {
    append({
      id: Date.now().toString(),
      name: "",
      level: 3,
      category: 'technical' as const,
    });
  };

  const renderStars = (level: number, onChange: (level: number) => void) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Button
            key={i}
            type="button"
            variant="ghost"
            size="sm"
            className="p-0 h-6 w-6"
            onClick={() => onChange(i + 1)}
          >
            <Star
              className={`h-4 w-4 ${
                i < level ? 'fill-primary text-primary' : 'text-gray-300'
              }`}
            />
          </Button>
        ))}
      </div>
    );
  };

  return (
    <Card className="gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Skills
        </CardTitle>
        <CardDescription>
          Add your skills and rate your proficiency level (1-5 stars)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <Card key={field.id} className="border border-border/50">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <FormField
                      control={form.control}
                      name={`skills.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Name</FormLabel>
                          <FormControl>
                            <Input placeholder="React" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`skills.${index}.category`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="technical">Technical</SelectItem>
                              <SelectItem value="soft">Soft Skills</SelectItem>
                              <SelectItem value="language">Language</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`skills.${index}.level`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proficiency Level</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              {renderStars(field.value, field.onChange)}
                              <p className="text-xs text-muted-foreground">
                                {field.value === 1 && "Beginner"}
                                {field.value === 2 && "Basic"}
                                {field.value === 3 && "Intermediate"}
                                {field.value === 4 && "Advanced"}
                                {field.value === 5 && "Expert"}
                              </p>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={addSkill}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Skill
              </Button>
              
              <Button type="submit" className="gradient-primary text-white shadow-elegant transition-smooth hover:shadow-lg flex-1">
                Save Skills
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}