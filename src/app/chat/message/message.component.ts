import {Component, OnInit, ViewChild, OnDestroy, ElementRef, Input} from '@angular/core';
import {ChatService} from '../../services/chat/chat.service';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  fullMessage: string;
  userId: string;
  messages: any = [];
  private chatHistory: any;

  @Input() docId: any;

  @ViewChild('content', {static: true}) private content: any;
  @ViewChild('myInput') myInputVariable: ElementRef;
  public image: string;
  public imageValidation: string;

  constructor(private chatsService: ChatService,
              private imageCompress: NgxImageCompressService,
  ) {
    this.userId = this.chatsService.userId;
  }

  ngOnInit(): void {
    console.log(this.docId);
    this.chatsService.docId = this.docId;
    this.chatsService.initChat(this.docId);
    this.fullMessage = '';
    this.chatHistory = this.chatsService.getMessageHistory()
      .subscribe((data: any) => {
        if (typeof data !== 'undefined') {
          this.messages = [];
          data.forEach((i: any) => {
            const message = i.payload.doc.data();
            this.messages.push(message);
          });
        }
      });
  }

  ngOnDestroy(): void {
    console.log('destroy called');
    this.chatHistory.unsubscribe();
  }

  public scrollToBottom(milSec: number = 0): void {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, milSec + 100);
  }

  public reset(): void {
    this.myInputVariable.nativeElement.value = '';
  }

  public async sendMessage(): Promise<any> {
    this.fullMessage = this.fullMessage.trim();
    if (this.fullMessage !== '' || (this.image !== undefined && this.image !== '')) {
      if (this.image === undefined || this.image === '') {
        await this.chatsService.sendMessage(this.fullMessage, 1);
      } else {
        await this.chatsService.sendAttachment(this.fullMessage, this.image);
      }
      this.fullMessage = '';
      this.image = '';
      this.reset();
    }
  }

  public selectAttachment(files: FileList): void {
    this.image = null;
    const mimeType = files[0].type.toString().substring(0, 5);
    if (mimeType !== 'image') {
      alert('Please select an image file');
    } else {
      const imageFile: File = files.item(0);
      // console.log('Before Corp: ', this.prescription);
      const quality: number = (50000 * 100) / imageFile.size;
      if (imageFile.size > 50000) {
        this.compress(imageFile, quality);
      }
    }
  }

  public async compress(file: File, quality: number): Promise<any> {
    const reader = new FileReader();
    reader.onload = async (result: any) => {
      this.imageCompress.getOrientation(file).then((orientation: any) => {
        this.imageCompress
          .compressFile(result.target.result, orientation, quality, quality)
          .then((compressedImage: any) => {
            console.log(this.imageCompress.byteCount(compressedImage));
            this.image = compressedImage;
          });
      });
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
