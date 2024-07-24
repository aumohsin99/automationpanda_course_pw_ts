import { request, expect, type Locator, type Page } from "@playwright/test";
import { APIRequest } from "playwright";

export class MyBoardsPage {
  readonly page: Page;
  readonly myBoardsTitle: Locator;
  readonly newBoardButton: Locator;
  readonly newBoardName: Locator;
  readonly createBoardButton: Locator;
  private randomBoardLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myBoardsTitle = page.getByText("My Boards");
    this.newBoardButton = page.getByRole("heading", {
      name: "Create new board",
    });
    this.newBoardName = page.getByPlaceholder("Add board title");
    this.createBoardButton = page.getByRole("button", { name: "Create board" });
    //this.randomBoardLocator= page.getByRole("heading", { name?: hello})
    this.randomBoardLocator = this.page.locator("board");
  }

  async load() {
    await this.page.goto("http://localhost:3000/");
  }

  async createNewBoard() {
    const randomNumber = Math.trunc(Math.random() * 1000000);
    let boardName = "MyBoard" + `${randomNumber}`;

    await this.newBoardButton.click();
    await this.newBoardName.fill(boardName);
    await this.createBoardButton.click();
    return boardName;
  }

  async openBoard(boardName: string) {
    await this.page.getByText(boardName).click();
  }

  async openRandomBoard(index: number) {
    // this.randomBoardLocator = this.page.getByRole("heading", {
    //   name: "MyBoard919829",
    // });

    await this.randomBoardLocator.nth(index);
    //await this.page.randomBoardLocator.click();
    //await this.page.ra;

    //await this.page.getByText(boardName).click();

    //this.randomBoardLocator =
  }

  async expectLoaded(boardNames: string[]) {
    await expect(this.myBoardsTitle).toBeVisible();

    for (const name of boardNames) {
      await expect(this.page.getByText(name)).toBeVisible();
    }
  }
}
