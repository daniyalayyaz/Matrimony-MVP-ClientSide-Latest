import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { AppService } from '../app.service';
import { RequestType } from '../enums/request.enum';
import { LocalStorageItem } from '../helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from '../helpers/unsubscribe-handler';
import { Message } from '../models/message.modal';
import { User } from '../models/user.modal';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.css']
})
export class MatchmakingComponent extends UnsubscribeHandelr  implements OnInit {
  personList: Array<User> = [];
  messagesList: Array<Message>;
  pathfemale: string = "../../assets/female.png";
  pathmessage: string = "../../assets/message.png";
  pathheart: string = "../../assets/pinkheart.png";
  pathmale: string = "../../assets/male.png"

  constructor(private router: Router,
    private toasterservice: ToastrService, 
    private appService: AppService) {
      super()
}

  ngOnInit(): void {

    document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if(loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);
     console.warn(this.CurrentUser)
      this.appService.Matchmaking(this.CurrentUser._id).pipe(
        takeUntil(this.Unsubscribe$))
        .subscribe((persons: Array<User>) => 
          {
            this.personList = [];
            this.personList = persons;
          }  
        );

      // switch(this.CurrentUser.gender) {
      //   case Gender.FEMALE:
      //     this.GetOnlineUsers(Gender.MALE);
      //     break;
      //   case Gender.MALE:
      //     this.GetOnlineUsers(Gender.FEMALE);
      //     break
      // }
  }
  

  }



  onSendInterestClick(person: User) {   
    this.appService.HandleRequest(this.CurrentUser._id, person._id, RequestType.SENDING)
    .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
      this.toasterservice.success("Interest Sent Successfully!");
    })
  }

  AddtoFavClick(person: User) {
    this.appService.AddRemoveFavourite(this.CurrentUser._id, person._id)
    .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
      this.toasterservice.success("Person has been added to Favourites Successfully!");
    })
  }
}
