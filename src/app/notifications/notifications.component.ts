import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { LocalStorageItem } from '../helpers/localStorageItem.enum';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notification: any =[];
  CurrentUser: any;
  latest:any = [];
  earlier:any =[];
  allNotification: any;

  constructor(private router: Router,
    private toasterservice: ToastrService,
    private appService: AppService) { }

  ngOnInit(): void {
   
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if (loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);
    }
    // this.showNotification();
    this.showAllNotification();
  }
  // showNotification(){
  //   this.appService.showNotificationById(this.CurrentUser._id).subscribe((res:any)=>{
  //     console.log(res);
  //     this.notification = res;
  //   });
  // }
  showAllNotification(){
    this.appService.showNotification(this.CurrentUser._id).subscribe((res:any)=>{
      console.log(res);
      this.allNotification = res;
      this.latest = res.filter((noti:any)=>noti.view)
      this.earlier = res.filter((noti:any)=>!noti.view)
      // this.earlier.sort((a: any, b: any) => {
      //   return b-a;
      // });;
      // this.latest.sort((a: any, b: any) => {
      //   return b-a;
      // });;
    });
  }
  nothicationUpdateMany(id:any){
    this.appService.nothicationUpdateMany(id).subscribe((res:any)=>{
      console.log(res);

    })
  }
  render(obj:any){
    console.log("hello");
    console.log(obj);
    if(obj.description.includes("package")){
      this.router.navigate(['Subscribe']);
      this.nothicationUpdateMany(obj._id)
    }if(obj.description.includes("Sent You intrest")){
      this.router.navigate(['Interests']);
      this.nothicationUpdateMany(obj._id)
    }if(obj.description.includes("Sent You Message")){
      this.appService.letschat(this.CurrentUser._id, obj.senderId).subscribe((chat) => {
        this.router.navigate(['Chat/',chat._id ]);
        this.nothicationUpdateMany(obj._id)
      });
    }
  }
}
