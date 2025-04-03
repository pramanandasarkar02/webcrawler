function normalizeUrl(urlString){
    
    const urlObj = new URL(urlString)
    let hostPath =  `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        hostPath = hostPath.slice(0, -1)
    }
    return hostPath
}


module.exports = {
    normalizeUrl
}