import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../../services/messages.service";
import {Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";

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
    this.messagesService.getMessages()
        .subscribe(r => {
          this.messages$ = r.data.messages;
            }
        )
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
