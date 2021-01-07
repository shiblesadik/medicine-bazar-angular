import {Injectable} from '@angular/core';
import {HttpService} from '../http/http.service';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public deliveryman: any;

  constructor(private httpService: HttpService,
              private http: HttpClient,
              private db: AngularFirestore,
  ) {
  }

  public getData(url: string): any {
    return this.http.get(url, {headers: this.httpService.headers});
  }

  public getConsultation(): any {
    return this.http.get(this.httpService.server + this.httpService.api.doctor.request, {headers: this.httpService.headers});
  }

  public getDoctors(): any {
    return this.http.get(this.httpService.server + this.httpService.api.user.doctor, {headers: this.httpService.headers});
  }

  public permit(body: any): any {
    return this.http.post(this.httpService.server + this.httpService.api.doctor.permit, body, {headers: this.httpService.headers});
  }

  public createDoc(body: any): void {
    this.db.collection('chats').add(body);
  }

  public getDeliveryman(): void {
    this.http.get(this.httpService.server + this.httpService.api.user.deliveryman, {headers: this.httpService.headers})
      .subscribe((data: any) => {
        if (data.status === 'success') {
          this.deliveryman = data.data;
        }
      });
  }
}
