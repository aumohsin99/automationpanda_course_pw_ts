import { expect, type Locator, type Page } from "@playwright/test";
export class BoardPage {
  readonly boardTitle: Locator;
  readonly listTitle: Locator;
  readonly list: Locator;
  readonly addListButton: Locator;
  readonly cancelButton: Locator;
  readonly listName: Locator;
  readonly addCard: Locator;
  readonly cardsLocator: Locator;
  readonly navigation: Locator;
  readonly board1: Locator;
  readonly addAnotherCard: Locator;
  readonly enterCardTitle: Locator;

  constructor(page: Page) {
    this.boardTitle = page.locator('[name="board-title"]');
    this.listTitle = page.getByPlaceholder("Enter list title...");
    this.list = page.locator('[data-cy="list"]');
    this.addListButton = page.getByRole("button", { name: "Add list" });
    this.cancelButton = page.locator('[data-cy="cancel"]');
    this.listName = page.locator('[data-cy="list-name"]');
    this.addAnotherCard = page.getByText("Add another card");
    this.enterCardTitle = page.getByPlaceholder(
      "Enter a title for this card..."
    );
    this.addCard = page.getByRole("button", { name: "Add card" });
    this.cardsLocator = page.locator('[data-cy="card-text"]');

    // I don't know how they are working. Just added them
    this.navigation = page.getByRole("navigation").getByRole("button");
    this.board1 = page.getByRole("heading", { name: "Board1" });
  }

  async expectNewBoardLoaded(name: string) {
    await expect(this.boardTitle).toHaveValue(name);
    await expect(this.listTitle).toBeVisible();
    await expect(this.list).not.toBeVisible();
  }

  async addList(name: string) {
    await this.listTitle.fill(name);
    await this.addListButton.click();
  }

  async addCardToList(listIndex: number, name: string) {
    await this.boardTitle.click();
    await this.addAnotherCard.nth(listIndex).click();
    await this.enterCardTitle.fill(name);
    await this.addCard.click();
  }

  async goHome() {
    await this.navigation.click();
  }
}
