describe('Theme E2E Testing', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should navigate to home screen', async () => {
    await element(by.text('GET STARTED')).tap();
    await expect(element(by.id('home'))).toBeVisible();
  });

  it('should change theme', async () => {
    await element(by.id('theme-tap')).tap();
    await expect(element(by.id('lottie-dark'))).toBeVisible();

    await element(by.id('theme-tap')).tap();
    await expect(element(by.id('lottie-light'))).toBeVisible();
  });
});
