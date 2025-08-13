import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NoteListComponent,
    NoteEditorComponent,
    SearchBarComponent
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary">
        <span>Simple Notes</span>
        <span class="toolbar-spacer"></span>
        <button mat-icon-button (click)="toggleEditor()">
          <mat-icon>{{ showEditor ? 'close' : 'add' }}</mat-icon>
        </button>
      </mat-toolbar>

      <app-search-bar></app-search-bar>

      <div class="content-container">
        @if (showEditor) {
          <app-note-editor></app-note-editor>
        } @else {
          <app-note-list></app-note-list>
        }
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .toolbar-spacer {
      flex: 1 1 auto;
    }
    .content-container {
      flex: 1;
      overflow-y: auto;
      background-color: #f5f5f5;
    }
    mat-toolbar {
      background-color: var(--primary-color);
      color: white;
    }
  `]
})
export class AppComponent {
  showEditor = false;

  toggleEditor() {
    this.showEditor = !this.showEditor;
  }
}
