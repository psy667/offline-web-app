import {Component, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('messagesContainer') messagesContainer;
  user = "anonymous";
  text = "";
  file = null;

  constructor(
      private messagesService: MessagesService
  ) { }

  ngOnInit() {
    // this.messagesService.getMessages()
    //     .subscribe(r => {
    //       this.messages$ = r.data.messages;
    //       setTimeout(() => {
    //         this.messagesContainer.nativeElement.scrollTo(0, 1000);
    //       }, 0);
    //         }
    //     )
    this.loadData()
  }

  private async loadData() {
    await this.messagesService.refreshMessages().catch(() => {
      console.log('Cannot refresh messages from server');
    });;

    this.messagesService.getMessages().subscribe(result => {
      this.messages$ = result.data && result.data.messages;
      setTimeout(() => {
        this.messagesContainer.nativeElement.scrollTo(0, 1000);
      }, 0);
    });

  }

  handleSendMessage() {
    if(this.text.trim()){
      this.messagesService.sendMessage(this.user, this.text, this.file);
      this.text = "";
    }
  }

  handleUploadFile($event) {
    const files = $event.target.files;
    // console.log(files)
    this.file = files[0];
  }
}
