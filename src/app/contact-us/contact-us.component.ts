import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

//   ngOnInit(): void {
    
//     axios.get('http://localhost:1337/api/contactuses').then(response => {
//     console.log(response.data.data);
// });
//   }
  contacts:any = [];
  error :any= null ;

  async ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    try {
      const response = await axios.get('http://localhost:1337/api/contactuses');
      let obj = response.data
      this.contacts = obj.data[0].attributes
      console.log(this.contacts);
      
    } catch (error) {
      this.error = error;
    }
  }
  
}
