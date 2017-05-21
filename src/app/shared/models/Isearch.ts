import { IDateRange } from './IdateRange';

export interface ISearch {
    title: string;
    createdRange: IDateRange;
    modifiedRange: IDateRange;
    budget: number;
    division: string;
    project_owner: string;
    status: string;
}
