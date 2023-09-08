import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  implements OnInit {
  @Input() article: Article = {
    publishedAt : '',
    title: '',
    url: '',
    source: {
      name:''
    },

  };
  @Input() index: number = 0;

  constructor(
          private iab:InAppBrowser,
          private platform:Platform
          ) { }

  ngOnInit() {}

  onClick(){}

  openArticle(){
    if ( this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create( this.article.url, 'blank' );
      browser.show();
      return;
    }

    window.open( this.article.url, 'blank');
  }

}
