import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("heading", { name: "MyBoard919829" }).click();
  await page.locator('input[name="board-title"]').click();
  await page.getByRole("button").nth(1).click();
  await page.getByText("Delete board").click();
  await page.getByRole("heading", { name: "MyBoard547395" }).click();
  await page.getByRole("button").nth(1).click();
  await page.getByText("Delete board").click();
  await page.getByText("Board was deleted").click();
  await expect(
    page.getByRole("heading", { name: "MyBoard234543" })
  ).toBeVisible();
  await page.getByRole("heading", { name: "MyBoard234543" }).click();
  await page.getByRole("button").nth(1).click();
  await page.getByText("Delete board").click();
  await expect(page.getByText("Board was deleted")).toBeVisible();
  await page.goto("http://localhost:3000/");
});
