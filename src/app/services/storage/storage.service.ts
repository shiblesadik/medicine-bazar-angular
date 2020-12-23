import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public isLogin: boolean;
  public jwt: string;
  public userData: any;

  constructor() {
    if (localStorage.jwt !== undefined) {
      this.jwt = localStorage.jwt;
      this.isLogin = true;
      this.userData = this.getUserData();
    } else {
      this.userData = null;
      this.jwt = null;
      this.isLogin = false;
    }
  }

  public setUserData(object: any): void {
    localStorage.userData = JSON.stringify(object);
  }

  public getUserData(): any {
    if (localStorage.userData === undefined) {
      return null;
    } else {
      return JSON.parse(localStorage.userData);
    }
  }

  public update(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public updateCart(obj: any): void {
    localStorage.cart = JSON.stringify(Array.from(obj.entries()));
  }

  public get(key: string): any {
    if (localStorage.key === undefined) {
      return null;
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  public getCart(): Map<string, number> {
    if (localStorage.cart === undefined) {
      return new Map<string, number>();
    }
    return new Map(JSON.parse(localStorage.cart));
  }

  public delete(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    this.jwt = null;
    this.userData = null;
    this.isLogin = false;
    const cart = localStorage.cart;
    localStorage.clear();
    localStorage.cart = cart;
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
    localStorage.jwt = this.jwt;
  }
}
