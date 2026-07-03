import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message, error.stack));
  
  try {
    console.log("Navigating to localhost:5175/legislacoes...");
    await page.goto('http://localhost:5175/legislacoes', { waitUntil: 'networkidle2' });
    console.log("Navigation complete. Waiting 2s...");
    await new Promise(r => setTimeout(r, 2000));
  } catch (err) {
    console.log("PUPPETEER ERROR:", err);
  } finally {
    await browser.close();
  }
})();
