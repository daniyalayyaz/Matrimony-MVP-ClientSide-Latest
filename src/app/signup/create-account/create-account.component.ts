import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private router: Router,
     private appService: AppService, 
     private toasterservice: ToastrService) { }
  SignupDetails:any={};
  name: any;
  email: any;
  phone: any;
  password: any;
  step1:any;
  loader:any;
  ngOnInit(): void {
  }
  eventonKey(event: any) {
    this.SignupDetails[event.target.name]=event.target.value;
    // console.log( this.SignupDetails);
   }
   Create_User() {
   
    const create_user = {
        name: this.SignupDetails.name,
        email: this.SignupDetails.email,
        phone: this.SignupDetails.phone,
        password: this.SignupDetails.password,
        step1: true,
    };

    this.appService.createProfile(create_user).subscribe((res) => {
            if (res.user) {    
                // localStorage.setItem(LocalStorageItem.LOGGED_USER, JSON.stringify(res.user));
                this.loader = false;
                this.toasterservice.success("Account Created Fill Next Detail.");
                localStorage.setItem('userId', JSON.stringify(res.user._id));
                this.toasterservice.success("Verification email has been sent to your provided email.");
                this.router.navigateByUrl(`Verification-Screen`);
                // this.router.navigate(['Basic-Details']);
                // this.router.navigateByUrl(`Verification-Screen`);
            } else if (res.id) {
              
                localStorage.setItem('userId', JSON.stringify(res.id));
                this.toasterservice.error("Email Already Register try Another");


                
            }
        },
        (error) => {
            this.loader = false;
            this.toasterservice.error(error.error.error);
        }
    );
}

  gotoSignupSecondPage(){
    this.Create_User()
    // localStorage.setItem('SignupDetails', JSON.stringify(this.SignupDetails))
    
  
  



}
}
