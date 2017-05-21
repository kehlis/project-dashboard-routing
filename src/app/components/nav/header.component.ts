import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.style.css']
})
export class HeaderComponent implements OnInit {
    @Output() notifyHome: EventEmitter<boolean> = new EventEmitter();
    showStatsDash = true;

    title = 'Project Dashboard';

    constructor(private statsService: StatsService,
        private router: Router) {}

    ngOnInit() {
        this.statsService.showStatsDash$.subscribe(data => {
            this.showStatsDash = data;
        });
    }

    toggleStats() {
        this.showStatsDash = true;
        this.statsService.toggleStatsDash(this.showStatsDash);
    }
}
