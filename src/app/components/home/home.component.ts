import { Component, ViewChild, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';

import { SearchComponent } from '../../components/search/search.component';
import { TableComponent } from '../../components/table/table.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { DetailsComponent } from '../../components/details/details.component';

import { IMyOptions } from 'mydaterangepicker';

import { IProject } from '../../models/project.model';

import { ProjectsService } from '../../services/projects.service';

@Component({
    selector: 'pd-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.style.css'],
    providers: [ProjectsService]
})
export class HomeComponent implements OnInit {
    @ViewChild('resultsTable') resultsTable: TableComponent;
    @Output() notifyHeader: EventEmitter<boolean> = new EventEmitter();

    allProjects: IProject[];
    tableValues: Array<any> = [];
    projDetails: IProject;

    options: Object;

    showResultsTable = false;
    showProjDetails = false;
    showStatsDash = true;
    showZeroResults = false;

    constructor(private projectService: ProjectsService) {

    }

    ngOnInit() {
        this.projectService.getAllProjects().subscribe(
            allProjects => {
                this.allProjects = allProjects;
                this.options = this.projectService.getDropdownOptions(this.allProjects);
                console.log(this.allProjects);
            }
        );
    }

    handleResults(projs: IProject[]) {
        this.toggleStatsDash(false);

        if (projs.length > 1) {
            this.showResultsTable = true;
            this.tableValues = Array.from(projs);
        } else if (projs.length === 1) {
            this.showProjDetails = true;
            this.showResultsTable = false;
            this.projDetails = projs[0];
        } else {
            this.showZeroResults = true;
        }

    }

    handleProjSelect(proj: IProject) {
        this.showProjDetails = true;
        this.projDetails = proj;
    }

    createTableValues(array: Array<any>, keys: Array<any>) {
        const results = [];

        array.forEach((element, index) => {
            const result = {};
            keys.forEach((key) => {
                result[key] = element[key];
            });
            results.push(result);
        });

        return results;
    }

    toggleStatsDash(event: boolean) {
        this.hideAll();
        this.showStatsDash = event;

        this.notifyHeader.emit(!this.showStatsDash);

    }

    hideAll() {
        this.showResultsTable = false;
        this.showProjDetails = false;
        this.showZeroResults = false;
        this.showStatsDash = false;
    }
}
