import { test, expect, type Page } from "@playwright/test";
const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jG1sAAAAASUVORK5CYII=",
  "base64",
);
async function example(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: /Try an example/ }).click();
  await page
    .getByRole("button", {
      name: "Upload & show example feedback",
      exact: true,
    })
    .click();
  await expect(page.getByTestId("finding")).toHaveCount(15);
}
test("five perspectives, categories, filters, curation, report and back navigation", async ({
  page,
}) => {
  await example(page);
  for (const name of ["Things they like", "Their concerns", "Their questions"])
    await expect(
      page.getByRole("region", { name, exact: true }).getByTestId("finding"),
    ).toHaveCount(5);
  await page.getByRole("button", { name: "Maya", exact: true }).click();
  await expect(page.getByTestId("finding")).toHaveCount(3);
  await expect(page.getByText("Maya cares because…")).toBeVisible();
  await page
    .getByRole("button", { name: "Dismiss Maya concern", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Restore Maya concern", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Dismiss Maya concern", exact: true })
    .click();
  await page
    .getByLabel("Designer’s note")
    .fill("Keep the clear introduction. Check beginner expectations.");
  await page
    .getByLabel("Next steps", { exact: true })
    .fill("Test booking expectations with three real participants.");
  await page
    .getByRole("button", { name: "Preview report", exact: true })
    .click();
  await expect(
    page.getByText("14 selected comments", { exact: false }),
  ).toBeVisible();
  await expect(page.locator(".report-finding")).toHaveCount(14);
  await expect(
    page.getByText(
      "Keep the clear introduction. Check beginner expectations.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByText("Simulated feedback; not user research.", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Back to feedback", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Restore Maya concern", exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Designer’s note")).toHaveValue(
    "Keep the clear introduction. Check beginner expectations.",
  );
  await page
    .getByRole("button", { name: "Start a new review", exact: true })
    .click();
  await expect(page.getByTestId("finding")).toHaveCount(0);
  await expect(page.getByLabel("Who’s it for? Audience")).toHaveValue("");
  await expect(
    page.getByRole("button", {
      name: "Upload & show example feedback",
      exact: true,
    }),
  ).toBeDisabled();
});
test("rejects invalid files; previews and replaces a PNG locally; export is honest", async ({
  page,
}) => {
  await page.goto("/");
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.method() !== "GET") requests.push(r.url());
  });
  const input = page.getByLabel("Choose a design image");
  await input.setInputFiles({
    name: "bad.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("not an image"),
  });
  await expect(page.locator(".error-message")).toContainText(
    "Choose a PNG or JPG",
  );
  await input.setInputFiles({
    name: "oversized.png",
    mimeType: "image/png",
    buffer: Buffer.alloc(10 * 1024 * 1024 + 1),
  });
  await expect(page.locator(".error-message")).toContainText("too large");
  await input.setInputFiles({
    name: "broken.png",
    mimeType: "image/png",
    buffer: Buffer.from("bad PNG"),
  });
  await expect(page.locator(".error-message")).toContainText("couldn’t read");
  await input.setInputFiles({
    name: "design.png",
    mimeType: "image/png",
    buffer: png,
  });
  await expect(
    page.getByRole("img", { name: "Your selected UI design" }),
  ).toBeVisible();
  await input.setInputFiles({
    name: "revised.png",
    mimeType: "image/png",
    buffer: png,
  });
  await expect(page.getByText("revised.png", { exact: true })).toBeVisible();
  await page.getByLabel("Who’s it for? Audience").fill("New customers");
  await page.getByLabel("What should they do? Main task").fill("Book a class");
  await page
    .getByRole("button", {
      name: "Upload & show example feedback",
      exact: true,
    })
    .click();
  await expect(page.getByTestId("finding")).toHaveCount(15);
  await expect(
    page.getByText(
      /These prewritten comments describe the Little Studio sample, not your uploaded image/,
    ),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Preview report", exact: true })
    .click();
  await expect(page.locator(".report-disclosure")).toContainText(
    "NOT the uploaded image",
  );
  expect(requests.filter((url) => !url.includes("__nextjs"))).toEqual([]);
  await page.reload();
  await expect(
    page.getByRole("img", { name: "Your selected UI design" }),
  ).toHaveCount(0);
});
test("empty report stays useful and print output hides app controls", async ({
  page,
}, testInfo) => {
  await example(page);
  const dismissNames = await page
    .getByRole("button", { name: /^Dismiss / })
    .evaluateAll((buttons) =>
      buttons.map((button) => button.getAttribute("aria-label")!),
    );
  for (const name of dismissNames)
    await page.getByRole("button", { name, exact: true }).click();
  await page
    .getByLabel("Designer’s note")
    .fill("Only my own observations for this pass.");
  await page
    .getByRole("button", { name: "Preview report", exact: true })
    .click();
  await expect(
    page.getByText(/No comments selected. Your designer note/),
  ).toBeVisible();
  await page.emulateMedia({ media: "print" });
  await expect(
    page.getByRole("button", { name: "Print / Save as PDF" }),
  ).toBeHidden();
  await expect(page.locator(".report-document")).toBeVisible();
  await expect(page.locator(".report-document")).toHaveClass(/report-empty/);
  await expect(page.locator(".report-disclosure")).toBeVisible();
  await page.pdf({
    path: testInfo.outputPath("empty-report.pdf"),
    format: "A4",
    printBackground: true,
  });
});
test("simulated failure preserves brief and retry succeeds", async ({
  page,
}) => {
  await page.goto("/?demoError=1");
  await page.getByRole("button", { name: /Try an example/ }).click();
  await page
    .getByRole("button", {
      name: "Upload & show example feedback",
      exact: true,
    })
    .click();
  await expect(page.locator(".error-message")).toContainText(
    "simulated demo error",
  );
  await expect(page.getByLabel("What should they do? Main task")).toHaveValue(
    "Find a pottery workshop and book a first class",
  );
  await page
    .getByRole("button", { name: "Try example feedback again", exact: true })
    .click();
  await expect(page.getByTestId("finding")).toHaveCount(15);
});
test("mobile layout, keyboard filters and printed report", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await example(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Sam", exact: true }).press("Enter");
  await expect(page.getByTestId("finding")).toHaveCount(3);
  await expect(
    page.getByRole("button", { name: "Sam", exact: true }),
  ).toBeFocused();
  await page.screenshot({
    path: testInfo.outputPath("mobile-feedback.png"),
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Everyone 5", exact: true })
    .press("Enter");
  await page
    .getByRole("button", { name: "Preview report", exact: true })
    .click();
  await page.pdf({
    path: testInfo.outputPath("sample-report.pdf"),
    format: "A4",
    printBackground: true,
  });
  await expect(page.locator(".report-finding")).toHaveCount(15);
});
test("removing an image clears feedback and custom brief is required", async ({
  page,
}) => {
  await example(page);
  await page.getByRole("button", { name: "Remove image", exact: true }).click();
  await expect(page.getByTestId("finding")).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "Upload & show example feedback",
      exact: true,
    }),
  ).toBeDisabled();
  await page.reload();
  await page
    .getByLabel("Choose a design image")
    .setInputFiles({ name: "design.png", mimeType: "image/png", buffer: png });
  await page
    .getByRole("button", {
      name: "Upload & show example feedback",
      exact: true,
    })
    .click();
  await expect(page.getByTestId("finding")).toHaveCount(0);
  await expect(page.getByLabel("Who’s it for? Audience")).toBeFocused();
});

test("drag-and-drop accepts one image and JPEG replacement decodes", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.screenshot({
    path: testInfo.outputPath("desktop-start.png"),
    fullPage: true,
  });
  const drop = await page.evaluateHandle((bytes) => {
    const data = new DataTransfer();
    data.items.add(
      new File([new Uint8Array(bytes)], "dropped.png", { type: "image/png" }),
    );
    return data;
  }, Array.from(png));
  await page
    .locator(".drop-zone")
    .dispatchEvent("drop", { dataTransfer: drop });
  await expect(page.getByText("dropped.png", { exact: true })).toBeVisible();
  const jpeg = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#6941F5";
    context.fillRect(0, 0, 32, 32);
    return canvas.toDataURL("image/jpeg").split(",")[1];
  });
  await page.getByLabel("Choose a design image").setInputFiles({
    name: "replacement.jpg",
    mimeType: "image/jpeg",
    buffer: Buffer.from(jpeg, "base64"),
  });
  await expect(
    page.getByText("replacement.jpg", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Your selected UI design" }),
  ).toBeVisible();
});
