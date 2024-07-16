import { test, expect } from "./fixtures/trello-test";

test.describe("Trello like board", () => {
  const boardName = "MyBoard";
  const listName = "ToDosList";

  test.beforeEach(async ({ request, getStartedPage }) => {
    await request.post("http://localhost:3000/api/reset");
    await getStartedPage.load();
    await getStartedPage.createFirstBoard(boardName);
  });

  test("should create first board", async ({ boardPage }) => {
    await boardPage.expectNewBoardLoaded(boardName);
  });

  test("should create first list in board", async ({ boardPage }) => {
    await boardPage.addList(listName);
    await expect(boardPage.listName).toHaveValue(listName);
  });

  test("add new cards to first list", async ({ boardPage }) => {
    await boardPage.addList(listName);
    await boardPage.addCardToList(0, "Task 1");
    await boardPage.addCardToList(0, "Task 2");
    await boardPage.addCardToList(0, "Task 3");

    //confirmation of tasks on page
    await expect(boardPage.cardsLocator).toHaveText([
      "Task 1",
      "Task 2",
      "Task 3",
    ]);
  });

  test("should navigate to home", async ({ boardPage, myBoardsPage }) => {
    await boardPage.goHome();
    await myBoardsPage.expectLoaded([boardName]);
  });
});
