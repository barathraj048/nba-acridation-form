"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface Book {
  id: string;
  title: string;
  bookTitle?: string;
  authorName: string;
  publisher?: string;
  isbn?: string;
  year: number;
  faculty?: {
    name: string;
    department: string;
  };
}

export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error("Failed to load books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-500 mt-10">Loading books...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">
        All Faculty Books
      </h1>

      {books.length > 0 ? (
        books.map((book) => (
          <Card key={book.id} className="hover:shadow-md transition">
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
                  {book.faculty && (
                    <p>
                      <strong>Faculty:</strong> {book.faculty.name} ({book.faculty.department})
                    </p>
                  )}
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
            <p className="text-slate-600">No books found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
