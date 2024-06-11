import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Book } from '../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<any>('https://openlibrary.org/search.json?q=bestsellers').pipe(
      map(response => response.docs)
    );
  }

  getBookByISBN(isbn: string): Observable<Book> {
    return this.http.get<any>(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`).pipe(
      map(response => response[`ISBN:${isbn}`] as Book)
    );
  }
}