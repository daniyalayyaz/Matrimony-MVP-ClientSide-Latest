import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-residential-details',
  templateUrl: './residential-details.component.html',
  styleUrls: ['./residential-details.component.css']
})
export class ResidentialDetailsComponent implements OnInit {

  ResidentialDetails: any = {};
  CountrySelect: any = [];
  Province: any;
  HouseStatus: any;
  FuturePlanstoLiveIn: any;
  City: any;
  AnyOtherNationality: any;
  countries: any = [];

  constructor(private router: Router, private appService: AppService) {
    if (localStorage.getItem('ResidentialDetails') as string == 'null') {
      this.City = JSON.parse(localStorage.getItem('ResidentialDetails') as string).City
      this.AnyOtherNationality = JSON.parse(localStorage.getItem('ResidentialDetails') as string).AnyOtherNationality
      this.FuturePlanstoLiveIn = JSON.parse(localStorage.getItem('ResidentialDetails') as string).FuturePlanstoLiveIn
      this.HouseStatus = JSON.parse(localStorage.getItem('ResidentialDetails') as string).HouseStatus
      this.Province = JSON.parse(localStorage.getItem('ResidentialDetails') as string).Province
      this.CountrySelect = JSON.parse(localStorage.getItem('ResidentialDetails') as string).Country
    }
    else {
      this.City = localStorage.getItem('ResidentialDetails') && JSON.parse(localStorage.getItem('ResidentialDetails') as string).City
      this.AnyOtherNationality = localStorage.getItem('ResidentialDetails') && JSON.parse(localStorage.getItem('ResidentialDetails') as string).AnyOtherNationality
      this.FuturePlanstoLiveIn = localStorage.getItem('ResidentialDetails') && JSON.parse(localStorage.getItem('ResidentialDetails') as string).FuturePlanstoLiveIn
      this.HouseStatus = localStorage.getItem('ResidentialDetails') && JSON.parse(localStorage.getItem('ResidentialDetails') as string).HouseStatus
      this.Province = localStorage.getItem('ResidentialDetails') && JSON.parse(localStorage.getItem('ResidentialDetails') as string).Province
      this.CountrySelect = localStorage.getItem('ResidentialDetails') && JSON.parse(localStorage.getItem('ResidentialDetails') as string).Country
      this.ResidentialDetails = {
        City: this.City,
        AnyOtherNationality: this.AnyOtherNationality,
        FuturePlanstoLiveIn: this.FuturePlanstoLiveIn,
        HouseStatus: this.HouseStatus,
        Province: this.Province,
        country: this.CountrySelect,

      }
    }
  }
  ngOnInit(): void {
    this.getCountry();
  }

  getCountry() {
    this.appService.getCountry().subscribe((res: any) => {
      this.countries = res;
      console.log(this.countries);
      console.log(this.CountrySelect)

    })
  }

  // countries=["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]
  cities = ["Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Hyderabad", "Gujranwala", "Peshawar", "Rahim Yar Khan", "Quetta", "Muzaffarabad", "Battagram", "Kotli", "Islamabad", "Bahawalpur", "Sargodha", "Sialkot", "Sukkur", "Larkana", "Sheikhupura", "Bhimber", "Jhang Sadr", "Gujrat", "Mardan", "Malir Cantonment", "Kasur", "Mingora", "Dera Ghazi Khan", "Sahiwal", "Nawabshah", "Okara", "Mirpur Khas", "Chiniot", "Shahkot", "Kamoke", "Saddiqabad", "Burewala", "Jacobabad", "Muzaffargarh", "Muridke", "Shikarpur", "Hafizabad", "Kohat", "Tordher", "Jhelum", "Khanpur", "Khuzdar", "Dadu", "Gojra", "Mandi Bahauddin", "Tando Allahyar", "Daska Kalan", "Pakpattan", "Bahawalnagar", "Tando Adam", "Khairpur Mir's", "New Mirpur", "Chishtian", "Abbottabad", "Jaranwala", "Ahmadpur East", "Vihari", "Kamalia", "Kot Addu", "Khushab", "Wazirabad", "Dera Ismail Khan", "Chakwal", "Swabi", "Lodhran", "Nowshera Cantonment", "Charsadda", "Jalalpur Jattan", "Mianwali", "Chaman", "Kandhkot", "Hasilpur", "Arifwala", "Mianke Mor", "Attock City", "Chichawatni", "Bhakkar", "Kharian", "Layyah", "Kambar", "Moro", "Mian Channun", "Turbat", "Shahdad Kot", "Bhalwal", "Dipalpur", "Badin", "Pano Aqil", "Kotri", "Tando Muhammad Khan", "Harunabad", "Pattoki", "Chenab Nagar", "Kahror Pakka", "Gujar Khan", "Kot Malik Barkhurdar", "Chuchar-kana Mandi", "Toba Tek Singh", "Narowal", "Shorkot", "Shahdadpur", "Shabqadar", "Mansehra", "Shujaabad", "Haveli Lakha", "Lala Musa", "Mailsi", "Shakargarh", "Ghotki", "Sibi", "Jampur", "Sambrial", "Sanghar", "Hujra Shah Muqim", "Kabirwala", "Chunian", "Sangla Hill", "Haripur", "Nankana Sahib", "Pasrur", "Gwadar", "Rajanpur", "Rohri", "Zhob", "Matli", "Rawalakot", "Hadali", "Mirpur Mathelo", "Bannu", "Dullewala", "Hala", "Ratodero", "Jatoi Shimali", "Jauharabad", "Bat Khela", "Kot Radha Kishan", "Kahna Nau", "Mustafabad", "Chak Thirty-one -Eleven Left", "Talagang", "Taunsa", "Thatta", "Sarai Alamgir", "Usta Muhammad", "Kamra", "Umarkot", "Basirpur", "Sehwan", "Naushahra Virkan", "Fort Abbas", "Havelian", "Khairpur", "Dinga", "Ladhewala Waraich", "Khalabat", "New Badah", "Tank", "Kot Mumin", "Tandlianwala", "Chak Azam Sahu", "Loralai", "Jalalpur Pirwala", "Pabbi", "Chak Jhumra", "Renala Khurd", "Risalpur Cantonment", "Lakki", "Topi", "Hangu", "Pir Jo Goth", "Kundian", "Pir Mahal", "Khurrianwala", "Mehrabpur", "Pindi Bhattian", "Malakwal City", "Narang Mandi", "Malakwal", "Thul", "Pindi Gheb", "Zahir Pir", "Dunyapur", "Gambat", "Kashmor", "Alipur", "Naudero", "Pasni", "Sukheke Mandi", "Setharja Old", "Khewra", "Mamu Kanjan", "Sharqpur Sharif", "Digri", "Bhera", "Sakrand", "Tando Jam", "Raiwind", "Lalian", "Khairpur Tamewah", "Kharan", "Mehar", "Khangah Dogran", "Khairpur Nathan Shah", "Upper Dir", "Ghauspur", "Tangi", "Utmanzai", "Thal", "Minchianabad", "Garh Maharaja", "Jahanian Shah", "Mastung", "Mananwala", "Fazilpur", "Talamba", "Kunjah", "Jhawarian", "Nasirabad", "Nushki", "Sita Road", "Dijkot", "Sillanwali", "Kandiaro", "Zaida", "Kunri", "Kalat", "Daud Khel", "Mitha Tiwana", "Hazro City", "Dunga Bunga", "Aman Garh", "Karor", "Kot Diji", "Kalur Kot", "Murree", "Faqirwali", "Ahmadpur Sial", "Phalia", "Yazman", "Raja Jang", "Chak Five Hundred Seventy-five", "Pishin", "Chak One Hundred Twenty Nine Left", "Chawinda", "Ubauro", "Mithi", "Akora", "Zafarwal", "Kot Samaba", "Eminabad", "Kahuta", "Ranipur", "Kulachi", "Khanpur Mahar", "Hingorja", "Naukot", "Pind Dadan Khan", "Kanganpur", "Faruka", "Kotli Loharan", "Shahpur Chakar", "Talhar", "Pad Idan", "Kot Ghulam Muhammad", "Qadirpur Ran", "Bela", "Surkhpur", "Sook Kalan", "Dhoro Naro", "Khangarh", "Sarai Naurang", "Gharo", "Bhit Shah", "Matiari", "Dhanot", "Warah", "Lachi", "Baddomalhi", "Jand", "Dera Bugti", "Tharu Shah", "Naushahro Firoz", "Dajal", "Daur", "Bhopalwala", "Paharpur", "Bhan", "Mach", "Goth Radhan", "Uthal", "Kaleke Mandi", "Jiwani", "Johi", "Chhor", "Mangla", "Bhawana", "Shahr Sultan", "Jhol", "Sodhri", "Kalabagh", "Sinjhoro", "Kamar Mushani", "Kallar Kahar", "Chuhar Jamali", "Harnoli", "Sarai Sidhu", "Choa Saidan Shah", "Dadhar", "Darya Khan", "Daira Din Panah", "Garhiyasin", "Madeji", "Dokri", "Sobhodero", "Dalbandin", "Daulatpur", "Bhag", "Rasulnagar", "Shahpur", "Tando Bago", "Baffa", "Karak", "Garhi Khairo", "Lakhi", "Gadani", "Surab", "Rojhan", "Ormara", "Chamber", "Kalaswala", "Islamkot", "Liliani", "Bhiria", "Mirwah Gorchani", "Dhaunkal", "Daultala", "Diplo", "Kohlu", "Harnai", "Jandiala Sher Khan", "Daromehar", "Mankera", "Sanjwal", "Miro Khan", "Gilgit", "Kot Sultan", "Gahkuch", "Khadro", "Berani", "Begowala", "Tangwani", "Bozdar Wada", "Jati", "Rustam", "Darya Khan Marri", "Sohbatpur", "Doaba", "Mirpur Bhtoro", "Sann", "Samaro", "Barkhan", "Bandhi", "Karaundi", "Mirpur Sakro", "Adilpur", "Bagarji", "Goth Phulji", "Rajo Khanani", "Alik Ghund", "Dinan Bashnoian Wala", "Jam Sahib", "Kandiari", "Kadhan", "Goth Garelo", "Nazir Town", "Khadan Khak", "Pithoro", "Duki", "Nabisar", "Kario Ghanwar", "Mehmand Chak", "Mughalabad", "Bulri", "Shingli Bala", "Miran Shah", "Alizai", "Amirabad", "Kakad Wari Dir Upper", "Cherat Cantonement", "Keti Bandar", "Tando Mitha Khan"]

  eventonKey(event: any) {
    // console.log(event);
    console.log(event.target.value);
    // console.log(event.tagret.name);


    this.ResidentialDetails[event.target.name] = event.target.value;
    console.log(this.ResidentialDetails);
  }
  gotoSignupThirdPage() {
    this.router.navigate(['More-Personal-Details']);
  }
  gotoSignupSixthPage() {
    localStorage.setItem('ResidentialDetails', JSON.stringify(this.ResidentialDetails))
    console.log(JSON.parse(localStorage.getItem('ResidentialDetails') as string))
    this.router.navigate(['Professional-Details']);
  }


}
