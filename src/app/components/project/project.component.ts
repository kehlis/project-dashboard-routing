import { Component, OnInit } from '@angular/core';
import { IProject } from '../../shared/models/Iproject';
import { ProjectsService } from '../../services/projects.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'pd-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.style.css'],
    providers: [ProjectsService]
})
export class ProjectComponent implements OnInit {

    project: IProject;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private projectsService: ProjectsService) {
    }

    ngOnInit() {

        this.projectsService.getProjectByTitle(this.activatedRoute.snapshot.params['title'])
            .subscribe((proj: IProject) => {
                this.project = proj;
                console.log(this.project);
            });
    }

}
