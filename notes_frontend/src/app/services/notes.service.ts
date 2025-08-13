import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor() {
    // Initialize with some sample notes
    this.addNote({
      title: 'Welcome Note',
      content: 'Welcome to your Notes App! Start creating notes to get organized.',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  searchNotes(query: string): Observable<Note[]> {
    return this.notesSubject.pipe(
      map(notes => notes.filter(note =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
      ))
    );
  }

  addNote(note: Omit<Note, 'id'>): void {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.notes = [...this.notes, newNote];
    this.notesSubject.next(this.notes);
  }

  updateNote(id: string, updates: Partial<Note>): void {
    this.notes = this.notes.map(note =>
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    );
    this.notesSubject.next(this.notes);
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
  }
}
