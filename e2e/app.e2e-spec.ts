import {McmPage} from './app.po';

describe('mcm App', () => {
    let page: McmPage;

    beforeEach(() => {
        page = new McmPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
