var loaded = false

const default_video = `<iframe width="560" height="315" src="https://www.youtube.com/embed/turu4Dshm8s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

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
    if (video == "") video = default_video
    return {"id" : id, "naziv" : naziv, "kratki_opis" : kratki_opis, "karakteristike" : karakteristike, "thumbnail" : thumbnail, "opis" : opis, "dimenzije" : dimenzije, "link_za_kupovinu" : link_za_kupovinu, "slike" : slike, "video" : video}
}

function insert_into_inflatable_content(inflatableXML) {
    var picturesHTML = ""

    for (let i = 0; i < inflatableXML.slike.length; i++) {
        if (i == 0) picturesHTML += `<div class="carousel-item active" data-bs-interval="5000"><img src="${inflatableXML.slike[i]}" class="d-block w-50" alt="${inflatableXML.naziv}" draggable="false"></div>`
        else {
            picturesHTML += `<div class="carousel-item" data-bs-interval="5000"><img src="${inflatableXML.slike[i]}" class="d-block w-50" alt="${inflatableXML.naziv}" draggable="false"></div>`
        }
    }    
    $(".inflatable-content").html(`<h1 class="inflatable-title">${inflatableXML.naziv}</h1><div class="inflatable-description">${inflatableXML.opis}</div><div class="inflatable-dimensions"><b>Dimenzije (D/Š/V):</b> ${inflatableXML.dimenzije}</div><div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel"><div class="carousel-inner">${picturesHTML}</div><button class="carousel-control-prev reset-left" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next reset-right" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div><div class="inflatable-buy">Tobogan možete kupiti na našoj <a href="${inflatableXML.link_za_kupovinu}">stranici</a>.</div><div class="inflatable-video yt-video">${inflatableXML.video}</div><h3>Svoj termin možete rezervirati na</h3><div class="inflatable-info"><b>E-mail:</b> miroslav.dekada@gmail.com <br><b>Telefon:</b> 099 213 0810</div>`)
}


$( document ).ready(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '../tobogani.xml');
    xhttp.onreadystatechange = () => {
        var response = xhttp.responseText
        parser = new DOMParser()
        xmlDoc = parser.parseFromString(response,"text/xml");
        var inflatableId = $('.inflatable-content').attr('id')
        var inflatableXML

        $(xmlDoc).find('id').each((index,element) => {
            if ($(element).text() == inflatableId) {
                inflatableXML = $(element).parent()
                return false
            }
        })
        var inflatableParsed = parseXML(inflatableXML[0])

        $(window).resize(() => {
            $(".inflatable-content").css('padding',`calc((100vh - ${$(".navbar").height()}px - ${$(".footer").height()}px - ${$(".inflatable-content").height()}px)/4) 2rem`)
        })

        insert_into_inflatable_content(inflatableParsed)
        try {
            window.top.document.title = `${inflatableParsed.naziv} - Obrt Dekada`
        }
        catch(e) {
            console.log(e)
        }
    }
    xhttp.send();

})

