import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';


@Component({
  selector: 'app-productdetailview',
  templateUrl: './productdetailview.component.html',
  styleUrls: ['./productdetailview.component.css']
})
export class ProductdetailviewComponent implements OnInit, OnDestroy {
  public productimg: any = {
    "imgurl": '',
    "productname": ''
  }
  public preview = false
  public isadded =false
  constructor(private route: ActivatedRoute, public fetch: FetchService, public router: Router) {

  }


  ngOnInit() {
    window.scrollTo(0, 0);
    console.log(localStorage.getItem("product"))
    this.productimg = !Object.values(this.fetch.product).includes("") ? this.fetch.product : JSON.parse(localStorage.getItem("product") as string)
    localStorage.setItem("product", JSON.stringify(this.productimg))
    console.log("init ", this.router.url)
  }

  productdetailview(event: any, title: string) {

    if (!this.productimg) {
      this.productimg = {}
      this.productimg['imgurl'] = event.target.currentSrc
      this.productimg['productname'] = title
      localStorage.setItem("product", JSON.stringify(this.productimg))

    } else {

      this.productimg['imgurl'] = event.target.currentSrc
      this.productimg['productname'] = title
      localStorage.setItem("product", JSON.stringify(this.productimg))
    }
    window.scrollTo(0, 0);


  }

  buy(product:any){
    product['price'] = 25000
    this.fetch.buy(product)
  }

  addToCart() {
    if (this.fetch.cartitems.length > 0) {
      let found = false;
      for (let element of this.fetch.cartitems) {
        if (element['imgurl'] === this.productimg['imgurl']) {
          element['count'] = element['count'] + 1;
          found = true; 
          break; 
        }
      }

      if (!found) {
        this.fetch.cartitems.push({ ...this.productimg, count: 1 ,price:25000,isselected:true});
      }
    } else {
      this.fetch.cartitems.push({ ...this.productimg, count: 1,price:25000,isselected:true });
    }
    this.isadded = true
  }
  
  viewcart(){
    this.router.navigate(['cart'])
  }
  topreview(){
    this.preview = !this.preview
  }

  ngOnDestroy() {
    console.log("destroy", this.router.url)
    this.productimg = this.fetch.product;
    localStorage.clear()
  }

}