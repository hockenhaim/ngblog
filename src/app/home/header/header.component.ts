import { Component, OnInit, DoCheck } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  hideHeader = false;
  constructor(private router: Router) { }

  public carouselTileItems: Array<any>;
  public carouselTile: NgxCarousel;
 
  ngOnInit(){

    this.carouselTileItems = [
      'https://i1.wp.com/www.desktopanimated.com/img/Preview/Charm_Aquarium_Preview.jpg?resize=600%2C400',
      'http://www.mulierchile.com/golden-gate-wallpaper/golden-gate-wallpaper-009.jpg',
      'https://speckyboy.com/wp-content/uploads/2015/10/space-wallpaper.jpg',
      'http://www.golfian.com/wp-content/uploads/2016/06/Nice-Heaven-Background-Wallpaper-600x400.jpg',
      'https://i.pinimg.com/736x/d3/69/89/d369898ca441c0f332f075e0a91c2bcb--copacabana-rj-natural-wonders.jpg',
      'https://i.pinimg.com/originals/ee/ef/db/eeefdb93f7ef329e43b326f507926d12.jpg',
      'https://i.stack.imgur.com/sFTU3.jpg',
      'http://images.wookmark.com/187109_ocean-landscapes-night-moonlight-roads-3456x2304-wallpaper_wallpaperbeautiful_33.jpg',
      'https://www.thenakedscientists.com/sites/default/files/styles/featured_image/public/media/Pinatubo91_eruption_plume_06-12-91_1.jpg',
      'http://designsdeck.com/wp-content/uploads/2016/06/Beautiful-Colourful-Sunrise-On-A-Sea-And-Beach-Wallpaper.jpeg',
      'http://ginva.com/wp-content/uploads/2012/04/hd-nature-wallpapers-9.jpg',
      'https://img00.deviantart.net/c81e/i/2009/021/3/c/clover_wallpaper_by_tanyarudman.jpg',
      'http://tree-pictures.com/golden-sunset.jpg',
      'https://www.wallpaperink.co.uk/gallery/shutterstock/Forest-Wall-Murals/Lime_Green_Forest_Wall_Mural.jpg',
      'http://www.kafkaesqueblog.com/wp-content/uploads/2014/09/pine-forest-wallpaper.jpg',
      'http://images4.fanpop.com/image/photos/15200000/Nature-Wallpaper-beauty-15286317-600-400.jpg',
      'http://www.djdesignerlab.com/wp-content/uploads/2012/11/winter_wallpaper_11.jpg',
      'http://www.mulierchile.com/golden-gate-wallpaper/golden-gate-wallpaper-009.jpg',
      'https://img00.deviantart.net/7908/i/2008/115/d/3/rune_wallpaper_by_tavenerscholar.jpg',
      'https://www.hongkiat.com/blog/wp-content/uploads/winter-wallpapers/winter-day.jpg',
    ];
 
    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 4, lg: 4, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
  }

  ngDoCheck() {
    if (this.router.url === '/') {
      this.hideHeader = false;
    } else {
      this.hideHeader = true;
    }
  }

 
}

