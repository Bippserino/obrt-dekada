function inject_nav() {
    const base_url = window.location.protocol + "//" + window.location.host + "/obrt-dekada"
    const html_code = `<nav class="navbar sticky-top navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="${base_url}" draggable="false"><img src="${base_url}/fotografije/logo.svg" alt="logo" draggable="false"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ">
            <li class="nav-item">
                <a class="nav-link uppercase" aria-current="page" href="${base_url}/">početna</a>
            </li>
            <li class="nav-item">
                <a class="nav-link uppercase" href="${base_url}/pitanja">pitanja</a>
            </li>
            <li class="nav-item">
                <a class="nav-link uppercase" href="${base_url}/katalog">tobogani</a>
            </li>
            <li class="nav-item">
                <a class="nav-link uppercase" href="https://dekada-inflatables.eu/hr/products" target="_blank">prodaja</a>
            </li>
            <li class="nav-item">
                <a class="nav-link uppercase" href="${base_url}/najam-kombija-transport">najam kombija</a>
            </li>
            <li class="nav-item">
                <a class="nav-link uppercase" href="${base_url}/kontakt/">kontakt</a>
            </li>
            </ul>
      </div>
    </div>
    </nav>`
    $('.navigation-bar').append(html_code)
}

function inject_footer() {
    const base_url = window.location.protocol + "//" + window.location.host + "/obrt-dekada"
    const year = new Date().getFullYear()
    const html_code = `<div class="footer">
    <div class="container">
        <div class="row">
            <div class="footer-left col-sm">
                <h2 class="uppercase">važne poveznice</h2>
                <div class="footer-links">
                    <a href="${base_url}">Obrt Dekada - Najam Napuhanaca</a><br>
                    <a href="${base_url}/najam-kombija-transport/">Obrt Dekada - Najam teretnih kombi vozila - Našice</a><br>
                    <a href="https://dekada-inflatables.eu/hr/products" target="_blank">Dekada Inflatables - Prodaja tobogana i igraonica na napuhavanje</a><br>
                    <a href="https://ekoteki.com/" target="_blank">Ekoteki</a><br>
                    <a href="https://klikb8.com/" target="_blank">KlikB8</a> <br>
                    <a href="${base_url}/izjava/">Izjava o odricanju od odgovornosti</a>
                </div>
            </div>
            
            <div class="footer-right col-sm">
                <h2 class="uppercase">kontaktirajte nas</h2>
                <div class="footer-information">
                    Miroslav Ivanković <br>
                    Našice <br>
                    Telefon: 099 213 0810 <br>
                    e-Mail: miroslav.dekada@gmail.com <br>
                    <div class="footer-icons">
                        <a href="https://www.facebook.com/toboganiSlavonija" target="_blank"><img src="${base_url}/fotografije/facebook-icon.svg" alt="facebook icon" draggable="false"></a>
                        <a href="https://www.youtube.com/watch?v=BdL5q3aSQ04" target="_blank"><img src="${base_url}/fotografije/youtube-icon.svg" alt="youtube icon" draggable="false"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="copyright">©${year} Obrt Dekada, vl. Miroslav Ivanković</div>`
    $('.footer-section').append(html_code)
}

function inject_adsense() {
    const html_code = `<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-2949558878021772",
        enable_page_level_ads: true
      });
    </script>`
    $('head').prepend(html_code)
}

function inject_grid() {
    $( document ).ready(() => {
        inject_nav()
        inject_footer()
        inject_adsense()
    })  
}

inject_grid()