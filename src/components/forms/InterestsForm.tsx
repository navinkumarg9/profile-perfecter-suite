import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Interest } from "@/types/resume";
import { Plus, Trash2, Heart } from "lucide-react";

const interestSchema = z.object({
  name: z.string().min(1, "Interest name is required"),
  category: z.string().optional(),
});

type InterestFormData = z.infer<typeof interestSchema>;

interface InterestsFormProps {
  initialData: Interest[];
  onSubmit: (data: Interest[]) => void;
}

export function InterestsForm({ initialData, onSubmit }: InterestsFormProps) {
  const [interests, setInterests] = useState<Interest[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<InterestFormData>({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const handleSubmit = (data: InterestFormData) => {
    const newInterest: Interest = {
      id: editingIndex !== null ? interests[editingIndex].id : Date.now().toString(),
      ...data,
    };

    let updatedInterests: Interest[];
    if (editingIndex !== null) {
      updatedInterests = interests.map((interest, index) =>
        index === editingIndex ? newInterest : interest
      );
      setEditingIndex(null);
    } else {
      updatedInterests = [...interests, newInterest];
    }

    setInterests(updatedInterests);
    onSubmit(updatedInterests);
    form.reset();
  };

  const handleEdit = (index: number) => {
    const interest = interests[index];
    setEditingIndex(index);
    form.reset({
      name: interest.name,
      category: interest.category || "",
    });
  };

  const handleDelete = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
    onSubmit(updatedInterests);
    if (editingIndex === index) {
      setEditingIndex(null);
      form.reset();
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Interests & Hobbies
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
                    <FormLabel>Interest/Hobby</FormLabel>
                    <FormControl>
                      <Input placeholder="Photography, Reading, Travel..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Creative, Sports, Technology..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              {editingIndex !== null ? "Update Interest" : "Add Interest"}
            </Button>
          </form>
        </Form>

        {interests.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Added Interests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interests.map((interest, index) => (
                <div
                  key={interest.id}
                  className="p-3 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-foreground">{interest.name}</h4>
                      {interest.category && (
                        <p className="text-sm text-muted-foreground">{interest.category}</p>
                      )}
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