function parseXML(XML) {
    var id = $(XML).find('id').text()
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
    return {"id" : id, "naziv" : naziv, "kratki_opis" : kratki_opis, "karakteristike" : karakteristike, "thumbnail" : thumbnail, "opis" : opis, "dimenzije" : dimenzije, "link_za_kupovinu" : link_za_kupovinu, "slike" : slike, "video" : video}
}

function insert_into_inflatable_preview(inflatableXML) {
    var picturesHTML = ""

    for (let i = 0; i < inflatableXML.slike.length; i++) {
        if (i == 0) picturesHTML += `<div class="carousel-item active" data-bs-interval="5000"><img src="${inflatableXML.slike[i]}" class="d-block w-50" alt="${inflatableXML.naziv}" draggable="false"></div>`
        else {
            picturesHTML += `<div class="carousel-item" data-bs-interval="5000"><img src="${inflatableXML.slike[i]}" class="d-block w-50" alt="${inflatableXML.naziv}" draggable="false"></div>`
        }
    }

    $("#inflatable-preview").html(`<h1 class="inflatable-title">${inflatableXML.naziv}</h1><div class="inflatable-description">${inflatableXML.opis}</div><div class="inflatable-dimensions"><b>Dimenzije (D/Š/V):</b> ${inflatableXML.dimenzije}</div><div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel"><div class="carousel-inner">${picturesHTML}</div><button class="carousel-control-prev reset-left" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next reset-right" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div><div class="inflatable-buy">Tobogan možete kupiti na našoj <a href="${inflatableXML.link_za_kupovinu}">stranici</a>.</div><div class="inflatable-video">Video tobogana možete pogledati <a href="${inflatableXML.video}">ovdje</a>`)
}


$( document ).ready(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '../katalog/tobogani.xml');
    xhttp.onreadystatechange = () => {
        var response = xhttp.responseText
        parser = new DOMParser()
        xmlDoc = parser.parseFromString(response,"text/xml");
        var inflatables = []

        var selectHTML = `<option value="general">Općenito</option><option value="najam-kombija">Najam kombija</option>`

        $(xmlDoc).find('tobogan').each((index, element) => {
            inflatables.push(parseXML(element))
            var inflatableName = $(element).find('naziv').text()
            selectHTML += `<option value="${inflatableName}">${inflatableName}</option>`
        })
        $('#inflatables-select').html(selectHTML)

        $('#inflatables-select').change(() => {
            var selectedInflatable = $('#inflatables-select').val()

            inflatables.forEach((element, index) => {
                if (selectedInflatable === "general") {
                    $('#inflatable-preview-img').attr('src', "../fotografije/tobogan2.png")
                    $(".inflatable-preview-description").html("")
                }
                else if (selectedInflatable === "najam-kombija") {
                    $('#inflatable-preview-img').attr('src', "../fotografije/obrt-dekada-kombi-1.jpg")
                    $(".inflatable-preview-description").html("")
                }

                else if (element["naziv"] === selectedInflatable) {
                    $('#inflatable-preview-img').attr('src', element.slike[0].slice(3))
                    $('#inflatable-preview-img').css('width',`calc(${$(".inflatable-preview").width()})`)
                    $(".inflatable-preview-description").html(`<h1 class="inflatable-title">${element.naziv}</h1><div class="inflatable-description">${element.opis}</div><div class="inflatable-dimensions"><b>Dimenzije (D/Š/V):</b> ${element.dimenzije}</div>`)
                }
            })
        });
    }
    xhttp.send();

})

