import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-screen',
  templateUrl: './verification-screen.component.html',
  styleUrls: ['./verification-screen.component.css']
})
export class VerificationScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  gotoPreferences(){
    this.router.navigate(['preference']);

} 
}
