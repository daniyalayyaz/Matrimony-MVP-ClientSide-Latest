import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { takeUntil } from 'rxjs';
import { AppService } from '../app.service';
import { LocalStorageItem } from '../helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from '../helpers/unsubscribe-handler';
import { User } from '../models/user.modal';

@Component({
  selector: 'app-blockedusers',
  templateUrl: './blockedusers.component.html',
  styleUrls: ['./blockedusers.component.css']
})
export class BlockedusersComponent   extends UnsubscribeHandelr implements OnInit {
  personList: any;
  constructor(private router: Router,
    private appService: AppService, private toasterservice: ToastrService) {

      super()
     }

  ngOnInit(): void {
    this.getblockuser();
  }
  gotoInterests() {
    this.router.navigate(['Interests']);
  }

  getblockuser(){
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if(loggedUser) {
    this.CurrentUser = JSON.parse(loggedUser);
    this.appService.getblockuser(this.CurrentUser._id).pipe(
      takeUntil(this.Unsubscribe$))
      .subscribe((persons) => 
        {
         
        
          this.personList=persons.data;
        
          console.warn(this.personList)
          if(this.personList.length>0)
          {
           this.toasterservice.success(`Record Found Successfully!`);
          }
          else{
            this.toasterservice.error("NO RECORD FOUND!");
  
          }
        }  
      
      );
      }
    

  }
  unblock(person:any){
    alert(person._id)
    this.blockuser(person._id)

  }
  blockuser(id:any) {
    // const userId = req.body.userId;
    // const blockedUserId = req.body.blockedUserId;
    let loggedUser = localStorage.getItem(LocalStorageItem.LOGGED_USER);
    if(loggedUser) {
      this.CurrentUser = JSON.parse(loggedUser);
      // var body={
      //   'userId':this.CurrentUser._id?.toString(),
      //   'blockedUserId':id.toString()
      // }
      // console.warn(body);
    this.appService.unblock(this.CurrentUser._id,id)
    .pipe(takeUntil(this.Unsubscribe$)).subscribe(response => {
     
      this.toasterservice.success("User Blocked Successfully!");
    })
  }
  }
}
