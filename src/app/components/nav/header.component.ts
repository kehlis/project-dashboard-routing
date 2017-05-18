import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.style.css']
})
export class HeaderComponent {
    @Output() notifyHome: EventEmitter<boolean> = new EventEmitter();
    showStats = true;

    title = 'Project Dashboard';


    toggleStats(event: boolean) {
        this.notifyHome.emit(event);
    }
}
