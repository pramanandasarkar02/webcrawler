const {JSDOM} = require('jsdom')



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
    getUrlsFromHTML
}