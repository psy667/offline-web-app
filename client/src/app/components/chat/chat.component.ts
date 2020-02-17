import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages$: Observable<any>;

  user = "anonymous";
  text = "";

  constructor(
      private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.messages$ = this.messagesService.getMessages()

  }

  handleSendMessage() {
    if(this.text.trim()){
      this.messagesService.sendMessage(this.user, this.text);
      this.text = "";
    }
  }

  handleUploadFile() {

  }
}
