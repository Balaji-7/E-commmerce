import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public userinfo:any
  constructor(public fetch:FetchService,public route:Router){
    this.userinfo = this.fetch.userdetails.length ? this.fetch.userdetails :  JSON.parse(localStorage.getItem("userinfo") as string)
    localStorage.setItem("userinfo", JSON.stringify(this.userinfo))
    console.log("userdetails",this.userinfo)
  }
  update(){
    this.fetch.isupdate = true
    this.route.navigate(['userinfo']);
  }

  logout(){
    localStorage.clear()
    this.fetch.userdetails = []
    this.fetch.cartitems = []
    this.route.navigate(["home"])
  }

}
