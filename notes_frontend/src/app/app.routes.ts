import { Routes } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';

export const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: 'new', component: NoteEditorComponent },
  { path: 'edit/:id', component: NoteEditorComponent },
];
