describe('Welcome E2E Testing', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should navigate to home screen', async () => {
    await element(by.text('GET STARTED')).tap();
    await expect(element(by.id('home'))).toBeVisible();
  });

  it('should have home screen', async () => {
    await waitToNavigate(100);
    await expect(element(by.id('home'))).toBeVisible();
  });
});

const waitToNavigate = duration =>
  new Promise(resolve => setTimeout(() => resolve(), duration));
