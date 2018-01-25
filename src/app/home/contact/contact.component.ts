import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  zoom = 14;
  defaultUI = false;
  lat = 49.237680;
  lng = 28.445465;

  markers = [
	  {
		  lat: 49.233680,
		  lng: 28.469465,
		  label: 'SkyPark',
		  draggable: true
	  },
	  {
		  lat: 49.227680,
		  lng: 28.428565,
		  label: 'Megamoll',
		  draggable: false
	  },
	  {
		  lat: 49.227680,
		  lng: 28.445465,
		  label: 'Medical university',
		  draggable: true
	  }
  ]
  constructor() { }

  ngOnInit() {
  }

}
