import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-nconditions',
  templateUrl: './terms-nconditions.component.html',
  styleUrls: ['./terms-nconditions.component.css']
})
export class TermsNconditionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
