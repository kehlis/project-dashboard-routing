import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IProject } from '../shared/models/Iproject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StatsService {
  showStatsDash = new Subject<boolean>();
  showStatsDash$ = this.showStatsDash.asObservable();

  constructor() { }

  getSum(numbers: any[]) {
    return numbers.reduce((total, amount) => total + amount);
  }

  // count projects given a topic, such as projects by project_owner
  countProjects(projects: IProject[], topic: string, options: any[]) {
    const result = [];

    options.forEach(option => {
      let count = 0;
      projects.forEach(proj => {
        if (proj[topic].toLowerCase() === option.option.toLowerCase()) {
          count++;
        }
      });
      result.push({ 'option': option.option, 'count': count });
    });

    // put highest count at the top
    result.sort((a, b) => b.count - a.count);

    return result;

  }

  toggleStatsDash(showStats: boolean) {
    this.showStatsDash.next(showStats);
  }

}
