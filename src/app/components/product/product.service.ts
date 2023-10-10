import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private readonly API = 'http://localhost:3000/products'

    constructor(private http: HttpClient) {}

    create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.API, product)
    }
    read(page: number, filter: string): Observable<Product[]> {
        const limit = 4
        let params = new HttpParams()
            .set("_page", page)
            .set("_limit", limit)

        if (filter.trim().length >= 3) {
            params = params.set("q", filter)
        }

        return this.http.get<Product[]>(this.API, { params })
    }
    update(product: Product): Observable<Product> {
        const url = `${this.API}/${product.id}`
        return this.http.put<Product>(url, product)
    }
    delete(id: number): Observable<Product> {
        const url = `${this.API}/${id}`
        return this.http.delete<Product>(url)
    }
    findById(id: number): Observable<Product> {
        const url = `${this.API}/${id}`
        return this.http.get<Product>(url)
    }
}