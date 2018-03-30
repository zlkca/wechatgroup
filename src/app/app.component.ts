import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

//declare var $: any;
//declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { //implements OnInit {
    constructor(private translate: TranslateService){

      translate.setDefaultLang('cn');
      translate.use('cn');
      
      window.addEventListener("orientationchange", function() {
          window.location.reload();
      }, false);
    }

	// ngOnInit(){
	// 	document.addEventListener("deviceready", onDeviceReady, false);
	// 	function onDeviceReady(){
	// 		alert(device.platform);
	// 	}
	// }
}
