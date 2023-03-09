import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private router: Router) { }
  SignupDetails:any={};
  name: any;
  email: any;
  phone: any;
  password: any;
  ngOnInit(): void {
  }
  eventonKey(event: any) {
    this.SignupDetails[event.target.name]=event.target.value;
    console.log( this.SignupDetails);
   }
  gotoSignupSecondPage(){
    localStorage.setItem('SignupDetails', JSON.stringify(this.SignupDetails))
    this.router.navigate(['Basic-Details']);

}
}
