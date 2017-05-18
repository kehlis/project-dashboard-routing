import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DetailsComponent } from '../../components/details/details.component';
import { IProject } from '../../models/project.model';

@Component({
    selector: 'pd-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.style.css']
})
export class TableComponent implements OnInit {
    @Input() values: Array<any>;
    @Input() headers: Array<any>;
    @Input() keys: Array<string>;
    @Input() statsTable = false;
    @Output() sendToDetails: EventEmitter<IProject> = new EventEmitter();
    showDetails = false;

    ngOnInit() {

    }

    // TODO: rename this method, get should return a value. rename to emitDetails
    getDetails(proj: IProject) {
        this.sendToDetails.emit(proj);
    }

    createTableValues(array: Array<string>, keys: Array<string>) {
        // let results = [];
        // let result = {};

        // keys.forEach((key, index) => {
        //     result[key.toString()] = array[index];
        //     //array[index][key]
        //     results.push(result);
        // });
        // return Object.keys(array);
    }
}
