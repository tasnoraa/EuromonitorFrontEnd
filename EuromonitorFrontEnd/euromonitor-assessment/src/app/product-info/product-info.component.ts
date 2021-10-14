import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth-service/auth-service';
import { Book } from 'app/models/book';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  products: Book[] = [];
  productList: Book;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getBooks('token')
          .subscribe(
            (productsResponse: Book[]) => {
              console.log(productsResponse);
              this.products = productsResponse;
            }
          );
  }
}
