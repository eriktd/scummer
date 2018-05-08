import { ScummrPage } from './app.po';

describe('scummr App', () => {
  let page: ScummrPage;

  beforeEach(() => {
    page = new ScummrPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
