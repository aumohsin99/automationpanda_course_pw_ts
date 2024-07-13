import { test, expect } from "@playwright/test";

test("create a new board and add some items in it", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByPlaceholder("Name of your first board").click();
  await page.getByPlaceholder("Name of your first board").fill("Board 1");
  await page.getByPlaceholder("Name of your first board").press("Enter");
  await page.getByPlaceholder("Enter list title...").click();
  await page.getByPlaceholder("Enter list title...").fill("task 1");
  await page.getByPlaceholder("Enter list title...").press("Enter");
  await page.getByPlaceholder("Enter list title...").fill("let's go with 2nd");
  await page.getByPlaceholder("Enter list title...").press("Enter");
  await page
    .getByPlaceholder("Enter list title...")
    .fill("this is the 3rd one");
  await page.getByPlaceholder("Enter list title...").press("Enter");
});
