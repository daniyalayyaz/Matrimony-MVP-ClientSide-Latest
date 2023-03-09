import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { AppService } from '../app.service';
import { LocalStorageItem } from '../helpers/localStorageItem.enum';
import { UnsubscribeHandelr } from '../helpers/unsubscribe-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class  LoginComponent extends UnsubscribeHandelr implements OnInit {

  constructor(private router: Router,
    private toasterservice: ToastrService,
    private http: HttpClient, private appService: AppService
    ) {

      super()
    }

    
  ngOnInit(): void {
  
  }

  gotoSignupFirstPage(){
    this.router.navigate(['Create-Account']);
}
gotologinwithemail(){
  this.router.navigate(['loginwithemail']);
}
gotoDashboard(){
  this.router.navigate(['Dashboard']);
}
gotoVerification(){
  this.router.navigate(['Verification']);
}
  async loginwithgmail(){
 var res=await (await this.appService.signwithgmail());;
 if(res.user?.email!=null)
 {
  console.log(res.user?.email)
  const body = {
    email:res.user?.email,
    password: "122"
  };
  this.appService.Login(body).pipe(takeUntil(this.Unsubscribe$)).subscribe(res => {
    console.warn(res.user)
    if (res.user) {
      localStorage.setItem(LocalStorageItem.LOGGED_USER, JSON.stringify(res.user));
      this.toasterservice.success("User Saved Successfully");
      // if (this.data.requestToDelete = true) {
      //   this.open(this.mymodal);
      // }

      this.router.navigateByUrl(`Dashboard`);
      // this.packageshownotification()
      
    }
  },err=>{
    console.log(err.error.error);
    
    this.toasterservice.error(err.error.error);
    this.router.navigate(['Basic-Details']);
  }
  )}
  
 
 else
 {


  this.router.navigate(['Basic-Details']);
 }
 


}

}