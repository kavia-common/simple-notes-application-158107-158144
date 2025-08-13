import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotesService } from '../../services/notes.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule
  ],
  template: `
    <div class="search-bar">
      <mat-form-field appearance="outline">
        <mat-label>Search notes</mat-label>
        <input
          matInput
          type="text"
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearchQueryChanged($event)"
          placeholder="Search by title or content"
        >
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .search-bar {
      padding: 16px;
      max-width: 600px;
      margin: 0 auto;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class SearchBarComponent implements OnDestroy {
  searchQuery = '';
  private readonly searchSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();
  private readonly service: NotesService;

  constructor(notesService: NotesService) {
    this.service = notesService;
    this.initializeSearchSubscription();
  }

  private initializeSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (query) => {
        this.service.searchNotes(query).subscribe({
          next: () => console.log('Search completed for:', query),
          error: (error) => console.error('Search error:', error)
        });
      }
    });
  }

  onSearchQueryChanged(query: string): void {
    this.searchSubject.next(query);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject.complete();
  }
}
