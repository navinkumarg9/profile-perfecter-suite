import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Project } from "@/types/resume";
import { FolderOpen, Plus, Trash2, Calendar, Globe, Github } from "lucide-react";

const projectsSchema = z.object({
  projects: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Description is required"),
    technologies: z.array(z.string()).min(1, "At least one technology is required"),
    url: z.string().url().optional().or(z.literal("")),
    github: z.string().url().optional().or(z.literal("")),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  })),
});

interface ProjectsFormProps {
  initialData: Project[];
  onSubmit: (data: Project[]) => void;
}

export function ProjectsForm({ initialData, onSubmit }: ProjectsFormProps) {
  const form = useForm({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      projects: initialData.length > 0 ? initialData : [{
        id: Date.now().toString(),
        name: "",
        description: "",
        technologies: [""],
        url: "",
        github: "",
        startDate: "",
        endDate: "",
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const handleSubmit = (data: { projects: Project[] }) => {
    // Filter out empty technologies
    const cleanedProjects = data.projects.map(project => ({
      ...project,
      technologies: project.technologies.filter(tech => tech.trim() !== ""),
    }));
    onSubmit(cleanedProjects);
  };

  const addProject = () => {
    append({
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [""],
      url: "",
      github: "",
      startDate: "",
      endDate: "",
    });
  };

  const addTechnology = (projectIndex: number) => {
    const currentTechnologies = form.getValues(`projects.${projectIndex}.technologies`);
    form.setValue(`projects.${projectIndex}.technologies`, [...currentTechnologies, ""]);
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const currentTechnologies = form.getValues(`projects.${projectIndex}.technologies`);
    if (currentTechnologies.length > 1) {
      const newTechnologies = currentTechnologies.filter((_, index) => index !== techIndex);
      form.setValue(`projects.${projectIndex}.technologies`, newTechnologies);
    }
  };

  return (
    <Card className="gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-primary" />
          Projects
        </CardTitle>
        <CardDescription>
          Showcase your notable projects and side work
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {fields.map((field, projectIndex) => (
              <Card key={field.id} className="border border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">Project #{projectIndex + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(projectIndex)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`projects.${projectIndex}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="E-commerce Platform" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`projects.${projectIndex}.startDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Start Date
                          </FormLabel>
                          <FormControl>
                            <Input type="month" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`projects.${projectIndex}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="month" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`projects.${projectIndex}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Live URL (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://myproject.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`projects.${projectIndex}.github`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            GitHub URL (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/user/project" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`projects.${projectIndex}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what this project does, your role, and the impact it had..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-2">
                    <FormLabel>Technologies Used</FormLabel>
                    {form.watch(`projects.${projectIndex}.technologies`).map((_, techIndex) => (
                      <div key={techIndex} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`projects.${projectIndex}.technologies.${techIndex}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder="React, Node.js, MongoDB, etc."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {form.watch(`projects.${projectIndex}.technologies`).length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTechnology(projectIndex, techIndex)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTechnology(projectIndex)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Technology
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={addProject}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Project
              </Button>
              
              <Button type="submit" className="gradient-primary text-white shadow-elegant transition-smooth hover:shadow-lg flex-1">
                Save Projects
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}