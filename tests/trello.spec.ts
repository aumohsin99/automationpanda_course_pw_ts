import { test, expect } from "@playwright/test";
import exp from "constants";
import { request } from "http";

test.beforeAll(async ({ request }) => {
  // I don't know what's going on here.
  // following the rat race
  await request.post("http://localhost:3000/api/reset");
});

test("Create a new board with a list and cards", async ({ page }) => {
  // board creation
  await page.goto("http://localhost:3000/");
  //await page.getByPlaceholder("Name of your first board").click();
  await page.getByPlaceholder("Name of your first board").fill("Board1");
  await page.getByPlaceholder("Name of your first board").press("Enter");

  // board created and loaded assertion
  await expect(page.locator('[name="board-title"]')).toHaveValue("Board1");
  await expect(page.getByPlaceholder("Enter list title...")).toBeVisible();
  await expect(page.locator('[data-cy="list"]')).not.toBeVisible();

  //await page.goto("http://localhost:3000/board/1");

  // list 1
  //await page.getByText("Add another list").click();

  // assertions to check if form for new list opened as expected
  await expect(page.getByPlaceholder("Enter list title")).toBeVisible();
  await expect(page.getByRole("button", { name: "Add list" })).toBeVisible();
  await expect(page.locator('[data-cy="cancel"]')).toBeVisible();

  // fill in the new values for list
  await page.getByPlaceholder("Enter list title").fill("list 1");
  await page.getByRole("button", { name: "Add list" }).click();

  // value shown on board
  await expect(page.locator('[data-cy="list-name"]')).toHaveValue("list 1");

  //getByText("Add another card");

  await expect(page.getByText("Add another card")).toBeVisible();
  await page.getByText("Add another card").click();

  // add some todo in card

  // import { test, expect } from "@playwright/test";

  await page.getByPlaceholder("Enter a title for this card...").fill("Task 1");
  await page.getByRole("button", { name: "Add card" }).click();

  await page.getByPlaceholder("Enter a title for this card...").fill("Task 2");
  await page.getByRole("button", { name: "Add card" }).click();

  await page.getByPlaceholder("Enter a title for this card...").fill("Task 3");
  await page.getByRole("button", { name: "Add card" }).click();

  //confirmation of tasks on page
  await expect(page.locator('[data-cy="card-text"]')).toHaveText([
    "Task 1",
    "Task 2",
    "Task 3",
  ]);

  await page.getByRole("navigation").getByRole("button").click();
  await page.getByRole("heading", { name: "Board1" }).click();
});
