import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public isLogin: boolean;
  public jwt: string;
  public userData: any;

  constructor() {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== undefined && jwt !== null && jwt !== '') {
      this.jwt = jwt;
      this.isLogin = true;
      this.userData = this.getUserData();
    } else {
      this.userData = null;
      this.jwt = null;
      this.isLogin = false;
    }
  }

  public setUserData(object: any): void {
    localStorage.setItem('userData', JSON.stringify(object));
  }

  public getUserData(): any {
    const userData = localStorage.getItem('userData');
    if (userData === undefined) {
      return null;
    } else {
      return JSON.parse(userData);
    }
  }

  public update(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public updateCart(obj: any): void {
    localStorage.setItem('cart', JSON.stringify(Array.from(obj.entries())));
  }

  public get(key: string): any {
    const data = localStorage.getItem(key);
    if (data === undefined) {
      return null;
    } else {
      return JSON.parse(data);
    }
  }

  public getCart(): Map<string, number> {
    const cart = localStorage.getItem('cart');
    if (cart === undefined) {
      return new Map<string, number>();
    }
    return new Map(JSON.parse(cart));
  }

  public delete(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    this.jwt = null;
    this.userData = null;
    this.isLogin = false;
    const cart = this.getCart();
    localStorage.clear();
    this.updateCart(cart);
  }

  public login(data: any): void {
    this.isLogin = true;
    this.jwt = data.token;
    const userData = {
      userId: data.userId,
      phone: data.phone,
      username: data.username,
      role: data.role,
      token: this.jwt,
    };
    this.userData = userData;
    this.setUserData(data);
    localStorage.setItem('jwt', this.jwt);
  }

  public setTemp(value: string): void {
    localStorage.setItem('temp', JSON.stringify(value));
  }

  public getTemp(): string {
    const temp = localStorage.getItem('temp');
    if (temp === undefined) {
      return null;
    } else {
      return JSON.parse(temp);
    }
  }
}
