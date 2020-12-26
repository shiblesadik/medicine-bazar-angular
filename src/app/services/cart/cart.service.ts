import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items: Map<string, number>;

  constructor(private storageService: StorageService) {
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
}
