import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'matrimony-mvp-angular';
  constructor(private router: Router) {}

  gotoHome(){
    this.router.navigate(['/home']);
}
}
