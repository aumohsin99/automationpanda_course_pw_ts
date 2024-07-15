import exp from "constants";

import { request } from "http";

import { test, expect } from "./fixtures/trello-test";

test.beforeAll(async ({ request }) => {
  // I don't know what's going on here.
  // following the rat race
  await request.post("http://localhost:3000/api/reset");
});

// test('Create a new board with a list and cards', async ({ page }) => {

test("Create a new board with a list and cards", async ({
  getStartedPage,
  boardPage,
  myBoardsPage,
}) => {
  // POM Implementation
  //   const getStartedPage = new GetStartedPage(page);
  //   const boardPage = new BoardPage(page);
  //   const myBoardsPage = new MyBoardsPage(page);

  await getStartedPage.load();
  await getStartedPage.createFirstBoard("Board1");
  await boardPage.expectNewBoardLoaded("Board1");

  await boardPage.addList("list1");
  await expect(boardPage.listName).toHaveValue("list1");

  await boardPage.addCardToList(0, "Task 1");
  await boardPage.addCardToList(0, "Task 2");

  await boardPage.addCardToList(0, "Task 3");

  //confirmation of tasks on page
  await expect(boardPage.cardsLocator).toHaveText([
    "Task 1",
    "Task 2",
    "Task 3",
  ]);

  await boardPage.goHome();

  await myBoardsPage.expectLoaded(["Board1"]);
});
