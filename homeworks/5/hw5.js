function extractLinks(html) {
    let hrefs = html.match(/<a href="(.*?)"/g)
    if (hrefs === null) {
        return []
    }
    return hrefs.map((x) => x.match(/"(.*)"/)[1])
}

async function crawl(url, depth, concurrency) {
    let needExtractLinks = [
        {
            url: url,
            depth: 1,
        }
    ]
    let waitAwaitCrawl = []
    let crawledSuccessArr = []
    while (needExtractLinks.length !== 0 || waitAwaitCrawl.length !== 0) {
        if (waitAwaitCrawl.length >= concurrency) {
            let awaitCrawl = await waitAwaitCrawl.shift()
            let links = extractLinks(awaitCrawl.htmlGet);
            let crawledData = {
                url: awaitCrawl.url,
                depth: awaitCrawl.depth,
                content: awaitCrawl.htmlGet,
                links: links,
            }
            if (awaitCrawl.depth < depth) {
                let newExtractLinks = links.map((link) => ({url: link, depth: awaitCrawl.depth + 1}))
                needExtractLinks = needExtractLinks.concat(newExtractLinks)
            }
            crawledSuccessArr.push(crawledData)
        } else {
            if (needExtractLinks.length !== 0) {
                let extractObj = needExtractLinks.pop();
                waitAwaitCrawl.push(parsePage(extractObj.url, extractObj.depth));
            } else {
                let awaitCrawl = await waitAwaitCrawl.shift()
                let links = extractLinks(awaitCrawl.htmlGet);
                let crawledData = {
                    url: awaitCrawl.url,
                    depth: awaitCrawl.depth,
                    content: awaitCrawl.htmlGet,
                    links: links,
                }
                if (awaitCrawl.depth < depth) {
                    let newExtractLinks = links.map((link) => ({url: link, depth: awaitCrawl.depth + 1}))
                    needExtractLinks = needExtractLinks.concat(newExtractLinks)
                }
                crawledSuccessArr.push(crawledData)
            }
        }
    }
    return crawledSuccessArr;
}

async function parsePage(url, depth) {
    try {
        return await fetch(url)
            .then(res => res)
            .then(async text => {
                return {
                    htmlGet: await text.text(),
                    depth: depth,
                    url: url
                };
            })
    } catch (error) {
        return {
            htmlGet: "",
            depth: depth,
            url: url
        };
    }
}

module.exports = crawl;
