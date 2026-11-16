import { randomBytes } from "node:crypto";

import { faker } from "@faker-js/faker";
import { expect, type Page, test } from "@playwright/test";

import { JOB_APPLICATIONS_FIXTURES } from "@/scripts/seeds/fixtures/job-applications.fixtures";

interface Credentials {
  name: string;
  email: string;
  password: string;
}

const createCredentials = (): Credentials => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const password = randomBytes(24).toString("base64url");

  return {
    name: `${firstName} ${lastName}`,
    email,
    password,
  };
};

const getRandomElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const USER_CREDENTIALS = createCredentials();
const JOB_APPLICATION = getRandomElement(JOB_APPLICATIONS_FIXTURES);

console.log("Random user for test:", USER_CREDENTIALS);
console.log("Random job application:", JOB_APPLICATION);

async function signIn(page: Page, credentials: Credentials) {
  const signInForm = page.getByRole("form", { name: "Sign In" });
  await signInForm.getByLabel("Email", { exact: true }).fill(credentials.email);
  await signInForm.getByLabel("Password", { exact: true }).fill(credentials.password);
  await signInForm.getByRole("button", { name: "Sign In", exact: true }).click();
  return signInForm;
}

async function signUp(page: Page, credentials: Credentials) {
  const signUpForm = page.getByRole("form", { name: "Sign Up" });
  await signUpForm.getByLabel("Name", { exact: true }).fill(credentials.name);
  await signUpForm.getByLabel("Email", { exact: true }).fill(credentials.email);
  await signUpForm.getByLabel("Password", { exact: true }).fill(credentials.password);
  await signUpForm.getByRole("button", { name: "Sign Up", exact: true }).click();
  return signUpForm;
}

test.skip("User visits the app and authenticates", async ({ page }) => {
  // Go to home page
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "A better way to track your job application." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Start for free", exact: true }).click();

  // Sign up
  await expect(page).toHaveURL(/\/sign-up$/);
  await signUp(page, USER_CREDENTIALS);

  // Redirect to dashboard page
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Job Hunt", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "Wish List",
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
  ]);

  // Sign out
  await page.getByRole("button", { name: "Open account menu", exact: true }).click();
  await page.getByRole("menuitem", { name: "Sign out" }).click();

  // Sign in
  await expect(page).toHaveURL(/\/sign-in$/);
  await signIn(page, USER_CREDENTIALS);

  // Redirect to dashboard page
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Job Hunt", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "Wish List",
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
  ]);
});

test.describe("Users interacts with the dashboard", () => {
  test.beforeEach("User authenticates", async ({ page }) => {
    // Go to dashboard page
    await page.goto("/dashboard");

    const accountMenu = page.getByRole("button", { name: "Open account menu", exact: true });
    await expect
      .poll(async () => {
        return new URL(page.url()).pathname === "/sign-in" || (await accountMenu.isVisible());
      })
      .toBe(true);

    // No need to authenticate
    if (new URL(page.url()).pathname === "/dashboard") {
      return;
    }

    // Sign in
    await page.goto("/sign-in");
    const signInForm = await signIn(page, USER_CREDENTIALS);

    const signInError = signInForm.getByRole("alert");
    await expect
      .poll(async () => {
        return new URL(page.url()).pathname === "/dashboard" || (await signInError.isVisible());
      })
      .toBe(true);

    if (new URL(page.url()).pathname !== "/dashboard") {
      // Sign up
      await page.goto("/sign-up");
      await signUp(page, USER_CREDENTIALS);
    }

    // Confirm dashboard page
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(accountMenu).toBeVisible();
  });

  test("User edits the board", async ({ page }) => {
    // Open update board dialog
    await page.getByRole("button", { name: "Edit board", exact: true }).click();
    const boardDialog = page.getByRole("dialog");
    await expect(
      boardDialog.getByRole("heading", { name: "Edit Board", exact: true }),
    ).toBeVisible();

    const nameField = boardDialog.getByRole("group").filter({ hasText: /^Name/ });
    const descriptionField = boardDialog.getByRole("group").filter({ hasText: /^Description/ });
    const nameInput = nameField.getByRole("textbox");
    const descriptionInput = descriptionField.getByRole("textbox");

    // Check before board is edited
    await expect(nameInput).toHaveValue("Job Hunt");
    await expect(descriptionInput).toHaveValue("Track your job applications");

    // Edit board
    await nameInput.fill("Job Tracker");
    await descriptionInput.fill("Track my job applications");
    await boardDialog.getByRole("button", { name: "Edit board", exact: true }).click();
    await expect(boardDialog).toBeHidden();

    // Check after board is edited
    await expect(page.getByRole("heading", { name: "Job Tracker", exact: true })).toBeVisible();
    await expect(page.getByText("Track my job applications", { exact: true })).toBeVisible();

    // Reload
    await page.reload();

    // Check after board is edited
    await expect(page.getByRole("heading", { name: "Job Tracker", exact: true })).toBeVisible();
    await expect(page.getByText("Track my job applications", { exact: true })).toBeVisible();
  });

  test("User adds, edits and deletes a column", async ({ page }) => {
    const columnHeadings = page.getByRole("heading", { level: 2 });
    await expect(columnHeadings.first()).toBeVisible();
    const initialColumnNames = await columnHeadings.allTextContents();

    // Create a column
    await page.getByRole("button", { name: "Add column", exact: true }).click();
    const createDialog = page.getByRole("dialog");
    const nameField = createDialog.getByRole("group").filter({ hasText: /^Name/ });
    await nameField.getByRole("textbox").fill("Not Interested");
    await createDialog.getByRole("combobox").nth(0).click();
    await page.getByRole("option", { name: "Heart Crack", exact: true }).click();
    await createDialog.getByRole("combobox").nth(1).click();
    await page.getByRole("option", { name: "Indigo", exact: true }).click();
    await createDialog.getByRole("button", { name: "Add column", exact: true }).click();

    const column = page
      .locator(".card-ui")
      .filter({ has: page.getByRole("heading", { name: "Not Interested", exact: true }) });
    await expect(column).toBeVisible();
    await expect(column).toHaveClass(/card-ui-indigo/);
    await expect(column.locator("svg.lucide-heart-crack")).toBeVisible();
    await expect
      .poll(() => columnHeadings.allTextContents())
      .toEqual([...initialColumnNames, "Not Interested"]);

    // Update the column color
    await column.getByRole("button").nth(2).click();
    await page.getByRole("menuitem", { name: "Edit column", exact: true }).click();
    const editDialog = page.getByRole("dialog");
    await editDialog.getByRole("combobox").nth(1).click();
    await page.getByRole("option", { name: "Fuchsia", exact: true }).click();
    await editDialog.getByRole("button", { name: "Edit column", exact: true }).click();
    await expect(column).toHaveClass(/card-ui-fuchsia/);

    // Move the column one position to the left
    await column.getByRole("button").first().click();
    await expect
      .poll(() => columnHeadings.allTextContents())
      .toEqual([
        ...initialColumnNames.slice(0, -1),
        "Not Interested",
        ...initialColumnNames.slice(-1),
      ]);

    // Delete the column
    await column.getByRole("button").nth(2).click();
    await page.getByRole("menuitem", { name: "Remove column", exact: true }).click();
    const deleteDialog = page.getByRole("dialog");
    await deleteDialog.getByRole("button", { name: "Remove column", exact: true }).click();
    await expect(column).toHaveCount(0);
    await expect.poll(() => columnHeadings.allTextContents()).toEqual(initialColumnNames);
  });

  test("User adds, edits and deletes a job application", async ({ page }) => {
    const wishList = page
      .locator(".card-ui")
      .filter({ has: page.getByRole("heading", { name: "Wish List", exact: true }) });

    // Create a job application in Wish List
    await wishList.getByRole("button", { name: "Add job application", exact: true }).click();
    const createDialog = page.getByRole("dialog");
    const companyField = createDialog.getByRole("group").filter({ hasText: /^Company/ });
    const positionField = createDialog.getByRole("group").filter({ hasText: /^Position/ });
    const locationField = createDialog.getByRole("group").filter({ hasText: /^Location/ });
    await companyField.getByRole("textbox").fill(JOB_APPLICATION.company);
    await positionField.getByRole("textbox").fill(JOB_APPLICATION.position);
    await locationField.getByRole("textbox").fill(JOB_APPLICATION.location ?? "");
    await createDialog.getByRole("spinbutton").nth(0).fill(String(JOB_APPLICATION.salary[0]));
    await createDialog.getByRole("spinbutton").nth(1).fill(String(JOB_APPLICATION.salary[1]));
    await createDialog.getByRole("textbox", { name: "URL" }).fill(JOB_APPLICATION.url ?? "");
    await createDialog.getByRole("button", { name: "Add job application", exact: true }).click();

    const jobApplicationHeading = page.getByRole("heading", {
      name: JOB_APPLICATION.position,
      exact: true,
    });
    const jobApplicationCard = jobApplicationHeading.locator(
      'xpath=ancestor::*[@data-slot="card"][1]',
    );
    await expect(jobApplicationCard).toBeVisible();
    await expect(wishList.getByRole("heading", { name: JOB_APPLICATION.position })).toBeVisible();

    // Increase the minimum and maximum salaries by 1000
    const updatedMinimumSalary = JOB_APPLICATION.salary[0] + 1000;
    const updatedMaximumSalary = JOB_APPLICATION.salary[1] + 1000;
    await jobApplicationCard.getByRole("button").nth(1).click();
    await page.getByRole("menuitem", { name: "Edit job application", exact: true }).click();
    const editDialog = page.getByRole("dialog");
    await editDialog.getByRole("spinbutton").nth(0).fill(String(updatedMinimumSalary));
    await editDialog.getByRole("spinbutton").nth(1).fill(String(updatedMaximumSalary));
    await editDialog.getByRole("button", { name: "Edit job application", exact: true }).click();

    const formatSalary = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    await expect(jobApplicationCard).toContainText(
      `${formatSalary.format(updatedMinimumSalary)} - ${formatSalary.format(updatedMaximumSalary)}`,
    );

    // Move the job application to Rejected
    await jobApplicationCard.getByRole("button").nth(1).click();
    await page.getByRole("menuitem", { name: "Move to Rejected", exact: true }).click();
    const rejected = page
      .locator(".card-ui")
      .filter({ has: page.getByRole("heading", { name: "Rejected", exact: true }) });
    await expect(rejected.getByRole("heading", { name: JOB_APPLICATION.position })).toBeVisible();

    // Delete the job application
    await jobApplicationCard.getByRole("button").nth(1).click();
    await page.getByRole("menuitem", { name: "Remove job application", exact: true }).click();
    const deleteDialog = page.getByRole("dialog");
    await deleteDialog.getByRole("button", { name: "Remove job application", exact: true }).click();
    await expect(jobApplicationHeading).toHaveCount(0);
  });
});
