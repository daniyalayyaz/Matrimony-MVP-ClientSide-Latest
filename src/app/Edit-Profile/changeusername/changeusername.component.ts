import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LocalStorageItem } from 'src/app/helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from 'src/app/helpers/unsubscribe-handler';

@Component({
  selector: 'app-changeusername',
  templateUrl: './changeusername.component.html',
  styleUrls: ['./changeusername.component.css']
})
export class ChangeusernameComponent   extends UnsubscribeHandelr  implements OnInit {

  constructor(private router: Router,
    private toasterservice: ToastrService, 
    private appService: AppService) {
      
    super()
   }
  name:string;
  confirmname:string;
  password:string;

  ngOnInit(): void {
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if(loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);
 
    
      //   case Gender.FEMALE:
      //     this.GetOnlineUsers(Gender.MALE);
      //     break;
      //   case Gender.MALE:
      //     this.GetOnlineUsers(Gender.FEMALE);
      //     break
      // }
      }
  }
  gotoEditProfile() {
    this.router.navigate(['Edit-Profile']);
  }
  gotoInterests() {
    this.router.navigate(['Interests']);
  }
  gotoEditPassword() {
    this.router.navigate(['Edit-Password']);
  }
  gotoEditUsername() {
    this.router.navigate(['Edit-Username']);
  }
  gotoEditPhone() {
    this.router.navigate(['Edit-Phone']);
  }
  gotoEditEmail() {
    this.router.navigate(['Edit-Email']);
  }
  gotoEditPhotos() {
    this.router.navigate(['Edit-Photos']);
  }
  changepassword(){
if(this.name!=this.confirmname)

{this.toasterservice.error("Name Not match!");

}
else{
  this.appService.changename(this.CurrentUser._id, this.confirmname)
    .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
     console.log(response)
      
      const body = {
        email: this.CurrentUser.email,
        password: "2233"
      };
      this.appService.Login(body).pipe(takeUntil(this.Unsubscribe$)).subscribe(res => {
        console.warn(res.user)
        if (res.user) {
          localStorage.setItem(LocalStorageItem.LOGGED_USER, JSON.stringify(res.user));
          this.toasterservice.success("Name Updated Successfully!");
          
        }
       })

      })}}
    




      

}

