import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase';
import {UserService} from '../user/user.service';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public docId: string;
  public userId: string;
  private dbRef: any;

  constructor(private userService: UserService,
              private db: AngularFirestore,
              private fireStorage: AngularFireStorage,
              private http: HttpClient,
              private httpService: HttpService,
  ) {
    if (this.userService.userData.userId !== undefined) {
      this.userId = this.userService.userData.userId;
    } else {
      this.userId = this.userService.userData.userId;
    }
    console.log(this.userId);
  }

  public getChatsList(): any {
    return this.db.collection('chats', ref => ref.where('customerId', '==', this.userId)).snapshotChanges();
  }


  public getChatsListOfDoctor(): any {
    return this.db.collection('chats', ref => ref.where('doctorId', '==', this.userId)).snapshotChanges();
  }

  public initChat(docId: string): void {
    this.docId = docId;
    this.dbRef = this.db.collection('/chats').doc(this.docId).collection('chat').ref;
  }

  public getMessageHistory(): any {
    return this.db
      .collection('/chats')
      .doc(this.docId)
      .collection('chat', ref => ref.orderBy('time'))
      .snapshotChanges();
  }


  public bindingMessage(fullMessage: string, type: number, url: string): any {
    let singleMessage: any;
    if (type === 1) {
      singleMessage = {
        userId: this.userId,
        type,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        seen: 0,
        message: fullMessage
      };
    } else {
      singleMessage = {
        userId: this.userId,
        type,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        message: fullMessage,
        seen: 0,
        url,
      };
    }
    return singleMessage;
  }

  public async sendMessage(fullMessage: string, type: number, file: string = null): Promise<any> {
    const singleMessage = this.bindingMessage(fullMessage, type, file);
    console.log(singleMessage);
    this.dbRef.add(singleMessage)
      .catch((error) => {
        // console.log('Error: ', error);
      });
  }

  public sendAttachment(fullMessage: any, image: string): void {
    const fileId = 'chats/' + this.docId + '/' + this.userId.toString() + Math.random().toString();
    this.fireStorage.ref(fileId).putString(image, 'data_url').then((snapshot) => {
      this.getDownloadUrl(fileId).subscribe((url: string) => {
        this.sendMessage(fullMessage, 2, url);
      });
    });
  }

  private getDownloadUrl(fileId: string): any {
    return this.fireStorage.ref(fileId).getDownloadURL();
  }

  public requestDoctor(): void {
    this.http.post(this.httpService.server + this.httpService.api.doctor.request,
      {headers: this.httpService.headers})
      .subscribe((data: any) => {
        if (data.status === 'success') {
          alert('Request Submitted');
        }
      });
  }

}
