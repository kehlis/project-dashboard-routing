import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DropdownComponent } from '../../components/dropdown/dropdown.compontent';
import { TableComponent } from '../../components/table/table.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { IMyOptions } from 'mydaterangepicker';

import { IProject } from '../../models/project.model';
import { ISearch, Search } from '../../models/search.model';

import { ProjectsService } from '../../services/projects.service';

@Component({
    selector: 'pd-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.style.css'],
    providers: [ProjectsService]
})
export class SearchComponent implements OnInit {

    @Input() projects: IProject[];
    @Input() dropdowns: Object;
    @Output() sendToTable: EventEmitter<IProject[]> = new EventEmitter();

    search: ISearch;

    options: Object;
    defaultDropdownVal = 'all';
    projsFound = [];
    projDetails;
    showDetails = false;
    showStats = true;
    zeroResults = false;

    private myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy',
        inline: false,
        openSelectorOnInputClick: true,
        width: '100%'

    };

    private modelCreate: string = null;
    private modelModified: string = null;

    constructor(private projectsService: ProjectsService) {

    }

    ngOnInit() {
        this.options = this.dropdowns;
    }

    onSearch(form: NgForm) {
        this.clearProjs();
        this.showStats = false;
        this.showDetails = false;
        // console.log(form);
        this.search = form.value;

        this.projsFound = this.projectsService.filterProjects(this.projects, this.search);

        this.sendToTable.emit(this.projsFound);


    }

    sendDetails(proj) {
        console.log(proj);
        this.showDetails = true;
        const details = proj;
        this.projDetails = details;
    }

    showStatsBox() {
        this.showStats = !this.showStats;
    }

    clearProjs() {
        this.projsFound = [];
        this.projDetails = [];
        this.zeroResults = false;
    }

}
