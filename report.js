const fs = require('node:fs')


function printReport(pages, baseURL){

    let content = ""

    console.log("===============")
    console.log("REPORT")
    console.log("===============")
    const sortedPages = sortPages(pages)
    for(const page of sortedPages){
        const url = page[0]
        const count = page[1]
        console.log(`Found ${url} ${count} times`)

        content += `Found ${url} ${count} times\n`
    }
    console.log("===============")
    console.log("END REPORT")
    console.log("===============")

    saveReport(pages, baseURL, content)
}


function saveReport(pages, baseURL, content){
    const fileName = `reports/${baseURL}.txt`
    try {
        fs.writeFileSync(fileName, content) 
    } catch (error) {
        console.log(error.message)
    }
    


}


function sortPages(pages){
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a, b) => b[1] - a[1])
    return pagesArray
}



module.exports = {
    sortPages,
    printReport
}