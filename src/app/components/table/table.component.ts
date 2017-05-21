import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DetailsComponent } from '../../components/details/details.component';
import { IProject } from '../../shared/models/Iproject';

@Component({
    selector: 'pd-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.style.css']
})
export class TableComponent {
    @Input() values: Array<any>;
    @Input() headers: Array<any>;
    @Input() keys: Array<string>;
    @Input() statsTable = false;
    @Output() notifyDetails: EventEmitter<IProject> = new EventEmitter();
    showDetails = false;

    emitDetails(proj: IProject) {
        this.notifyDetails.emit(proj);
    }
}
