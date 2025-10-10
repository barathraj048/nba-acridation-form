'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { facultySchema, type FacultyFormData } from '@/lib/validations';
import { Department } from '@prisma/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import TabularCRUD from '@/components/tabularForms';
import { useParams } from "next/navigation";

interface FacultyFormProps {
  initialData?: Partial<FacultyFormData & { id: string }>;
  isEditing?: boolean;
}

export function FacultyForm({ initialData, isEditing = false }: FacultyFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const facultyId = params.id  as string;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema),
    defaultValues: initialData,
  });

  const watchedDepartment = watch('department');

  const onSubmit = async (data: FacultyFormData) => {
    setIsLoading(true);
    try {
      const url = isEditing ? `/api/faculty/${initialData?.id}` : '/api/faculty';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save faculty');
      }

      toast.success(
        isEditing ? 'Faculty updated successfully!' : 'Faculty created successfully!'
      );
      router.push('/faculty');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isEditing ? 'Edit Faculty' : 'Add New Faculty'}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? 'Update faculty information and research profiles'
            : 'Enter faculty details and research profile information'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={watchedDepartment}
                  onValueChange={(value: Department) => setValue('department', value)}
                >
                  <SelectTrigger className={errors.department ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Department).map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-500">{errors.department.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="joiningYear">Joining Year *</Label>
                <Input
                  id="joiningYear"
                  type="number"
                  {...register('joiningYear', { valueAsNumber: true })}
                  className={errors.joiningYear ? 'border-red-500' : ''}
                />
                {errors.joiningYear && (
                  <p className="text-sm text-red-500">{errors.joiningYear.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  {...register('qualification')}
                  placeholder="e.g., Ph.D. Computer Science"
                  className={errors.qualification ? 'border-red-500' : ''}
                />
                {errors.qualification && (
                  <p className="text-sm text-red-500">{errors.qualification.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+91-9876543210"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="faculty@university.edu"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Research Profiles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Research Profiles</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleScholar">Google Scholar URL</Label>
                <Input
                  id="googleScholar"
                  {...register('googleScholar')}
                  placeholder="https://scholar.google.com/citations?user=..."
                  className={errors.googleScholar ? 'border-red-500' : ''}
                />
                {errors.googleScholar && (
                  <p className="text-sm text-red-500">{errors.googleScholar.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="scopusUrl">Scopus Profile URL</Label>
                <Input
                  id="scopusUrl"
                  {...register('scopusUrl')}
                  placeholder="https://www.scopus.com/authid/detail.uri?authorId=..."
                  className={errors.scopusUrl ? 'border-red-500' : ''}
                />
                {errors.scopusUrl && (
                  <p className="text-sm text-red-500">{errors.scopusUrl.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="webOfScience">Web of Science URL</Label>
                <Input
                  id="webOfScience"
                  {...register('webOfScience')}
                  placeholder="https://www.webofscience.com/wos/author/rid/..."
                  className={errors.webOfScience ? 'border-red-500' : ''}
                />
                {errors.webOfScience && (
                  <p className="text-sm text-red-500">{errors.webOfScience.message}</p>
                )}
              </div>
              
            </div>
            <TabularCRUD facultyId={facultyId}></TabularCRUD>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Update Faculty' : 'Create Faculty'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}