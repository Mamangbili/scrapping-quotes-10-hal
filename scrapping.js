import puppeteer from "puppeteer";

const getQuotes = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();


    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto("http://quotes.toscrape.com/", {
        waitUntil: "domcontentloaded",
    });

    const extractQuotes = async () => {
        const quoteNodes = document.querySelectorAll("span.text");

        const quotes = [];
        quoteNodes.forEach(quote => quotes.push(quote.innerHTML));
        return quotes;
        // return quoteNodes
    };



    const result = {}
    for (let i = 1; i <= 10; i++) {
        if (i < 10) {
            result[i.toString()] = await page.evaluate(extractQuotes)
            // await page.click(".pager > li.next>a")
            // await page.waitForNavigation()
            await Promise.all([
                page.click(".pager > li.next>a"),
                page.waitForNavigation(),
            ]);
        }
        else {
            result[i.toString()] = await page.evaluate(extractQuotes)

        }
    }

    console.log(result)
    await browser.close()
    return result
};

// Start the scraping
getQuotes();