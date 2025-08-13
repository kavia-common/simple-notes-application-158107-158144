import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="notes-list">
      @for (note of notes; track note.id) {
        <mat-card class="note-card" (click)="selectNote(note)">
          <mat-card-header>
            <mat-card-title>{{ note.title }}</mat-card-title>
            <mat-card-subtitle>
              Last updated: {{ note.updatedAt | date:'short' }}
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ note.content | slice:0:100 }}{{ note.content.length > 100 ? '...' : '' }}</p>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-icon-button color="warn" (click)="onDeleteNote(note.id); $event.stopPropagation()">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      }
      @if (notes.length === 0) {
        <div class="empty-state">
          <p>No notes found. Click the + button to create one.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .notes-list {
      padding: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    .note-card {
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .note-card:hover {
      transform: translateY(-2px);
    }
    mat-card-content {
      margin-top: 8px;
    }
    .empty-state {
      text-align: center;
      padding: 32px;
      grid-column: 1 / -1;
      color: #666;
    }
  `]
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  private notesSubscription: Subscription | undefined;
  private readonly service: NotesService;

  constructor(notesService: NotesService) {
    this.service = notesService;
  }

  ngOnInit(): void {
    this.notesSubscription = this.service.getNotes().subscribe({
      next: (updatedNotes) => this.notes = updatedNotes,
      error: (error) => console.error('Error fetching notes:', error)
    });
  }

  ngOnDestroy(): void {
    this.notesSubscription?.unsubscribe();
  }

  selectNote(note: Note): void {
    console.log('Selected note:', note);
  }

  onDeleteNote(id: string | undefined): void {
    if (id) {
      this.service.deleteNote(id);
    }
  }
}
