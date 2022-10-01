describe('Todo E2E Testing', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  const newTask1 = 'Learning Javascript';
  const newTask2 = 'Learning Typescript';

  it('should navigate to home screen', async () => {
    await element(by.text('GET STARTED')).tap();
    await expect(element(by.id('home'))).toBeVisible();
  });

  it('should have empty task', async () => {
    await expect(element(by.id('empty-todo'))).toBeVisible();
  });

  it('should add new task', async () => {
    await element(by.text('+')).tap();
    await expect(element(by.id('text-input-task'))).toBeVisible();

    await element(by.id('text-input-task')).clearText();
    await element(by.id('text-input-task')).typeText(newTask1);

    await element(by.text('Save')).tap();
    await expect(element(by.text(newTask1))).toBeVisible();

    await element(by.text('+')).tap();
    await expect(element(by.id('text-input-task'))).toBeVisible();

    await element(by.id('text-input-task')).clearText();
    await element(by.id('text-input-task')).typeText(newTask2);

    await element(by.text('Save')).tap();
    await expect(element(by.text(newTask2))).toBeVisible();
  });

  it('should mark a new task as done', async () => {
    const el = await element(by.text(newTask2));
    await expect(el).toHaveId('not-done');

    await element(by.text(newTask2)).tap();
    await expect(el).toHaveId('done');
  });

  it('should delete a last task', async () => {
    await element(by.text(newTask1)).swipe('left');
    await expect(element(by.text('Delete'))).toBeVisible();
    await expect(element(by.text(newTask1))).not.toBeVisible();
  });
});
