import {Injectable} from '@angular/core';
import {HttpService} from '../http/http.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService: HttpService,
              private http: HttpClient,
              ) {
  }

  public getData(url: string): any {
    return this.http.get(url, {headers: this.httpService.headers});
  }
}
