'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FacultySearch } from '@/components/faculty/faculty-search';
import { Plus, User, Mail, Phone, ExternalLink, Eye, Edit, Trash2, Download } from 'lucide-react';
import useSWR from 'swr';
import { toast } from 'sonner';
import { exportToCSV, csvTemplates } from '@/lib/csv-utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FacultyPage() {
  const [filters, setFilters] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: '12',
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '' && value !== false)
    ),
  });

  const { data, error, isLoading, mutate } = useSWR(
    `/api/faculty?${queryParams.toString()}`,
    fetcher
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const response = await fetch(`/api/faculty/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete faculty');

      toast.success('Faculty deleted successfully');
      mutate();
    } catch (error) {
      toast.error('Failed to delete faculty');
    }
  };

  const handleExportCSV = () => {
    if (!data?.data?.length) {
      toast.error('No data to export');
      return;
    }

    const exportData = data.data.map((faculty: any) => ({
      name: faculty.name,
      department: faculty.department,
      joiningYear: faculty.joiningYear,
      qualification: faculty.qualification,
      phone: faculty.phone,
      email: faculty.email,
      googleScholar: faculty.googleScholar || '',
      scopusUrl: faculty.scopusUrl || '',
      webOfScience: faculty.webOfScience || '',
      totalJournals: faculty._count?.journals || 0,
      totalConferences: faculty._count?.conferences || 0,
      totalBooks: faculty._count?.books || 0,
      totalPatents: faculty._count?.patents || 0,
      totalNptel: faculty._count?.nptelCourses || 0,
      totalAwards: faculty._count?.awards || 0,
    }));

    exportToCSV({
      filename: `faculty-data-${new Date().toISOString().split('T')[0]}`,
      data: exportData,
    });

    toast.success('Faculty data exported to CSV');
  };

  const handleExportTemplate = () => {
    exportToCSV({
      filename: 'faculty-import-template',
      data: csvTemplates.faculty,
    });
    toast.success('Template downloaded');
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>Error loading faculty data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Faculty Management</h1>
          <p className="text-slate-600 mt-2">
            Manage faculty profiles and research information
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleExportTemplate} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Import Template
          </Button>
          <Button variant="outline" onClick={handleExportCSV} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button asChild>
            <Link href="/faculty/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Faculty
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <FacultySearch onFiltersChange={setFilters} />

      {/* Results Summary */}
      {data && (
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {data.data?.length || 0} of {data.pagination?.total || 0} faculty members
          </p>
        </div>
      )}

      {/* Faculty Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data?.data?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((faculty: any) => (
            <Card key={faculty.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{faculty.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="secondary" className="text-xs">
                          {faculty.department}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{faculty.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{faculty.phone}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p><strong>Qualification:</strong> {faculty.qualification}</p>
                    <p><strong>Joined:</strong> {faculty.joiningYear}</p>
                  </div>
                  
                  {/* Research Profile Links */}
                  <div className="flex flex-wrap gap-2">
                    {faculty.googleScholar && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={faculty.googleScholar} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Scholar
                        </a>
                      </Button>
                    )}
                    {faculty.scopusUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={faculty.scopusUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Scopus
                        </a>
                      </Button>
                    )}
                    {faculty.webOfScience && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={faculty.webOfScience} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          WoS
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Research Output Summary */}
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div className="bg-slate-50 p-2 rounded">
                      <div className="font-semibold">{faculty._count?.journals || 0}</div>
                      <div className="text-slate-500">Journals</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                      <div className="font-semibold">{faculty._count?.patents || 0}</div>
                      <div className="text-slate-500">Patents</div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                      <div className="font-semibold">{faculty._count?.awards || 0}</div>
                      <div className="text-slate-500">Awards</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/faculty/${faculty.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/faculty/${faculty.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(faculty.id, faculty.name)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <User className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No faculty found</h3>
            <p className="text-slate-600 mb-6">
              {Object.keys(filters).length > 0
                ? 'No faculty members match your search criteria. Try adjusting your filters.'
                : 'Get started by adding your first faculty member.'}
            </p>
            <Button asChild>
              <Link href="/faculty/new">
                <Plus className="h-4 w-4 mr-2" />
                Add First Faculty
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          
          {[...Array(data.pagination.totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          
          <Button
            variant="outline"
            disabled={currentPage === data.pagination.totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}