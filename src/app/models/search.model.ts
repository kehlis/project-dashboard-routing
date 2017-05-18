import { IDateRange } from './dateRange.model';

export interface ISearch {
    title: string;
    createdRange: IDateRange;
    modifiedRange: IDateRange;
    budget: number;
    division: string;
    project_owner: string;
    status: string;
}
export class Search implements ISearch {
    title: string;
    createdRange: IDateRange;
    modifiedRange: IDateRange;
    budget: number;
    division: string;
    project_owner: string;
    status: string;

    constructor(public searchParams: ISearch) {
        this.title = searchParams.title;
        this.createdRange = searchParams.createdRange;
        this.modifiedRange = searchParams.modifiedRange;
        this.budget = searchParams.budget;
        this.division = searchParams.division;
        this.project_owner = searchParams.project_owner;
        this.status = searchParams.status;
    }
}
