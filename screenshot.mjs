import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] ? `-${process.argv[3]}` : "";
const dir = "./temporary screenshots";

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Find next available number
let n = 1;
while (fs.existsSync(path.join(dir, `screenshot-${n}${label}.png`))) n++;
const outPath = path.join(dir, `screenshot-${n}${label}.png`);

const browser = await puppeteer.launch({
  executablePath: "C:/Users/oanah/.cache/puppeteer/chrome/win64-127.0.6533.88/chrome-win64/chrome.exe",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle2" });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outPath}`);
