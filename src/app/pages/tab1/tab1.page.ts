import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll, {static:true}) infiniteSrcoll!: IonInfiniteScroll;

  public articles: Article[] = [];

  constructor(private newsService:NewsService) {}

  ngOnInit(){
    this.newsService.getTopHeadlines().subscribe(
      articles => {
        console.log(articles);
        this.articles.push(...articles);
      }
    )
  }

  loadData(){
    this.newsService.getTopHeadlinesByCategory('business', true).subscribe(
      articles => {
        if (articles.length === this.articles.length) {
          this.infiniteSrcoll.disabled = true;
          //event.target.disabled = true;
          return;
        }

        this.articles = articles;
        this.infiniteSrcoll.complete();
        //event.target.complete();
      }
    )
  }

}
