import { ProjectDashboardPage } from './app.po';

describe('project-dashboard App', () => {
  let page: ProjectDashboardPage;

  beforeEach(() => {
    page = new ProjectDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
