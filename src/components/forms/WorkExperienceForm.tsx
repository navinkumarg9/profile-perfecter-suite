import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { WorkExperience } from "@/types/resume";
import { Briefcase, Plus, Trash2, Calendar } from "lucide-react";

const workExperienceSchema = z.object({
  experiences: z.array(z.object({
    id: z.string(),
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    location: z.string().min(1, "Location is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    current: z.boolean(),
    description: z.array(z.string()).min(1, "At least one achievement is required"),
  })),
});

interface WorkExperienceFormProps {
  initialData: WorkExperience[];
  onSubmit: (data: WorkExperience[]) => void;
}

export function WorkExperienceForm({ initialData, onSubmit }: WorkExperienceFormProps) {
  const form = useForm({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      experiences: initialData.length > 0 ? initialData : [{
        id: Date.now().toString(),
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: [""],
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const handleSubmit = (data: { experiences: WorkExperience[] }) => {
    onSubmit(data.experiences);
  };

  const addExperience = () => {
    append({
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""],
    });
  };

  const addDescriptionItem = (experienceIndex: number) => {
    const currentDescriptions = form.getValues(`experiences.${experienceIndex}.description`);
    form.setValue(`experiences.${experienceIndex}.description`, [...currentDescriptions, ""]);
  };

  const removeDescriptionItem = (experienceIndex: number, descriptionIndex: number) => {
    const currentDescriptions = form.getValues(`experiences.${experienceIndex}.description`);
    if (currentDescriptions.length > 1) {
      const newDescriptions = currentDescriptions.filter((_, index) => index !== descriptionIndex);
      form.setValue(`experiences.${experienceIndex}.description`, newDescriptions);
    }
  };

  return (
    <Card className="gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          Work Experience
        </CardTitle>
        <CardDescription>
          Add your professional work experience, starting with the most recent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {fields.map((field, experienceIndex) => (
              <Card key={field.id} className="border border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">Experience #{experienceIndex + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(experienceIndex)}
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
                      name={`experiences.${experienceIndex}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Google" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`experiences.${experienceIndex}.position`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Senior Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`experiences.${experienceIndex}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="San Francisco, CA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`experiences.${experienceIndex}.startDate`}
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
                      name={`experiences.${experienceIndex}.current`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Currently working here</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {!form.watch(`experiences.${experienceIndex}.current`) && (
                      <FormField
                        control={form.control}
                        name={`experiences.${experienceIndex}.endDate`}
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
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Key Achievements & Responsibilities</FormLabel>
                    {form.watch(`experiences.${experienceIndex}.description`).map((_, descIndex) => (
                      <div key={descIndex} className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`experiences.${experienceIndex}.description.${descIndex}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Textarea
                                  placeholder="• Increased team productivity by 30% through implementation of automated testing..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {form.watch(`experiences.${experienceIndex}.description`).length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeDescriptionItem(experienceIndex, descIndex)}
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
                      onClick={() => addDescriptionItem(experienceIndex)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Achievement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={addExperience}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Experience
              </Button>
              
              <Button type="submit" className="gradient-primary text-white shadow-elegant transition-smooth hover:shadow-lg flex-1">
                Save Work Experience
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}