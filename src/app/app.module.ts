import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/nav/header.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { DetailsComponent } from './components/details/details.component';
import { StatsComponent } from './components/stats/stats.component';
import { ExportComponent } from './components/utils/export/export.component';
import { ProjectComponent } from './components/project/project.component';

import { StatsService } from './services/stats.service';

import { MyDateRangePickerModule } from 'mydaterangepicker';
import { CapitalizePipe } from './capitalize.pipe';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    TableComponent,
    DetailsComponent,
    StatsComponent,
    ExportComponent,
    HomeComponent,
    CapitalizePipe,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDateRangePickerModule,
    routing
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
