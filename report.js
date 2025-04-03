const fs = require('node:fs');


function printReport(pages, baseURL) {
    let content = "";
    console.log("===============");
    console.log("REPORT");
    console.log("===============");
    
    const sortedPages = sortPages(pages);
    for (const [url, count] of sortedPages) {
        console.log(`Found ${count} internal links to ${url}`);
        content += `Found ${count} internal links to ${url}\n`;
    }
    
    console.log("===============");
    console.log("END REPORT");
    console.log("===============");
    
    saveReport(pages, baseURL, content);
}

function saveReport(pages, baseURL, content) {
    const reportsDir = 'reports';
    const fileName = `${reportsDir}/${baseURL.replace(/[^a-z0-9]/gi, '_')}.txt`;
    
    try {
        // Create reports directory if it doesn't exist
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir);
        }
        fs.writeFileSync(fileName, content);
        console.log(`Report saved to ${fileName}`);
    } catch (error) {
        console.error(`Failed to save report: ${error.message}`);
    }
}



function sortPages(pages) {
    const pagesArray = Object.entries(pages);
    pagesArray.sort((a, b) => b[1] - a[1]);
    return pagesArray;
}

module.exports = {
    sortPages,
    printReport
};