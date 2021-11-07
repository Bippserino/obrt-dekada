function parseXML(XML) {
    var id = $(XML).find('id').text()
    var put = $(XML).find('put').text()
    var naziv = $(XML).find('naziv').text()
    var kratki_opis = $(XML).find('kratki_opis').text()

    var karakteristike = []
    $(XML).find('karakteristike').find('karakteristika').each((index, element) => {
        karakteristike.push($(element).text())
    })

    var thumbnail = $(XML).find('thumbnail').text()
    var opis = $(XML).find('opis').text()
    var dimenzije = $(XML).find('dimenzije').text()
    var link_za_kupovinu = $(XML).find('link_za_kupovinu').text()

    var slike = []
    $(XML).find('slike').find('slika').each((index, element) => {
        slike.push($(element).text())
    })

    var video = $(XML).find('video').text()
    return {"id" : id, "put" : put, "naziv" : naziv, "kratki_opis" : kratki_opis, "karakteristike" : karakteristike, "thumbnail" : thumbnail, "opis" : opis, "dimenzije" : dimenzije, "link_za_kupovinu" : link_za_kupovinu, "slike" : slike, "video" : video}
}

function create_catalog_item_html(XMLParsed) {
    var characteristicsHTML = ""
    for (let i = 0; i < XMLParsed.karakteristike.length; i++) {
        characteristicsHTML += `<li>${XMLParsed.karakteristike[i]}</li>`
    }

    return `<div class="catalog-item"><div class="catalog-img"><a href="${XMLParsed.put}"><img src="${XMLParsed.thumbnail}" alt="${XMLParsed.naziv}"></a></div><div class="catalog-description"><div class="catalog-description-container"><h1>${XMLParsed.naziv}</h1><div class="catalog-short-description">${XMLParsed.kratki_opis} <div class="catalog-characteristics"><ul>${characteristicsHTML}</ul></div></div><div class="catalog-item-btn"><a href="${XMLParsed.put}" class="btn btn-primary">Više detalja</a></div></div></div></div> <hr>`
}

function insert_into_catalog_content(catalogHTML) {
    $(".catalog-content").html(catalogHTML)
}


$( document ).ready(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'tobogani.xml');
    xhttp.onreadystatechange = () => {
        var response = xhttp.responseText
        parser = new DOMParser()
        xmlDoc = parser.parseFromString(response,"text/xml");
        var inflatableXML
        var catalogHMTL = ""

        $(xmlDoc).find('tobogan').each((index,element) => {
            catalogHMTL += create_catalog_item_html(parseXML(element))
        })
        insert_into_catalog_content(catalogHMTL)
    }
    xhttp.send();

})