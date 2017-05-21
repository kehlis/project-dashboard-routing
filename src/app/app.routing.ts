import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';


const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'project/:title', component: ProjectComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
