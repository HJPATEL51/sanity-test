import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import chromium from "@sparticuz/chromium";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestData = req.body;
    const filePath = path.join(process.cwd(), "src", "components", "test.hbs");

    const fileContent = fs.readFileSync(filePath, "utf8");

    const option: any = {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless as boolean,
      ignoreHTTPSErrors: true,
    };

    if (process.env.NODE_ENV === "production") {
      option.executablePath = await chromium.executablePath();
    }

    const browser = await puppeteer.launch(option);

    const GtAmericaThinBase64 = fs.readFileSync(
      path.join(
        process.cwd(),
        "public",
        "docs",
        "fonts",
        "GT-America-Standard-Thin-Trial.otf"
      ),
      "base64"
    );
    const RecklessNeueThinBase64 = fs.readFileSync(
      path.join(
        process.cwd(),
        "public",
        "docs",
        "fonts",
        "RecklessNeue-Thin.ttf"
      ),
      "base64"
    );
    const CarrosserieBoldBase64 = fs.readFileSync(
      path.join(
        process.cwd(),
        "public",
        "docs",
        "fonts",
        "Carrosserie-Bold.otf"
      ),
      "base64"
    );
    const GTAmericaRegularBase64 = fs.readFileSync(
      path.join(
        process.cwd(),
        "public",
        "docs",
        "fonts",
        "GT-America-Medium.ttf"
      ),
      "base64"
    );
    const TimeNewRomanBase64 = fs.readFileSync(
      path.join(
        process.cwd(),
        "public",
        "docs",
        "fonts",
        "times-new-roman.ttf"
      ),
      "base64"
    );

    const data = {
      date: requestData.date,
      english: requestData.tittleEnglish,
      titleFrench: requestData.titleFrench,
      phonetic: requestData.phonetic,
      grammarBlurb: requestData.grammarBlurb,
      description: requestData.description,
      mainLogo: fs.readFileSync(
        path.join(process.cwd(), "public", "images", "png", "logo.png"),
        "base64"
      ),
      rightIcon: fs.readFileSync(
        path.join(process.cwd(), "public", "images", "png", "right-mark.png"),
        "base64"
      ),
      wrongIcon: fs.readFileSync(
        path.join(process.cwd(), "public", "images", "png", "cross-mark.png"),
        "base64"
      ),
      footerLogo: fs.readFileSync(
        path.join(process.cwd(), "public", "images", "png", "footer-logo.png"),
        "base64"
      ),
      trueOption: requestData.trueOption,
      falseOption1: requestData.falseOption1,
      falseOption2: requestData.falseOption2,
      falseOption3: requestData.falseOption3,
      falseOptionTitle1: requestData.falseOptionTitle1,
      falseOptionTitle2: requestData.falseOptionTitle2,
      falseOptionTitle3: requestData.falseOptionTitle3,
      falseOptionMeaning1: requestData.falseOptionMeaning1,
      falseOptionMeaning2: requestData.falseOptionMeaning2,
      falseOptionMeaning3: requestData.falseOptionMeaning3,
      GtAmericaThinBase64: `data:application/font-otf;base64,${GtAmericaThinBase64}`,
      RecklessNeueThinBase64: `data:application/font-ttf;base64,${RecklessNeueThinBase64}`,
      CarrosserieBoldBase64: `data:application/font-otf;base64,${CarrosserieBoldBase64}`,
      GTAmericaRegularBase64: `data:application/font-ttf;base64,${GTAmericaRegularBase64}`,
      TimeNewRomanBase64: `data:application/font-ttf;base64,${TimeNewRomanBase64}`,
    };

    var template = Handlebars.compile(fileContent);
    const html = template(data);
    const page = await browser.newPage();
    await page.setContent(html);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      // format: "A4",
      printBackground: true,
      width: "612px",
      height: "811px",
      timeout: 0,
    });

    // Close the browser
    await browser.close();

    // Send the PDF as response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="question.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    // Handle any errors that occur during execution
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
}
