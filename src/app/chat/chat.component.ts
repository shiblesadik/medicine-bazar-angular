import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatService} from '../services/chat/chat.service';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  docId: string;
  chatList: any = [];
  chatListSubscriber: any;
  openChat: boolean;
  role: string;

  constructor(private chatsService: ChatService, private userService: UserService) {
    this.openChat = false;
    this.role = this.userService.userData.role;
  }

  ngOnInit(): void {
    this.openChat = false;
    this.docId = '';
    this.chatsService.docId = '';
    this.chatListSubscriber = this.chatsService
      .getChatsList()
      .subscribe((data: any) => {
        this.chatList = [];
        data.forEach((i: any) => {
          const chat = i.payload.doc.data();
          const list: any = {
            id: i.payload.doc.id,
            customer: chat.customer,
            customerId: chat.customerId,
            doctor: chat.doctor,
            doctorId: chat.doctorId,
          };
          this.chatList.push(list);
        });
      });
  }

  ngOnDestroy(): void {
    this.openChat = false;
    this.chatListSubscriber.unsubscribe();
  }

  public selectChat(id: string): void {
    console.log(id);
    this.openChat = !this.openChat;
    this.docId = id;
    this.chatsService.docId = id;
  }
}
