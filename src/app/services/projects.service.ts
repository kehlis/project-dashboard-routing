import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IProject, Project } from '../models/project.model';
import { ISearch } from '../models/search.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {
    jsonData = './src/app/services/data.json';
    allProjects: IProject[];
    dropdownOptions;
    uniDivOptions = [];
    uniPoOptions = [];
    uniStatusOptions = [];
    addAll = true;

    constructor(private http: Http) { }

    // get all data in JSON file
    public getAllProjects(): Observable<IProject[]> {
        return this.http.get(this.jsonData)
            .map((res: Response) => res.json()
            );
    }

    public getProjectByTitle(title: string): Observable<IProject> {
        return this.http.get(this.jsonData)
            .map((res: Response) => {
                const projects = res.json();
                const project = projects.find(proj => proj.title.toLowerCase() === title.toLowerCase());
                // console.log(project);
                return project;
            });
    }

    public getDropdownOptions(projects: IProject[],
        addAll: boolean = true) {
        this.addAll = addAll;
        return this.createDropdownOptions(projects, ['project_owner', 'division', 'status']);

    }

    public updateProject(projToUpdate: IProject) {
        // this.http...
        // let project = new Project(projToUpdate);

        console.log('Project updated...');
        console.log(projToUpdate);
    }

    filterProjects(projects: IProject[], params: ISearch): IProject[] {
        let result = projects;

        if (params.title) {
            result = result.filter(

                p => p.title.toLowerCase().includes(params.title.toLowerCase())
            );
        }

        if (params.budget) {
            result = result.filter(
                p => p.budget <= (params.budget)
            );
        }

        if (params.division && params.division.toLowerCase() !== 'all') {
            result = result.filter(
                p => p.division.toLowerCase().includes(params.division.toLowerCase())
            );
        }

        if (params.project_owner && params.project_owner.toLowerCase() !== 'all') {
            result = result.filter(
                p => p.project_owner.toLowerCase().includes(params.project_owner.toLowerCase())
            );
        }

        if (params.status && params.status.toLowerCase() !== 'all') {
            result = result.filter(
                p => p.status.toLowerCase().includes(params.status.toLowerCase())
            );
        }

        if (params.createdRange) {

            const beginDate = new Date(params.createdRange.beginJsDate);
            const endDate = new Date(params.createdRange.endJsDate);

            for (let i = result.length - 1; i >= 0; i--) {

                const createdDate = new Date(result[i].created);

                if (createdDate > endDate || createdDate < beginDate) {
                    result.splice(i, 1);
                }
            };


        }

        if (params.modifiedRange) {

            const beginDate = new Date(params.modifiedRange.beginJsDate);
            const endDate = new Date(params.modifiedRange.endJsDate);

            for (let i = result.length - 1; i >= 0; i--) {

                let modifiedDate;
                if (result[i].modified !== null) {
                    modifiedDate = new Date(result[i].modified);

                    if (modifiedDate > endDate || modifiedDate < beginDate) {
                        result.splice(i, 1);
                    }
                } else if (result[i].modified === null) {
                    result.splice(i, 1);
                }

            };

        }

        return result;
    }

    // get array of projects and make dropdown lists out of necessary ones
    createDropdownOptions(arrProjs: IProject[], keys: Array<string>) {

        const divOptions = [];
        const projOwnOptions = [];
        const statusOptions = [];

        let allOptions = {};
        const option = {};
        keys.forEach(key => {

            const options = [];
            arrProjs.forEach(element => {

                options.push(element[key]);

            });
            option[key] = this.makeOptionsUnique(options);

        });
        allOptions = option;

        return allOptions;

    }

    // create value for table component
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

    public createArrByTopic(projects, topic) {
        const arrByTopic = [];

        projects.forEach(proj => {
            if (proj[topic].toLowerCase() === topic.toLowerCase()) {
                arrByTopic.push(proj[topic]);
            }
        });

        return arrByTopic;
    }

    // get rid of duplicate options
    public makeOptionsUnique(arrOptions) {
        const uniqueOptions = [];
        const uniqueArray = Array.from(new Set(arrOptions));
        uniqueArray.forEach((option) => {
            const displayOption = this.capitalizeFirstLetter(option);
            // let valueOption = this.removeSpaces(option);
            uniqueOptions.push({ value: displayOption, option: displayOption });
        });

        // Add 'all/All' to first selection of dropdown options
        // We don't want All for the details view
        if (this.addAll) {
            uniqueOptions.unshift({ value: 'all', option: 'All' });
        }
        return uniqueOptions;
    }

    public capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}
