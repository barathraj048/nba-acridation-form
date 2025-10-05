"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface NPTELCourse {
  id: string;
  courseName: string;
  instructorName: string;
  duration: string;
  completionYear: number;
  platformLink?: string;
  certificateUrl?: string;
  faculty?: {
    name: string;
    department: string;
  };
}

export default function AllNPTELCoursesPage() {
  const [courses, setCourses] = useState<NPTELCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/nptel");
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Failed to load NPTEL courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-500 mt-10">Loading NPTEL courses...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">
        All NPTEL Courses by Faculty
      </h1>

      {courses.length > 0 ? (
        courses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="text-lg">{course.courseName}</CardTitle>
              <CardDescription>
                Instructor: {course.instructorName} • Completed: {course.completionYear}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Faculty:</strong> {course.faculty?.name} ({course.faculty?.department})</p>
                  <p><strong>Duration:</strong> {course.duration}</p>
                  <p><strong>Completion Year:</strong> {course.completionYear}</p>
                </div>
                <div>
                  {course.platformLink && (
                    <p>
                      <strong>Course Link:</strong>{" "}
                      <a href={course.platformLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                        View Course
                      </a>
                    </p>
                  )}
                  {course.certificateUrl && (
                    <p>
                      <strong>Certificate:</strong>{" "}
                      <a href={course.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                        View Certificate
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <GraduationCap className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No NPTEL courses found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
