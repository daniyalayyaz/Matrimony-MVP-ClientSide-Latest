import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import * as qs from 'qs';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  error: unknown;
  data: any;
  questionAnswer: any;
  divImages: any;
  obj: any;

  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await axios.get('http://localhost:1337/api/paragraphheadings');
      let obj = response.data
      this.data = obj.data[0].attributes
      console.log(this.data);
      
      
    } catch (error) {
      this.error = error;
    }
    
    try {
      const response = await axios.get('http://localhost:1337/api/frequentlyaskedquestions');
      let obj = response.data
      this.questionAnswer = obj.data[0].attributes
      // console.log(this.data);
      
    } catch (error) {
      this.error = error;
    }
    // 
    // try {
    //   const response = await axios.get('http://localhost:1337/api/divimages');
    //   let obj = response.data
    //   this.divImages = obj.data[0].attributes
    //   console.log(this.divImages);
      
    // } catch (error) {
    //   this.error = error;
    // }
    
    const query = qs.stringify({ 
      populate: '*',
      fields: '*',
      publicationState: 'live',
      locale: ['en','de'],
    }, {
      encodeValuesOnly: true, // prettify url
    });
    var baseUrl = "http://localhost:1337";

    const url =`${baseUrl}/api/divimages?${query}`;   
    
    this.obj = await axios.get(url);
    console.log(this.obj);
    
  }

  RedirectToLogin(){
    this.router.navigate(['Login']);
  }
  RedirectToSignup(){
    this.router.navigate(['Create-Account']);
  }
  
}
