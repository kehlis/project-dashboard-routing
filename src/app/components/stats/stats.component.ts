import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TableComponent } from '../../components/table/table.component';
import { ExportComponent } from '../../components/utils/export/export.component';

import { IProject, Project } from '../../models/project.model';

import { ProjectsService } from '../../services/projects.service';
import { StatsService } from '../../services/stats.service';

@Component({
    selector: 'pd-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.style.css'],
    providers: [ProjectsService, StatsService]
})
export class StatsComponent implements OnInit {
    @Input() projects: IProject[];
    totalProjects: number;
    budgetSum: number;
    avgBudget: number;
    projOwners: Array<string>;
    projDivision: Array<string>;
    projStatus: Array<string>;
    options;

    constructor(private projectsService: ProjectsService,
        private statsService: StatsService) { }

    ngOnInit() {
        this.displayStats(this.projects);
    }

    displayStats(projects: IProject[]) {
        const budget = [];

        this.projects.forEach(proj => {
            if (proj.budget !== undefined) {
                budget.push(proj.budget);
            }
        });

        this.totalProjects = projects.length;
        this.budgetSum = this.statsService.getSum(budget);

        // let sum = this.budgetSum;
        // this.budgetSum = this.projectsService.addComma(this.budgetSum);

        // let avg = (this.budgetSum / budget.length);//.toFixed(2);
        this.avgBudget = (this.budgetSum / budget.length);
        // this.projectsService.addComma(avg);

        this.options = this.projectsService.getDropdownOptions(projects, false);

        this.projOwners = this.statsService.countProjects(projects, 'project_owner', this.options['project_owner']);
        this.projDivision = this.statsService.countProjects(projects, 'division', this.options['division']);
        this.projStatus = this.statsService.countProjects(projects, 'status', this.options['status']);

    }
}
