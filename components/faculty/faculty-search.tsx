'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Department } from '@prisma/client';
import { Search, Filter, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useParams } from "next/navigation";

interface FacultySearchProps {
  onFiltersChange?: (filters: any) => void;
}

export function FacultySearch({ onFiltersChange }: FacultySearchProps) {
  const params = useParams();
  const facultyId = params.facultyId as string;

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    department: searchParams.get('department') || '',
    joiningYearMin: searchParams.get('joiningYearMin') || '',
    joiningYearMax: searchParams.get('joiningYearMax') || '',
    qualification: searchParams.get('qualification') || '',
    hasGoogleScholar: searchParams.get('hasGoogleScholar') === 'true',
    hasScopus: searchParams.get('hasScopus') === 'true',
    hasWebOfScience: searchParams.get('hasWebOfScience') === 'true',
    hasPatents: searchParams.get('hasPatents') === 'true',
    hasNptel: searchParams.get('hasNptel') === 'true',
  });

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'search') return false;
    if (typeof value === 'boolean') return value;
    return value !== '';
  }).length;

  const updateFilters = (newFilters: any) => {
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
    
    // Update URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, String(value));
      }
    });
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(`/faculty${newUrl}`, { scroll: false });
  };

  const handleInputChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    updateFilters(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      department: '',
      joiningYearMin: '',
      joiningYearMax: '',
      qualification: '',
      hasGoogleScholar: false,
      hasScopus: false,
      hasWebOfScience: false,
      hasPatents: false,
      hasNptel: false,
    };
    updateFilters(clearedFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by updateFilters
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Faculty
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Badge variant="secondary">
                {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Filter className="h-4 w-4" />
              {isExpanded ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search by faculty name..."
              value={filters.search}
              onChange={(e) => handleInputChange('search', e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Department Filter */}
              <div className="space-y-2">
                <Label>Department</Label>
                <Select
                  value={filters.department}
                  onValueChange={(value) => handleInputChange('department', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All departments</SelectItem>
                    {Object.values(Department).map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Joining Year Range */}
              <div className="space-y-2">
                <Label>Joining Year (Min)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 2020"
                  value={filters.joiningYearMin}
                  onChange={(e) => handleInputChange('joiningYearMin', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Joining Year (Max)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 2023"
                  value={filters.joiningYearMax}
                  onChange={(e) => handleInputChange('joiningYearMax', e.target.value)}
                />
              </div>

              {/* Qualification Filter */}
              <div className="space-y-2">
                <Label>Qualification</Label>
                <Input
                  placeholder="e.g., Ph.D."
                  value={filters.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                />
              </div>
            </div>

            {/* Toggle Filters */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Research Presence</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="googleScholar"
                    checked={filters.hasGoogleScholar}
                    onCheckedChange={(checked) => handleInputChange('hasGoogleScholar', checked)}
                  />
                  <Label htmlFor="googleScholar" className="text-sm">
                    Google Scholar
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="scopus"
                    checked={filters.hasScopus}
                    onCheckedChange={(checked) => handleInputChange('hasScopus', checked)}
                  />
                  <Label htmlFor="scopus" className="text-sm">
                    Scopus
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="webOfScience"
                    checked={filters.hasWebOfScience}
                    onCheckedChange={(checked) => handleInputChange('hasWebOfScience', checked)}
                  />
                  <Label htmlFor="webOfScience" className="text-sm">
                    Web of Science
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="patents"
                    checked={filters.hasPatents}
                    onCheckedChange={(checked) => handleInputChange('hasPatents', checked)}
                  />
                  <Label htmlFor="patents" className="text-sm">
                    Has Patents
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="nptel"
                    checked={filters.hasNptel}
                    onCheckedChange={(checked) => handleInputChange('hasNptel', checked)}
                  />
                  <Label htmlFor="nptel" className="text-sm">
                    Has NPTEL
                  </Label>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}