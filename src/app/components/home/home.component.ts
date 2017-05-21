import { Component, ViewChild, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { TableComponent } from '../../components/table/table.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { DetailsComponent } from '../../components/details/details.component';
import { IMyOptions } from 'mydaterangepicker';
import { IProject } from '../../shared/models/Iproject';
import { ISearchQs } from '../../shared/models/IsearchQs';
import { ProjectsService } from '../../services/projects.service';
import { StatsService } from '../../services/stats.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'pd-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.style.css'],
    providers: [ProjectsService]
})
export class HomeComponent implements OnInit {
    @ViewChild('resultsTable') resultsTable: TableComponent;

    allProjects: IProject[];
    tableValues: Array<any> = [];
    projDetails: IProject;
    queryString: ISearchQs;

    options: Object;

    showResultsTable = false;
    showProjDetails = false;
    showStatsDash = true;
    showZeroResults = false;

    constructor(private projectService: ProjectsService,
        private statsService: StatsService,
        private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.projectService.getAllProjects().subscribe(
            allProjects => {
                this.allProjects = allProjects;
                this.options = this.projectService.getDropdownOptions(this.allProjects);
            }
        );

        this.statsService.showStatsDash$.subscribe(statsShown => {
            this.showStatsDash = statsShown;
            if (this.showStatsDash) {
                this.toggleStatsDash(this.showStatsDash);
            }
        });

        if (this.activatedRoute.queryParams) {
            this.activatedRoute.queryParams.subscribe((params: ISearchQs) => {
                this.queryString = params;
                console.log(this.queryString);
            });
        }
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

    toggleStatsDash(showHide: boolean) {
        if (!showHide) {
            this.showStatsDash = false;
            this.statsService.toggleStatsDash(this.showStatsDash);
        } else {
            this.showResultsTable = false;
            this.showProjDetails = false;
            this.showZeroResults = false;
            this.showStatsDash = true;
        }

    }

    hideAll() {
        this.showResultsTable = false;
        this.showProjDetails = false;
        this.showZeroResults = false;
        this.showStatsDash = false;
    }

}
