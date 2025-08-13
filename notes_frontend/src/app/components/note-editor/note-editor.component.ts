import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule
  ],
  template: `
    <div class="note-editor">
      <mat-form-field class="title-field">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="currentNote.title" placeholder="Note title">
      </mat-form-field>

      <mat-form-field class="content-field">
        <mat-label>Content</mat-label>
        <textarea
          matInput
          [(ngModel)]="currentNote.content"
          placeholder="Write your note here..."
          rows="10"
        ></textarea>
      </mat-form-field>

      <div class="actions">
        <button mat-raised-button color="primary" (click)="saveNote()">
          <mat-icon>save</mat-icon>
          Save
        </button>
      </div>
    </div>
  `,
  styles: [`
    .note-editor {
      padding: 16px;
      max-width: 800px;
      margin: 0 auto;
    }
    .title-field,
    .content-field {
      width: 100%;
      margin-bottom: 16px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `]
})
export class NoteEditorComponent {
  currentNote: Note;
  private readonly service: NotesService;

  constructor(notesService: NotesService) {
    this.service = notesService;
    this.currentNote = this.createEmptyNote();
  }

  private createEmptyNote(): Note {
    return {
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  saveNote(): void {
    if (this.currentNote.title.trim() && this.currentNote.content.trim()) {
      this.service.addNote({ ...this.currentNote });
      this.currentNote = this.createEmptyNote();
    }
  }
}
