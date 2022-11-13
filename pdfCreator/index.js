const puppeteer = require("puppeteer");
const hbs = require("handlebars");

const fs = require("fs-extra");

const path = require("path");

const compile = async function (templateName, data) {
  const filePath = path.join(
    process.cwd(),
    "pdfCreator",
    "templates",
    `${templateName}.hbs`
  );

  const html = await fs.readFile(filePath, "utf8");
  return hbs.compile(html)(data);
};

const createPdf = async function (data) {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const content = await compile("index", data);

    await page.setContent(content);

    await page.pdf({
      path: "output.pdf",
      format: "A4",
      printBackground: true,
    });

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};
module.exports.createPdf = createPdf;
