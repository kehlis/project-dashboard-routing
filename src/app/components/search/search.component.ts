import { Component, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { IMyOptions } from 'mydaterangepicker';
import { IProject } from '../../shared/models/Iproject';
import { ISearch } from '../../shared/models/Isearch';
import { ISearchQs } from '../../shared/models/IsearchQs';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';

@Component({
    selector: 'pd-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.style.css'],
    providers: [ProjectsService]
})
export class SearchComponent implements OnInit, AfterViewInit {

    @Input() projects: IProject[];
    @Input() urlParams: ISearchQs;
    @Input() dropdowns: Object;
    @Output() notifyTable: EventEmitter<IProject[]> = new EventEmitter();
    @ViewChild('searchForm') searchForm: NgForm;

    search: ISearch;
    queryString: ISearch;

    options: Object;
    modelCreate: Object;
    modelModified: Object;
    defaultDropdownVal = 'all';
    defaultStatusVal: string;
    defaultDivVal: string;
    defaultProjOwnVal: string;
    qsTitle: string;
    qsBudget: string;
    projsFound = [];
    allProjects: IProject[];
    projDetails;
    showPreFilledSearch = false;
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


    constructor(private projectsService: ProjectsService, private router: Router) {

    }

    ngOnInit() {

        this.options = this.dropdowns;
        this.allProjects = this.projects;
        if (!this.isEmptyObject(this.urlParams)) {
            this.setSearch(this.urlParams);
            this.showPreFilledSearch = true;

        }

    }

    ngAfterViewInit() {

        if (!this.isEmptyObject(this.urlParams)) {
            setTimeout(() => {
                this.searchForm.ngSubmit.emit();
            }, 0);
        }
    }

    onSearch(form: NgForm) {
        this.clearProjs();
        this.showStats = false;
        this.showDetails = false;

        if (!form.untouched || !this.isEmptyObject(form.value)) {
            this.search = form.value;
            this.createParams(this.search);
        } else {
            this.search = this.queryString;
            this.createParams(this.search);
        }

        this.projsFound = this.projectsService.filterProjects(this.allProjects, this.search);

        this.notifyTable.emit(this.projsFound);

    }

    setSearch(qs: ISearchQs) {

        if (qs.title) {
            this.qsTitle = qs.title;
        } else {
            this.qsTitle = '';
        }

        if (qs.project_owner) {
            this.defaultProjOwnVal = this.removeHyphen(qs.project_owner);
        } else {
            this.defaultProjOwnVal = this.defaultDropdownVal;
        }

        if (qs.division) {
            this.defaultDivVal = qs.division;
        } else {
            this.defaultDivVal = this.defaultDropdownVal;
        }

        if (qs.status) {
            this.defaultStatusVal = qs.status;
        } else {
            this.defaultStatusVal = this.defaultDropdownVal;
        }

        if (qs.createBegin && qs.createEnd) {
            const cBegin = new Date(qs.createBegin);
            const cEnd = new Date(qs.createEnd);

            this.modelCreate = {
                beginDate:
                { year: cBegin.getFullYear(), month: (cBegin.getMonth() + 1), day: cBegin.getDate() },
                endDate:
                {
                    year: cEnd.getFullYear(), month: (cEnd.getMonth() + 1),
                    day: cEnd.getDate()
                }
            };
        }

        if (qs.modBegin && qs.modEnd) {
            const mBegin = new Date(qs.modBegin);
            const mEnd = new Date(qs.modEnd);

            this.modelModified = {
                beginDate:
                { year: mBegin.getFullYear(), month: (mBegin.getMonth() + 1), day: mBegin.getDate() },
                endDate:
                {
                    year: mEnd.getFullYear(), month: (mEnd.getMonth() + 1),
                    day: mEnd.getDate()
                }
            };
        }

        if (qs.maxBudget) {
            this.qsBudget = qs.maxBudget.toString();
        } else {
            this.qsBudget = '';
        }

    }

    createParams(searchParams: ISearch) {
        let createBegin, createEnd, modBegin, modEnd, projOwner;

        if (searchParams.modifiedRange !== undefined && searchParams.modifiedRange !== null) {
            modBegin = this.getQueryStringDate(this.search.modifiedRange.beginJsDate);
            modEnd = this.getQueryStringDate(this.search.modifiedRange.endJsDate);
        }

        if (searchParams.createdRange !== undefined && searchParams.createdRange !== null) {
            createBegin = this.getQueryStringDate(this.search.createdRange.beginJsDate);
            createEnd = this.getQueryStringDate(this.search.createdRange.endJsDate);
        }

        if (searchParams.project_owner) {
            projOwner = this.hyphenSpace(this.search.project_owner);
        }

        this.router.navigate([''], {
            queryParams:
            {
                title: searchParams.title,
                division: searchParams.division,
                project_owner: projOwner,
                status: searchParams.status,
                maxBudget: searchParams.budget,
                createBegin: createBegin,
                createEnd: createEnd,
                modBegin: modBegin,
                modEnd: modEnd
            }
        });
    }

    showStatsBox() {
        this.showStats = !this.showStats;
    }

    getQueryStringDate(date: Date) {
        if (date !== null) {
            const formattedDate = new Date(date);
            return (formattedDate.getMonth() + 1) + '-' + formattedDate.getDate() + '-' + formattedDate.getFullYear();
        }
    }

    hyphenSpace(string: string) {
        return string.replace(' ', '-');
    }

    removeHyphen(string: string) {
        return string.replace('-', ' ');
    }

    isEmptyObject(obj: Object) {
        return (Object.keys(obj).length === 0);
    }

    clearProjs() {
        this.projsFound = [];
        this.projDetails = [];
        this.zeroResults = false;
    }

}
