import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LocalStorageItem } from 'src/app/helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from 'src/app/helpers/unsubscribe-handler';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent extends UnsubscribeHandelr implements OnInit {

  constructor(private router: Router,
    private toasterservice: ToastrService, 
    private appService: AppService) {
      
    super()
   }

   pass:string;
   confrimpass:string;
   oldpassword:string;

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
    if(this.oldpassword!=this.CurrentUser.password)
    
    {this.toasterservice.error("your password is incorrect!");
    
    }

    else if(this.pass!=this.confrimpass)
    
    {this.toasterservice.error("your password is incorrect!");
    
    }
    else{
      this.appService.changename(this.CurrentUser._id, this.confrimpass)
        .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
         console.log(response)
          
          const body = {
            email: this.CurrentUser.email,
            password: this.confrimpass
          };
          this.appService.Login(body).pipe(takeUntil(this.Unsubscribe$)).subscribe(res => {
            console.warn(res.user)
            if (res.user) {
              localStorage.setItem(LocalStorageItem.LOGGED_USER, JSON.stringify(res.user));
              this.toasterservice.success("Password Updated Successfully!");
              
            }
           })
    
          })}}
}
