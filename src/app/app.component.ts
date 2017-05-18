import { Component, ViewChild } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/nav/header.component';
@Component({
  selector: 'pd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(HomeComponent) homeComponent: HomeComponent;
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;
  showStats = true;

  title = 'Project Dashboard';

  toggleStatsBtn(event: boolean) {
    this.headerComponent.showStats = !event;

  }

  toggleStatsDash(event: boolean) {
    this.homeComponent.toggleStatsDash(event);
  }
}
