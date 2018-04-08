import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../../../commerce/commerce.service';
import { ImageDefaultTitle } from '../../../commerce/commerce';
import { TranslateService } from '@ngx-translate/core';

@Component({
	providers:[CommerceService],
  selector: 'admin-image-default-title',
  templateUrl: './image-title.component.html',
  styleUrls: ['./image-title.component.scss']
})
export class ImageDefaultTitleFormComponent implements OnInit {
	image_title:any = new ImageDefaultTitle();    
	
  constructor(private commerceServ:CommerceService, private translate:TranslateService ) { }

  ngOnInit() {
	  let self = this;
	  this.commerceServ.getImageDefaultTitle(1).subscribe((r)=>{
		  self.image_title = r;
	  },(err)=>{
	        self.image_title = new ImageDefaultTitle();	  
	  });
  }
  
  save(d){
	  let self = this;
	  this.commerceServ.saveImageDefaultTitle(d).subscribe((r)=>{
		  //self.title = r;
	  },(err)=>{
		  
	  });
  }

}
