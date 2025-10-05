import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, BookOpen, Award, GraduationCap, Trophy, Search, Download } from 'lucide-react';
import { DollarSign, Briefcase, Handshake, CalendarCheck, ClipboardList, Star } from "lucide-react";

const features = [
  {
    title: 'Faculty Management',
    description: 'Manage faculty profiles, departments, and contact information',
    icon: Users,
    href: '/faculty',
    color: 'bg-blue-500',
  },
  {
    title: 'Research Papers',
    description: 'Track journal publications and conference proceedings',
    icon: FileText,
    href: '/datasets/journals',
    color: 'bg-green-500',
  },
  {
    title: 'Books & Chapters',
    description: 'Manage authored books and book chapters',
    icon: BookOpen,
    href: '/datasets/books',
    color: 'bg-purple-500',
  },
  {
    title: 'Patents',
    description: 'Track patent applications and grants',
    icon: Award,
    href: '/datasets/patents',
    color: 'bg-orange-500',
  },
  {
    title: 'NPTEL Courses',
    description: 'Monitor online course completions',
    icon: GraduationCap,
    href: '/datasets/nptel',
    color: 'bg-teal-500',
  },
  {
    title: 'Awards',
    description: 'Record academic and research awards',
    icon: Trophy,
    href: '/datasets/awards',
    color: 'bg-red-500',
  },
  {
    title: 'Funding / Research',
    description: 'Track funding received for research projects',
    icon: DollarSign,
    href: '/datasets/funding',
    color: 'bg-indigo-500',
  },
  {
    title: 'PhD Guided',
    description: 'Manage PhD candidates guided by faculty',
    icon: Briefcase,
    href: '/datasets/phd',
    color: 'bg-pink-500',
  },
  {
    title: 'Consulting',
    description: 'Track consulting projects and collaborations',
    icon: Handshake,
    href: '/datasets/consulting',
    color: 'bg-yellow-500',
  },
  {
    title: 'MoUs',
    description: 'Manage Memoranda of Understanding with organizations',
    icon: ClipboardList,
    href: '/datasets/mous',
    color: 'bg-cyan-500',
  },
  {
    title: 'Seminars / Workshops',
    description: 'Record faculty participation in seminars and workshops',
    icon: CalendarCheck,
    href: '/datasets/seminars',
    color: 'bg-lime-500',
  },
  {
    title: 'Invited Tasks',
    description: 'Track invited talks, sessions, or responsibilities',
    icon: Star,
    href: '/datasets/invited',
    color: 'bg-fuchsia-500',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Faculty Management System
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Comprehensive platform for managing faculty information, research output, 
            and academic achievements with advanced search, reporting, and data export capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/faculty">
                <Users className="mr-2 h-5 w-5" />
                Manage Faculty
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Advanced Search
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                <CardDescription className="text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full group-hover:translate-y-[-2px] transition-transform">
                  <Link href={feature.href}>
                    Manage {feature.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
            System Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-slate-600">
                Filter by department, year, qualifications, and research presence
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Export</h3>
              <p className="text-slate-600">
                Export to CSV, generate PDF reports for comprehensive analysis
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Management</h3>
              <p className="text-slate-600">
                Bulk import, inline editing, and comprehensive validation
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href="/faculty/new">Add New Faculty</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/datasets">Manage Datasets</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/reports">Generate Reports</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}