import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  public ismore = false;


  public offerimg: string = "https://cms-assets.bajajfinserv.in/is/image/bajajfinance/vivo-y75-dancing-waves-min?scl=1&fmt=png-alpha";

  public offerimgs = ["https://rukminim2.flixcart.com/fk-p-flap/850/400/image/bc31f295f2809566.jpg?q=90",
    "https://cms-assets.bajajfinserv.in/is/image/bajajfinance/vivo-y75-dancing-waves-min?scl=1&fmt=png-alpha",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img17/Home/LA/Onamstore/XCM_Manual1187774_893568_IN-MA-Onam_1242x450_1567495679._CB1198675309_.jpg"
  ]

  constructor(public route:Router,public fetch:FetchService){

  }


  changeurl = setInterval(()=>{
    this.next()
  },3000)

  

  more(){
    this.ismore = !this.ismore
  }

  back(){
    this.ismore = !this.ismore
  }

  opencategory(){
    this.route.navigate(['category'])
  }

  openproduct(offerimgurl:string){
    this.fetch.product['imgurl'] = offerimgurl
    this.fetch.product['productname'] = "example"

    this.route.navigate(['productdetailview'])
  }

  next(){
    console.log("Next clicked")
    let index = this.offerimgs.indexOf(this.offerimg) + 1
    this.offerimg = this.offerimgs[index == this.offerimgs.length  ? 0 : index ]
  }

  productdetail(event:any,model:any){
    console.log(event)
    console.log(event.target.currentSrc)
    this.fetch.product['imgurl'] = event.target.currentSrc
    this.fetch.product['productname'] = model
    this.route.navigate(['productdetailview'])
    
  }
  ngOnDestroy(){
    clearInterval(this.changeurl)
  }
  
}
