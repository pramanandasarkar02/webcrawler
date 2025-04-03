const {JSDOM} = require('jsdom')


async function crawlPage(baseURL, currentURL, pages){
   

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages
    }

    const normalizedCurrentURL = normalizeUrl(currentURL)

    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`actively crawling ${currentURL}`)


    try {
        const response = await fetch(currentURL)
        if (response.status > 399){
            console.log(`error with status code ${response.status} on page ${currentURL}`)
            return pages
        }
        const contentType = response.headers.get('content-type')
        if(!contentType || !contentType.includes('text/html')){
            console.log(`skipping non html response ${currentURL}`)
            return pages
        }

        const htmlBody = await response.text()

        const nextUrls = getUrlsFromHTML(htmlBody, baseURL)
        for (const nextUrl of nextUrls){
            pages = await crawlPage(baseURL, nextUrl, pages)
        }

    } catch (error) {
        console.log(`error crawling ${currentURL}: ${error.message}`)
    }

    return pages

    
}



function getUrlsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)

    const links = dom.window.document.querySelectorAll('a')
    for(const link of links){
        if (link.href.slice(0,1) === '/'){
            // relative url
            try {
                const urlObj = new URL(`${baseURL}${link.href}`) 
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`error with relative url: ${error.message}`)
            }

            
        }else {
            // absolute url
            try {
                const urlObj = new URL(link.href) 
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`error with absolute url: ${error.message}`)
            }
        }
    }
    return urls
}




function normalizeUrl(urlString){
    
    const urlObj = new URL(urlString)
    let hostPath =  `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        hostPath = hostPath.slice(0, -1)
    }
    return hostPath
}


module.exports = {
    normalizeUrl,
    getUrlsFromHTML,
    crawlPage
}