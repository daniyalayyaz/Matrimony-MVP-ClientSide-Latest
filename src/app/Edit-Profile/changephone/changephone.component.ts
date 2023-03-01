import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changephone',
  templateUrl: './changephone.component.html',
  styleUrls: ['./changephone.component.css']
})
export class ChangephoneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
}
