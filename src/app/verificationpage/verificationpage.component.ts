import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verificationpage',
  templateUrl: './verificationpage.component.html',
  styleUrls: ['./verificationpage.component.css']
})
export class VerificationpageComponent{
id="";
check=false;
  constructor(private router: Router ,private http: HttpClient,
    private route: ActivatedRoute) {
  this.route.paramMap.subscribe((params: any) => {
    this.id = params?.get("id") || "";
    this.http.post(`${environment.url}/api/user/verify`,  {
     
      token:this.id
   
     },
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
        }),
      }).subscribe((res) =>{
        this.check=true;
        console.log("Email has been verified");
      });
  })}
  gotoDashboard(){
    this.router.navigate(['Dashboard']);
  }

}