async function loadHTML(url)
{
    return await (await fetch(url)).text();
}

async function replace(url, data)
{

    let templateHTML = await loadHTML(url);
    let reg;
    Object.keys(data).forEach(key => {
        reg = new RegExp(`{{${key}}}`, 'g')
        templateHTML = templateHTML.replaceAll(reg, data[key])
    })
    return templateHTML;
}

export {replace};