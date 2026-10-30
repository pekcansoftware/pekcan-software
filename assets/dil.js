// Dil secimi (index.html ile ayni mantik ve ayni 'ps_dil' anahtari).
// Sayfa Ingilizce yazildigi icin JS calismasa da dogru goruntuleniyor.
(function () {
    var ANAHTAR = 'ps_dil';
    var DILLER = ['en', 'tr'];
    var kok = document.documentElement;
    var dugme = document.getElementById('langBtn');
    var dugmeYazi = document.getElementById('langBtnText');
    var basliklar = JSON.parse(document.getElementById('basliklar').textContent);

    function uygula(dil) {
        kok.setAttribute('data-lang', dil);
        kok.setAttribute('lang', dil);
        document.title = basliklar[dil];
        dugmeYazi.textContent = dil === 'en' ? 'Türkçe' : 'English';
        dugme.setAttribute('lang', dil === 'en' ? 'tr' : 'en');
    }

    function tarayiciDili() {
        var liste = navigator.languages || [navigator.language || 'en'];
        for (var i = 0; i < liste.length; i++) {
            var kisa = String(liste[i]).toLowerCase().split('-')[0];
            if (DILLER.indexOf(kisa) >= 0) { return kisa; }
        }
        return 'en';
    }

    var secili = null;
    try { secili = localStorage.getItem(ANAHTAR); } catch (e) { /* gizli sekme */ }
    uygula(DILLER.indexOf(secili) >= 0 ? secili : tarayiciDili());

    dugme.addEventListener('click', function () {
        var yeni = kok.getAttribute('data-lang') === 'en' ? 'tr' : 'en';
        uygula(yeni);
        try { localStorage.setItem(ANAHTAR, yeni); } catch (e) { /* yazilamadi */ }
    });
})();
