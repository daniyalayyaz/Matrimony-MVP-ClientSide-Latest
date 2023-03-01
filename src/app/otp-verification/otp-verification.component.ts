import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import  firebase from "firebase/compat/app"

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit, AfterViewInit {
  Otpverification:any={};
  final:any;
  constructor(public afauth:AngularFireAuth , private http: HttpClient,private router: Router,private route: ActivatedRoute) { 

  }

  ngAfterViewInit(): void{
    console.log("Top ngAfterinit")
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container",{
      size:"invisible"
    })

    this.afauth.signInWithPhoneNumber("+923054055977", verify).then((result) => {

      this.final = result
    });
    console.log("ngAfterinit")
  }
  ngOnInit(): void {
  }

  onOtpChange(event: any) {
    this.Otpverification={
      otp:event
    }
   }

   ValidateOtp = () => {

    const email = {
      email:JSON.parse(localStorage.getItem('ContactDetails') as string).Email
    }
    if (this.Otpverification.otp === null || this.final === null) {
  
      console.log("Something Goes Wrong");
  
    }
  
    this.final
  
      .confirm(this.Otpverification.otp)
  
      .then((result:any) => {
        this.http.post<any>('{{environment.url}}/api/user/otpverify',email)
      })
  
      .catch((err:any) => {
  
        console.log("OTP Is incorrect");
  
      });
  
  };

   gotoDashboard(){
console.log('Otp verification')
console.log(this.Otpverification)
this.ValidateOtp()
this.router.navigate(['otp-verification']);

   }
}
