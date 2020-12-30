import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {HttpService} from '../http/http.service';
import {AuthService} from '../auth/auth.service';
import {AngularFireStorage} from '@angular/fire/storage';

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
              private fireStorage: AngularFireStorage,
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

  public placeOrder(list: any, total: number, prescription: string): void {
    const fileId = 'prescription/' + Math.random().toString() + Date.now().toString();
    this.fireStorage.ref(fileId).putString(prescription, 'data_url')
      .then((snapshot: any) => {
        this.fireStorage
          .ref(fileId)
          .getDownloadURL()
          .subscribe((url: string) => {
            const medicines: any = [];
            list.forEach((i: any) => {
              const d: any = {
                id: i.id,
                count: i.count
              };
              medicines.push(d);
            });
            const order: any = {
              prescription: url,
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
          });
      });
  }
}
