import { BetAssessmentPage } from './app.po';

describe('bet-assessment App', () => {
  let page: BetAssessmentPage;

  beforeEach(() => {
    page = new BetAssessmentPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
