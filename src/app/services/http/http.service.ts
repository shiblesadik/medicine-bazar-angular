import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public authKey: any = environment.authKey;
  public server: string = environment.server;
  public api: any = environment.http;
  public authHeaders: any;
  public headers: any;

  constructor() {
    this.authHeaders = new HttpHeaders()
      .set('auth-secret-key1', this.authKey.AUTH_SECRET_KEY1)
      .set('auth-secret-key2', this.authKey.AUTH_SECRET_KEY2)
      .set('auth-secret-key3', this.authKey.AUTH_SECRET_KEY3)
      .set('auth-secret-key4', this.authKey.AUTH_SECRET_KEY4)
      .set('auth-secret-key5', this.authKey.AUTH_SECRET_KEY5);
  }

  public updateHeaders(jwt: string): void {
    this.headers = new HttpHeaders()
      .set('auth-secret-key1', this.authKey.AUTH_SECRET_KEY1)
      .set('auth-secret-key2', this.authKey.AUTH_SECRET_KEY2)
      .set('auth-secret-key3', this.authKey.AUTH_SECRET_KEY3)
      .set('auth-secret-key4', this.authKey.AUTH_SECRET_KEY4)
      .set('auth-secret-key5', this.authKey.AUTH_SECRET_KEY5)
      .set('Authentication', jwt);
  }

  public clearHeader(): void {
    this.headers = new HttpHeaders()
      .set('auth-secret-key1', this.authKey.AUTH_SECRET_KEY1)
      .set('auth-secret-key2', this.authKey.AUTH_SECRET_KEY2)
      .set('auth-secret-key3', this.authKey.AUTH_SECRET_KEY3)
      .set('auth-secret-key4', this.authKey.AUTH_SECRET_KEY4)
      .set('auth-secret-key5', this.authKey.AUTH_SECRET_KEY5);
  }
}
