import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {HttpService} from '../http/http.service';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items: Map<string, number>;
  public confirmData: any;

  constructor(private storageService: StorageService,
              private http: HttpClient,
              private router: Router,
              private httpService: HttpService,
  ) {
    this.items = this.storageService.getCart();
  }

  public updateCart(): void {
    this.storageService.updateCart(this.items);
  }

  public removeItem(key: string): void {
    this.items.delete(key);
    this.updateCart();
    this.items = this.storageService.getCart();
  }

  public clearAll(): void {
    this.items = new Map<string, number>();
    this.storageService.updateCart(this.items);
  }

  public placeOrder(list: any, total: number, prescription: File): void {
    const formData: FormData = new FormData();
    formData.append('prescription', prescription, prescription.name);
    this.http.post(this.httpService.server +
      this.httpService.api.order.upload,
      formData,
      {headers: this.httpService.headers})
      .subscribe((data: any) => {
        const medicines: any = [];
        list.forEach((i: any) => {
          const d: any = {
            id: i.id,
            count: i.count
          };
          medicines.push(d);
        });
        if (data.status === 'success') {
          const order: any = {
            prescription: data.url,
            address: this.storageService.userData.address,
            total,
            data: medicines
          };
          this.http.post(this.httpService.server +
            this.httpService.api.order.insert,
            order,
            {headers: this.httpService.headers})
            .subscribe((v: any) => {
              console.log(v);
              if (v.status === 'success') {
                this.router.navigate(['/medicine/all']);
                this.clearAll();
              }
            });
        }
      });
  }
}
