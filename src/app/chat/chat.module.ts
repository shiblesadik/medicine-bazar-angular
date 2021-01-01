import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat.component';
import {MessageComponent} from './message/message.component';
import {FormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
import {NgxImageCompressService} from 'ngx-image-compress';

@NgModule({
  declarations: [ChatComponent, MessageComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    AutosizeModule,
  ],
  providers: [
    NgxImageCompressService,
  ]
})
export class ChatModule {
}
