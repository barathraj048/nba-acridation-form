import { z } from 'zod';
import { Department, PatentStatus } from '@prisma/client';

// Common validations
const emailSchema = z.string().email('Invalid email address');
const phoneSchema = z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number');
const urlSchema = z.string().url('Invalid URL').optional().or(z.literal(''));
const yearSchema = z.number().min(1900).max(new Date().getFullYear() + 10);

// Faculty validation schema
export const facultySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  department: z.nativeEnum(Department),
  joiningYear: yearSchema,
  qualification: z.string().min(2, 'Qualification is required'),
  phone: phoneSchema,
  email: emailSchema,
  googleScholar: urlSchema,
  scopusUrl: urlSchema,
  webOfScience: urlSchema,
});

export type FacultyFormData = z.infer<typeof facultySchema>;

// Journal validation schema
export const journalSchema = z.object({
  authorName: z.string().min(2, 'Author name is required'),
  paperTitle: z.string().min(2, 'Paper title is required'),
  journalName: z.string().min(2, 'Journal name is required'),
  doi: z.string().optional(),
  issn: z.string().optional(),
  indexedIn: z.string().optional(),
  impactFactor: z.number().positive().optional(),
  year: yearSchema,
  facultyId: z.string(),
});

export type JournalFormData = z.infer<typeof journalSchema>;

// Conference validation schema
export const conferenceSchema = z.object({
  paperSno: z.string().min(1, 'Paper S.No is required'),
  authorDetails: z.string().min(2, 'Author details are required'),
  paperTitle: z.string().min(2, 'Paper title is required'),
  conferenceName: z.string().min(2, 'Conference name is required'),
  publisher: z.string().optional(),
  doiOrUrl: urlSchema,
  indexedIn: z.string().optional(),
  year: yearSchema,
  facultyId: z.string(),
});

export type ConferenceFormData = z.infer<typeof conferenceSchema>;

// Book validation schema
export const bookSchema = z.object({
  authorName: z.string().min(2, 'Author name is required'),
  title: z.string().min(2, 'Title is required'),
  bookTitle: z.string().optional(),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  year: yearSchema,
  facultyId: z.string(),
});

export type BookFormData = z.infer<typeof bookSchema>;

// Patent validation schema
export const patentSchema = z.object({
  patentTitle: z.string().min(2, 'Patent title is required'),
  patentNumber: z.string().optional(),
  authors: z.string().min(2, 'Authors are required'),
  status: z.nativeEnum(PatentStatus),
  country: z.string().min(2, 'Country is required'),
  year: yearSchema,
  link: urlSchema,
  facultyId: z.string(),
});

export type PatentFormData = z.infer<typeof patentSchema>;

// NPTEL Course validation schema
export const nptelSchema = z.object({
  courseName: z.string().min(2, 'Course name is required'),
  instructorName: z.string().min(2, 'Instructor name is required'),
  platformLink: urlSchema,
  completionYear: yearSchema,
  certificateUrl: urlSchema,
  duration: z.string().min(1, 'Duration is required'),
  facultyId: z.string(),
});

export type NPTELFormData = z.infer<typeof nptelSchema>;

// Award validation schema
export const awardSchema = z.object({
  awardName: z.string().min(2, 'Award name is required'),
  awardingBody: z.string().min(2, 'Awarding body is required'),
  year: yearSchema,
  details: z.string().optional(),
  link: urlSchema,
  facultyId: z.string(),
});

export type AwardFormData = z.infer<typeof awardSchema>;