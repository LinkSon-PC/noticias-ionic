import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article = {
    publishedAt: '',
    title: '',
    url: '',
    source: {
      name: ''
    },

  };
  @Input() index: number = 0;

  constructor(
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService:StorageService
  ) { }

  ngOnInit() { }

  onClick() { }

  openArticle() {/* 
    if ( this.platform.is('ios') ||  this.platform.is('android')) {
      this.openBrowser(this.article.url);
    } */
    window.open(this.article.url, 'blank');
  }

  async onOpenMenu() {
    const articleInFavorite = this.storageService.articleInFavorite(this.article);

    const normalBts: ActionSheetButton[] = [
      {
        text: articleInFavorite? 'Remover favorito': 'Favorito',
        icon: articleInFavorite? 'heart':'heart-outline',
        handler: () => this.onToogleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      }
    ]

    const shareBtn = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    }

    /* if (this.platform.is('capacitor')) {
      normalBts.unshift(shareBtn);
    } */
    normalBts.unshift(shareBtn);


    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBts
    });

    await actionSheet.present();
  }

  onShareArticle() {
    const { title, source, url } = this.article

    

    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        title,
        source.name,
        '',
        url,
      )
    }else{
      if (navigator.share) {
        navigator.share({
          title: this.article.title,
          text: this.article.description,
          url: this.article.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }
      else{
        console.log('No se puede compartir porque no soporta')
      }
    }
  }

  onToogleFavorite() {
    this.storageService.saveOrRemove(this.article);
    console.log('favorite article');
  }

}
