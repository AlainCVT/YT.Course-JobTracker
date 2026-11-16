import { randomUUID } from "node:crypto";

import { expect, type Locator, type Page, test } from "@playwright/test";

import { JOB_APPLICATIONS_FIXTURES } from "@/scripts/seeds/fixtures/job-applications.fixtures";

const jobApplication = JOB_APPLICATIONS_FIXTURES[0];
const updatedLocation = "Madrid, Spain (Remote)";
const updatedSalary = [65_000, 85_000];

type TestCredentials = {
  name: string;
  email: string;
  password: string;
};

function createCredentials(): TestCredentials {
  return {
    name: "Playwright Job Tracker",
    email: `playwright.${randomUUID()}@example.com`,
    password: `Playwright-${randomUUID()}!`,
  };
}

async function signUp(page: Page, credentials: TestCredentials) {
  await page.getByRole("textbox", { name: "Name" }).fill(credentials.name);
  await page.getByRole("textbox", { name: "Email" }).fill(credentials.email);
  await page.getByRole("textbox", { name: "Password" }).fill(credentials.password);
  await page.getByRole("button", { name: "Sign Up", exact: true }).last().click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Job Hunt" })).toBeVisible();
}

async function registerTestUser(page: Page) {
  await page.goto("/sign-up");
  await signUp(page, createCredentials());
}

const getColumn = (page: Page, name: string) => page.locator(".card-ui").filter({ hasText: name });

const getColumnNames = async (page: Page) =>
  (await page.locator(".card-ui").allInnerTexts()).map((text) => text.split("\n")[0]);

async function createNotInterestedColumn(page: Page): Promise<Locator> {
  await page.getByRole("button", { name: "Add column" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("textbox").first().fill("Not Interested");
  await dialog.getByRole("combobox", { name: "Icon *" }).click();
  await page.getByRole("option", { name: "Heart Crack", exact: true }).click();
  await dialog.getByRole("combobox", { name: "Color *" }).click();
  await page.getByRole("option", { name: "Indigo", exact: true }).click();
  await dialog.getByRole("button", { name: "Add column" }).click();

  const column = getColumn(page, "Not Interested");
  await expect(column).toHaveCount(1);
  await expect(column).toHaveClass(/card-ui-indigo/);
  await expect(column.locator("svg.lucide-heart-crack")).toHaveCount(1);
  return column;
}

async function updateAppliedColor(page: Page) {
  const applied = getColumn(page, "Applied");
  await applied.getByRole("button").nth(2).click();
  await page.getByRole("menuitem", { name: "Edit column" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("combobox").nth(1).click();
  await page.getByRole("option", { name: "Fuchsia", exact: true }).click();
  await dialog.getByRole("button", { name: "Edit column" }).click();
  await expect(applied).toHaveClass(/card-ui-fuchsia/);
}

function getJobCard(page: Page) {
  return page
    .getByRole("heading", { name: jobApplication.position, exact: true })
    .locator('xpath=ancestor::*[@data-slot="card"][1]');
}

test("user can sign up, sign out, and sign in", async ({ page }) => {
  const credentials = createCredentials();

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "A better way to track your job application." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Start for free" }).click();
  await signUp(page, credentials);

  await page.getByRole("button", { name: credentials.name[0], exact: true }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/sign-in$/);

  await page.getByRole("textbox", { name: "Email Email" }).fill(credentials.email);
  await page.getByRole("textbox", { name: "Password Password" }).fill(credentials.password);
  await page.getByRole("button", { name: "Sign In", exact: true }).last().click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Job Hunt" })).toBeVisible();
});

test("user can edit the board and customize columns", async ({ page }) => {
  await registerTestUser(page);

  await page
    .getByRole("heading", { name: "Job Hunt" })
    .locator("xpath=..")
    .getByRole("button")
    .click();
  const boardDialog = page.getByRole("dialog");
  await boardDialog.getByRole("textbox").nth(0).fill("Job Tracker");
  await boardDialog.getByRole("textbox").nth(1).fill("Track my job applications");
  await boardDialog.getByRole("button", { name: "Edit board" }).click();
  await expect(page.getByRole("heading", { name: "Job Tracker" })).toBeVisible();
  await expect(
    page.getByRole("paragraph").filter({ hasText: "Track my job applications" }),
  ).toBeVisible();

  const notInterested = await createNotInterestedColumn(page);
  await updateAppliedColor(page);

  await notInterested.getByRole("button").first().click();
  await expect
    .poll(() => getColumnNames(page))
    .toEqual(["Wish List", "Applied", "Interviewing", "Offer", "Not Interested", "Rejected"]);

  await page.reload();
  await expect(page.getByRole("heading", { name: "Job Tracker" })).toBeVisible();
  await expect(getColumn(page, "Applied")).toHaveClass(/card-ui-fuchsia/);
  await expect(getColumn(page, "Not Interested")).toHaveClass(/card-ui-indigo/);
});

test("user can create, edit, move, and delete a job application", async ({ page }) => {
  await registerTestUser(page);

  const notInterested = await createNotInterestedColumn(page);
  await notInterested.getByRole("button").first().click();
  await expect
    .poll(() => getColumnNames(page))
    .toEqual(["Wish List", "Applied", "Interviewing", "Offer", "Not Interested", "Rejected"]);

  await notInterested.getByRole("button", { name: "Add job application" }).click();
  const createDialog = page.getByRole("dialog");
  await createDialog.getByRole("textbox", { name: "Company *" }).fill(jobApplication.company);
  await createDialog.getByRole("textbox", { name: "Position *" }).fill(jobApplication.position);
  await createDialog
    .getByRole("textbox", { name: "Location *" })
    .fill(jobApplication.location ?? "");
  await createDialog.getByRole("spinbutton").nth(0).fill(String(jobApplication.salary[0]));
  await createDialog.getByRole("spinbutton").nth(1).fill(String(jobApplication.salary[1]));
  await createDialog.getByRole("textbox", { name: "URL" }).fill(jobApplication.url ?? "");
  await createDialog.getByRole("button", { name: "Add job application" }).click();

  const jobCard = getJobCard(page);
  await expect(jobCard).toBeVisible();

  await jobCard.getByRole("button").nth(1).click();
  await page.getByRole("menuitem", { name: "Edit job application" }).click();
  const editDialog = page.getByRole("dialog");
  await editDialog.getByRole("textbox", { name: "Location *" }).fill(updatedLocation);
  await editDialog.getByRole("spinbutton").nth(0).fill(String(updatedSalary[0]));
  await editDialog.getByRole("spinbutton").nth(1).fill(String(updatedSalary[1]));
  await editDialog.getByRole("button", { name: "Edit job application" }).click();
  await expect(jobCard).toContainText(updatedLocation);
  await expect(jobCard).toContainText("$65K - $85K");

  await jobCard.getByRole("button").nth(1).click();
  await page.getByRole("menuitem", { name: "Move to Wish List", exact: true }).click();
  await expect(
    getColumn(page, "Wish List").getByRole("heading", { name: jobApplication.position }),
  ).toBeVisible();

  await jobCard.getByRole("button").nth(1).click();
  await page.getByRole("menuitem", { name: "Remove job application" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Remove job application", exact: true })
    .click();
  await expect(page.getByRole("heading", { name: jobApplication.position })).toHaveCount(0);

  await notInterested.getByRole("button").nth(2).click();
  await page.getByRole("menuitem", { name: "Remove column" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Remove column" }).click();
  await expect(getColumn(page, "Not Interested")).toHaveCount(0);
});
