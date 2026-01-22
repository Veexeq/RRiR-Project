import puppeteer from 'puppeteer';

const URL = 'http://localhost:5173/RRiR-Project/theory';
const OUTPUT = 'export_final.pdf';

const SELECTORS = {
  header: 'header',
  footer: 'footer',
  chart: '.recharts-wrapper', // Klasa wykresu
};

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1. Renderujemy stronę jako Desktop (FullHD)
  // Dzięki temu komponenty się nie ścisną.
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2, // Wysoka jakość dla wykresów
  });

  await page.goto(URL, { waitUntil: 'networkidle0' });
  
  // Ważne: Emulacja ekranu, żeby wykresy nie znikały jak przy druku
  await page.emulateMediaType('screen');

  // 2. Czekamy na wykresy + chwila na animację
  try {
    await page.waitForSelector(SELECTORS.chart, { timeout: 5000 });
    await new Promise(r => setTimeout(r, 2000)); // 2s na ustabilizowanie animacji
  } catch (e) {
    console.log('⚠️ Wykres nie został wykryty, generuję bez niego.');
  }

  // 3. Stylizacja naprawcza (usunięcie dziury na dole i poprawa tła)
  await page.addStyleTag({
    content: `
      /* Reset wysokości, aby usunąć biały gap na dole */
      html, body, #root {
        min-height: 0 !important;
        height: auto !important;
        overflow: visible !important;
      }
      
      /* Częsty winowajca białych stron - kontener aplikacji */
      .app-container, main {
        min-height: 0 !important;
        height: auto !important;
      }

      /* Ukryj scrollbary */
      ::-webkit-scrollbar { display: none; }

      /* Nagłówek i stopka statyczne */
      ${SELECTORS.header}, ${SELECTORS.footer} {
        position: static !important;
        width: 100% !important;
      }

      /* Zapewnienie, że tło jest białe (czasem dark mode psuje PDF) */
      body {
        background-color: #ffffff !important;
        -webkit-print-color-adjust: exact !important;
      }
    `,
  });

  // 4. Obliczenie wysokości dla JEDNEJ DŁUGIEJ STRONY (opcjonalne, jeśli wolisz pocięte A4)
  // Jeśli chcesz tradycyjne strony A4, usuń parametr `height` w page.pdf i zostaw tylko format: 'A4'
  
  const bodyHeight = await page.evaluate(() => {
     // Pobieramy wysokość scrolla przy widoku 1920px
     return document.body.scrollHeight;
  });
  
  // Obliczamy skalę: A4 width (794px) / Viewport (1920px) = ~0.41
  // Dajemy nieco mniej (0.40), żeby był margines.
  const SCALE = 0.40;
  
  // Przeliczamy wysokość PDF, żeby pasowała do przeskalowanej treści
  // Skoro zmniejszamy treść (zoom out), to wysokość "kartki" też musi być mniejsza w pikselach PDF,
  // ALE Puppeteer przy `page.pdf` z custom height działa specyficznie.
  // Najbezpieczniej dla "jednej długiej rolki" jest ustawić szerokość PDF na 1920px i nie używać scale,
  // LUB użyć standardowego A4 ze skalą.
  
  // PODEJŚCIE HYBRYDOWE (Najlepsze):
  // Robimy PDF o szerokości A4, ale skalujemy treść, by się zmieściła.
  
  console.log(`📏 Wykryta wysokość strony: ${bodyHeight}px`);

  await page.pdf({
    path: OUTPUT,
    printBackground: true,
    scale: SCALE,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '0mm',
      right: '0mm'
    },
    width: '210mm',
    height: `${bodyHeight * SCALE + 50}px`, // Przeskalowana wysokość + bufor
    pageRanges: '1',
  });

  await browser.close();
  console.log(`✅ PDF naprawiony: ${OUTPUT}`);
})();