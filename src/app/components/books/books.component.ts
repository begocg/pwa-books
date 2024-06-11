import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.interface';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { finalize } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    // Define la animación
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  currentView: 'cards' | 'table' = 'cards';
  displayedColumns: string[] = ['title', 'author'];
  loading: boolean = true;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService
    .getAllBooks()
    .pipe(
      finalize(() => { this.loading = false; })
    )
    .subscribe((books) => {
      this.books = books;
    });
}
  toggleView(view: 'cards' | 'table'): void {
    this.currentView = view;
  }
  navigateToBookDetail(isbn: string): void {
    this.router.navigate(['/book', isbn]);
  }
}
