import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent  {
  public categorytitle :any = ''

  constructor(public fetch:FetchService,public route:Router,public router:ActivatedRoute){
    window.scrollTo(0, 0);
   this.categorytitle = this.router.snapshot.paramMap.get('category')
   console.log(this.categorytitle)

  }
  explore(event:any,productname:string){
    console.log(productname)
    console.log(event)
    this.fetch.product['productimg'] = event.target.currentSrc
    this.fetch.product['productname'] = productname
    this.route.navigate(['productdetailview'])
  }
  
  
}
