import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IProject } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { ExportComponent } from '../../components/utils/export/export.component';

@Component({
    selector: 'pd-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.style.css']
})
export class DetailsComponent implements OnInit {
    @Input() project: IProject;
    @Input() projects: IProject[];

    options: Object;
    editProjDetails: IProject;
    editForm = false;
    formSaved = false;

    constructor(private projectsService: ProjectsService) { }

    ngOnInit() {
        this.options = this.projectsService.getDropdownOptions(this.projects, false);
    }

    setEditDetails() {
        const editDetails = this.project;
        editDetails.status = this.projectsService.capitalizeFirstLetter(editDetails.status);
        this.editProjDetails = editDetails;
    }

    resetEdit() {
        this.project = this.editProjDetails;
    }

    // use the ProjectsService to update the form on the backend
    updateProject(form: NgForm) {

        this.formSaved = true;

        // Angular animation would be more cool here
        setTimeout(() => {
            this.formSaved = false;
        }, 3000);

        this.editForm = false;
        const updatedProject = <IProject>form.value;
        updatedProject.modified = this.createModifiedDate();
        this.projectsService.updateProject(updatedProject);

    }
    
    createModifiedDate() {
        const date = new Date();
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }
}
