import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book | undefined;

  constructor(
    private booksService: BooksService,

    private activatedRoute: ActivatedRoute,
    
    private router: Router
  ) {}

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('isbn')
    if (!identifier) {
      this.router.navigateByUrl('/');
      return;
    }
    console.log('Identifier --->', identifier);

    this.booksService.getBookByISBN(identifier).subscribe(
      (book) => {
      if (!book){
        this.router.navigateByUrl('/');
        return;
      }

      this.book = book;
      console.log('Book --> ', this.book);
    });
  }
  }