import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Edit, Mail, Phone, ExternalLink, Calendar, Award, FileText, BookOpen, Lightbulb, GraduationCap } from 'lucide-react';
import { Coins,Briefcase, Handshake, FileSignature, Presentation, UserCheck } from "lucide-react";
import { prisma } from '@/lib/prisma';
import DownloadPDFButton from '@/components/pdf-downloadButton';

async function getFaculty(id: string) {
  const faculty = await prisma.faculty.findUnique({
  where: { id },
  include: {
    journals: {
      orderBy: { year: "desc" },
    },
    conferences: {
      orderBy: { year: "desc" },
    },
    books: {
      orderBy: { year: "desc" },
    },
    patents: {
      orderBy: { year: "desc" },
    },
    nptelCourses: {
      orderBy: { completionYear: "desc" },
    },
    awards: {
      orderBy: { year: "desc" },
    },
    fundingResearch:{},
    phdGuided:{},
    consulting:{},
    mous:{},
    seminars:{},
    invitedTasks:{},
  },
});


  if (!faculty) {
    notFound();
  }

  return faculty;
}

export default async function FacultyProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;   // ✅ Await params
  const faculty = await getFaculty(id);
  
  // Filter awards to show last 4 years by default
  const currentYear = new Date().getFullYear();
  const recentAwards = faculty.awards.filter(award => award.year >= currentYear - 3);
  const olderAwards = faculty.awards.filter(award => award.year < currentYear - 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" asChild>
          <Link href="/faculty">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Faculty
          </Link>
        </Button>
        <div className='gap-2'> 
        <Button asChild>
          <Link href={`/faculty/${faculty.id}/edit`}>
            <Edit className="h-4 w-4 mr-2 mr-2" />
            Edit Profile
          </Link>
        </Button>
        <DownloadPDFButton/>
        </div>
      </div>

      {/* Faculty Profile Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {faculty.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">{faculty.name}</CardTitle>
              <CardDescription className="text-lg">
                <Badge variant="secondary" className="mb-2">
                  {faculty.department}
                </Badge>
                <p>{faculty.qualification}</p>
              </CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${faculty.email}`} className="text-blue-600 hover:underline">
                    {faculty.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{faculty.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined: {faculty.joiningYear}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        {(faculty.googleScholar || faculty.scopusUrl || faculty.webOfScience) && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {faculty.googleScholar && (
                <Button variant="outline" size="sm" asChild>
                  <a href={faculty.googleScholar} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Google Scholar
                  </a>
                </Button>
              )}
              {faculty.scopusUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={faculty.scopusUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Scopus
                  </a>
                </Button>
              )}
              {faculty.webOfScience && (
                <Button variant="outline" size="sm" asChild>
                  <a href={faculty.webOfScience} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Web of Science
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Research Output Summary */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
  <Card>
    <CardContent className="p-4 text-center">
      <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.journals.length}</div>
      <div className="text-sm text-slate-600">Journals</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.conferences.length}</div>
      <div className="text-sm text-slate-600">Conferences</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.books.length}</div>
      <div className="text-sm text-slate-600">Books</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <Lightbulb className="h-8 w-8 text-orange-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.patents.length}</div>
      <div className="text-sm text-slate-600">Patents</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <GraduationCap className="h-8 w-8 text-teal-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.nptelCourses.length}</div>
      <div className="text-sm text-slate-600">NPTEL</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <Award className="h-8 w-8 text-red-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.awards.length}</div>
      <div className="text-sm text-slate-600">Awards</div>
    </CardContent>
  </Card>

  {/* New 6 Cards */}

  
  <Card>
    <CardContent className="p-4 text-center">
      <FileText className="h-8 w-8 text-pink-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.fundingResearch.length}</div>
      <div className="text-sm text-slate-600">Funding</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <GraduationCap className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.phdGuided.length}</div>
      <div className="text-sm text-slate-600">PhD Guided</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <GraduationCap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.consulting.length}</div>
      <div className="text-sm text-slate-600">Consulting</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <FileText className="h-8 w-8 text-gray-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.mous.length}</div>
      <div className="text-sm text-slate-600">MoUs</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <BookOpen className="h-8 w-8 text-cyan-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.seminars.length}</div>
      <div className="text-sm text-slate-600">Seminars</div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4 text-center">
      <Award className="h-8 w-8 text-lime-500 mx-auto mb-2" />
      <div className="text-2xl font-bold">{faculty.invitedTasks.length}</div>
      <div className="text-sm text-slate-600">Invited Tasks</div>
    </CardContent>
  </Card> 
</div>


      {/* Detailed Tabs */}
      <Tabs defaultValue="journals" className="space-y-4">
  <TabsList className="grid w-full grid-cols-6 md:grid-cols-12">
    <TabsTrigger value="journals">Journals</TabsTrigger>
    <TabsTrigger value="conferences">Conferences</TabsTrigger>
    <TabsTrigger value="books">Books</TabsTrigger>
    <TabsTrigger value="patents">Patents</TabsTrigger>
    <TabsTrigger value="nptel">NPTEL</TabsTrigger>
    <TabsTrigger value="awards">Awards</TabsTrigger>
    <TabsTrigger value="funding">Funding/Research</TabsTrigger>
    <TabsTrigger value="phd">PhD Guided</TabsTrigger>
    <TabsTrigger value="consulting">Consulting</TabsTrigger>
    <TabsTrigger value="mous">MoUs</TabsTrigger>
    <TabsTrigger value="seminars">Seminars</TabsTrigger>
    <TabsTrigger value="invited">Invited Tasks</TabsTrigger>
  </TabsList>

        <TabsContent value="journals" className="space-y-4">
          {faculty.journals.length > 0 ? (
            faculty.journals.map((journal) => (
              <Card key={journal.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{journal.paperTitle}</CardTitle>
                  <CardDescription>
                    <strong>{journal.journalName}</strong> ({journal.year})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Author:</strong> {journal.authorName}</p>
                      <p><strong>Year:</strong> {journal.year}</p>
                      {journal.impactFactor && (
                        <p><strong>Impact Factor:</strong> {journal.impactFactor}</p>
                      )}
                    </div>
                    <div>
                      {journal.doi && <p><strong>DOI:</strong> {journal.doi}</p>}
                      {journal.issn && <p><strong>ISSN:</strong> {journal.issn}</p>}
                      {journal.indexedIn && <p><strong>Indexed In:</strong> {journal.indexedIn}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No journal publications yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="conferences" className="space-y-4">
          {faculty.conferences.length > 0 ? (
            faculty.conferences.map((conference) => (
              <Card key={conference.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{conference.paperTitle}</CardTitle>
                  <CardDescription>
                    <strong>{conference.conferenceName}</strong> ({conference.year})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Paper S.No:</strong> {conference.paperSno}</p>
                      <p><strong>Authors:</strong> {conference.authorDetails}</p>
                      <p><strong>Year:</strong> {conference.year}</p>
                    </div>
                    <div>
                      {conference.publisher && <p><strong>Publisher:</strong> {conference.publisher}</p>}
                      {conference.doiOrUrl && (
                        <p><strong>DOI/URL:</strong> 
                          <a href={conference.doiOrUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                            {conference.doiOrUrl}
                          </a>
                        </p>
                      )}
                      {conference.indexedIn && <p><strong>Indexed In:</strong> {conference.indexedIn}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No conference publications yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="books" className="space-y-4">
          {faculty.books.length > 0 ? (
            faculty.books.map((book) => (
              <Card key={book.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <CardDescription>
                    {book.bookTitle && <span><strong>{book.bookTitle}</strong> • </span>}
                    {book.year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Author:</strong> {book.authorName}</p>
                      <p><strong>Year:</strong> {book.year}</p>
                    </div>
                    <div>
                      {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
                      {book.publisher && <p><strong>Publisher:</strong> {book.publisher}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No books/chapters yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="patents" className="space-y-4">
          {faculty.patents.length > 0 ? (
            faculty.patents.map((patent) => (
              <Card key={patent.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{patent.patentTitle}</CardTitle>
                  <CardDescription>
                    <Badge variant={patent.status === 'GRANTED' ? 'default' : 'secondary'}>
                      {patent.status}
                    </Badge>
                    <span className="ml-2">{patent.country} • {patent.year}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Authors:</strong> {patent.authors}</p>
                      <p><strong>Country:</strong> {patent.country}</p>
                      <p><strong>Year:</strong> {patent.year}</p>
                    </div>
                    <div>
                      {patent.patentNumber && <p><strong>Patent Number:</strong> {patent.patentNumber}</p>}
                      {patent.link && (
                        <p><strong>Link:</strong> 
                          <a href={patent.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                            View Patent
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
                <Lightbulb className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No patents yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="nptel" className="space-y-4">
          {faculty.nptelCourses.length > 0 ? (
            faculty.nptelCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{course.courseName}</CardTitle>
                  <CardDescription>
                    Instructor: {course.instructorName} • Completed: {course.completionYear}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Duration:</strong> {course.duration}</p>
                      <p><strong>Completion Year:</strong> {course.completionYear}</p>
                    </div>
                    <div>
                      {course.platformLink && (
                        <p><strong>Course Link:</strong> 
                          <a href={course.platformLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                            View Course
                          </a>
                        </p>
                      )}
                      {course.certificateUrl && (
                        <p><strong>Certificate:</strong> 
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
                <p className="text-slate-600">No NPTEL courses yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="awards" className="space-y-4">
          {faculty.awards.length > 0 ? (
            <>
              {recentAwards.length > 0 && (
                <>
                  <div className="text-lg font-semibold text-slate-900 mb-4">
                    Recent Awards (Last 4 Years)
                  </div>
                  {recentAwards.map((award) => (
                    <Card key={award.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{award.awardName}</CardTitle>
                        <CardDescription>
                          <strong>{award.awardingBody}</strong> • {award.year}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Year:</strong> {award.year}</p>
                            {award.details && <p><strong>Details:</strong> {award.details}</p>}
                          </div>
                          <div>
                            {award.link && (
                              <p><strong>Link:</strong> 
                                <a href={award.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                  View Award
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
              
              {olderAwards.length > 0 && (
                <>
                  <div className="text-lg font-semibold text-slate-900 mb-4 mt-8">
                    Previous Awards
                  </div>
                  {olderAwards.map((award) => (
                    <Card key={award.id} className="opacity-75">
                      <CardHeader>
                        <CardTitle className="text-lg">{award.awardName}</CardTitle>
                        <CardDescription>
                          <strong>{award.awardingBody}</strong> • {award.year}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Year:</strong> {award.year}</p>
                            {award.details && <p><strong>Details:</strong> {award.details}</p>}
                          </div>
                          <div>
                            {award.link && (
                              <p><strong>Link:</strong> 
                                <a href={award.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                  View Award
                                </a>
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}

            </>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Award className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No awards yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      {/* === FUNDING / RESEARCH === */}
<TabsContent value="funding" className="space-y-4">
  {faculty.fundingResearch > 0 ? (
    faculty.fundingResearch.map((fund) => (
      <Card key={fund.id}>
        <CardHeader>
          <CardTitle className="text-lg">{fund.proposalTitle}</CardTitle>
          <CardDescription>
            <strong>{fund.agencyName}</strong> • {fund.yearReceived}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Agency Name:</strong> {fund.agencyName}</p>
              <p><strong>Proposal Title:</strong> {fund.proposalTitle}</p>
            </div>
            <div>
              <p><strong>Amount:</strong> ₹{fund.amount.toLocaleString()}</p>
              <p><strong>Year Received:</strong> {fund.yearReceived}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <Card>
      <CardContent className="text-center py-8">
        <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">No funding or research projects yet</p>
      </CardContent>
    </Card>
  )}
</TabsContent>

{/* === PHD GUIDED === */}
<TabsContent value="phd" className="space-y-4">
  {faculty.phdGuided.length > 0 ? (
    faculty.phdGuided.map((phd) => (
      <Card key={phd.id}>
        <CardHeader>
          <CardTitle className="text-lg">{phd.candidateName}</CardTitle>
          <CardDescription>
            <strong>{phd.university}</strong> • {phd.researchYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Research Year:</strong> {phd.researchYear}</p>
              <p><strong>University:</strong> {phd.university}</p>
            </div>
            <div>
              <p><strong>Status:</strong> {phd.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <Card>
      <CardContent className="text-center py-8">
        <GraduationCap className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">No PhD scholars guided yet</p>
      </CardContent>
    </Card>
  )}
</TabsContent>

{/* === CONSULTING === */}
<TabsContent value="consulting" className="space-y-4">
  {faculty.consulting?.length > 0 ? (
    faculty.consulting.map((c) => (
      <Card key={c.id}>
        <CardHeader>
          <CardTitle className="text-lg">{c.projectTitle}</CardTitle>
          <CardDescription>
            <strong>{c.companyName}</strong> • {c.year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Company Name:</strong> {c.companyName}</p>
              <p><strong>Year:</strong> {c.year}</p>
            </div>
            <div>
              <p><strong>Amount:</strong> ₹{c.amount.toLocaleString()}</p>
              <p><strong>Status:</strong> {c.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <Card>
      <CardContent className="text-center py-8">
        <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">No consulting projects yet</p>
      </CardContent>
    </Card>
  )}
</TabsContent>


{/* === MOUs === */}
<TabsContent value="mous" className="space-y-4">
  {faculty.mous.length > 0 ? (
    faculty.mous.map((mou) => (
      <Card key={mou.id}>
        <CardHeader>
          <CardTitle className="text-lg">{mou.companyName}</CardTitle>
          <CardDescription>{mou.purpose}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Company:</strong> {mou.companyName}</p>
              <p><strong>Purpose:</strong> {mou.purpose}</p>
            </div>
            <div>
              <p><strong>Duration:</strong> {mou.duration}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <Card>
      <CardContent className="text-center py-8">
        <Handshake className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">No MoUs signed yet</p>
      </CardContent>
    </Card>
  )}
</TabsContent>

{/* === SEMINARS / WORKSHOPS === */}
{/* === SEMINARS / WORKSHOPS === */}
<TabsContent value="seminars" className="space-y-4">
  {faculty.seminars?.length > 0 ? (
    faculty.seminars.map((event) => (
      <Card key={event.id}>
        <CardHeader>
          <CardTitle className="text-lg">{event.eventName}</CardTitle>
          <CardDescription>
            <strong>{event.title}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              {event.fundingAgency && (
                <p><strong>Funding Agency:</strong> {event.fundingAgency}</p>
              )}
              {event.amount && (
                <p><strong>Amount:</strong> ₹{event.amount.toLocaleString()}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <Card>
      <CardContent className="text-center py-8">
        <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">No seminars or workshops yet</p>
      </CardContent>
    </Card>
  )}
</TabsContent>


{/* === INVITED TASKS === */}
<TabsContent value="invited" className="space-y-4">
  {faculty.invitedTasks.length > 0 ? (
    faculty.invitedTasks.map((task) => (
      <Card key={task.id}>
        <CardHeader>
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <CardDescription>
            Invited by: <strong>{task.facultyName}</strong> • {new Date(task.date).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Role/Details:</strong> {task.invitedAt}</p>
        </CardContent>
      </Card>
    ))
  ) : (
    <Card>
      <CardContent className="text-center py-8">
        <UserCheck className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-600">No invited tasks yet</p>
      </CardContent>
    </Card>
  )}
</TabsContent>


      </Tabs>
    </div>
  );
}