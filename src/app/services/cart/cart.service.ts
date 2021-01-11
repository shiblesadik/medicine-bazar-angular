import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {HttpService} from '../http/http.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Cart} from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items: Map<string, Cart>;
  public confirmData: any;

  constructor(private storageService: StorageService,
              private http: HttpClient,
              private router: Router,
              private httpService: HttpService,
              private fireStorage: AngularFireStorage,
  ) {
    this.items = this.storageService.getCart();
  }

  public getAll(): any {
    return this.http.get(this.httpService.server + this.httpService.api.medicine.all);
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
    this.items = new Map<string, Cart>();
    this.storageService.updateCart(this.items);
  }

  public placeOrder(list: any, total: number, prescription: string, address: string): void {
    const fileId = 'prescription/' + Math.random().toString() + Date.now().toString();
    this.fireStorage.ref(fileId).putString(prescription, 'data_url')
      .then((snapshot: any) => {
        this.fireStorage
          .ref(fileId)
          .getDownloadURL()
          .subscribe((url: string) => {
            const order: any = {
              prescription: url,
              address,
              total,
              data: list
            };
            console.log(order);
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
          });
      });
  }
}
