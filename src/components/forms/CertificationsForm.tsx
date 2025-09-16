import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Certification } from "@/types/resume";
import { Plus, Trash2, Award } from "lucide-react";

const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().optional(),
});

type CertificationFormData = z.infer<typeof certificationSchema>;

interface CertificationsFormProps {
  initialData: Certification[];
  onSubmit: (data: Certification[]) => void;
}

export function CertificationsForm({ initialData, onSubmit }: CertificationsFormProps) {
  const [certifications, setCertifications] = useState<Certification[]>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const form = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    },
  });

  const handleSubmit = (data: CertificationFormData) => {
    const newCertification: Certification = {
      id: editingIndex !== null ? certifications[editingIndex].id : Date.now().toString(),
      ...data,
    };

    let updatedCertifications: Certification[];
    if (editingIndex !== null) {
      updatedCertifications = certifications.map((cert, index) =>
        index === editingIndex ? newCertification : cert
      );
      setEditingIndex(null);
    } else {
      updatedCertifications = [...certifications, newCertification];
    }

    setCertifications(updatedCertifications);
    onSubmit(updatedCertifications);
    form.reset();
  };

  const handleEdit = (index: number) => {
    const certification = certifications[index];
    setEditingIndex(index);
    form.reset({
      name: certification.name,
      issuer: certification.issuer,
      date: certification.date,
      expiryDate: certification.expiryDate || "",
      credentialId: certification.credentialId || "",
      url: certification.url || "",
    });
  };

  const handleDelete = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
    onSubmit(updatedCertifications);
    if (editingIndex === index) {
      setEditingIndex(null);
      form.reset();
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Certifications
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
                    <FormLabel>Certification Name</FormLabel>
                    <FormControl>
                      <Input placeholder="AWS Certified Solutions Architect" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issuer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuer</FormLabel>
                    <FormControl>
                      <Input placeholder="Amazon Web Services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date (Optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="credentialId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credential ID (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC123DEF456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://credly.com/badges/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              {editingIndex !== null ? "Update Certification" : "Add Certification"}
            </Button>
          </form>
        </Form>

        {certifications.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Added Certifications</h3>
            {certifications.map((certification, index) => (
              <div
                key={certification.id}
                className="p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{certification.name}</h4>
                    <p className="text-sm text-muted-foreground">{certification.issuer}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Issued: {certification.date}
                      {certification.expiryDate && ` • Expires: ${certification.expiryDate}`}
                    </p>
                    {certification.credentialId && (
                      <p className="text-xs text-muted-foreground">ID: {certification.credentialId}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
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