document.addEventListener('DOMContentLoaded', function() {
    // Verinin çekileceği ham GitHub dosyasının URL'si
    const veriUrl = 'https://raw.githubusercontent.com/Berathd7777/ilimsohbetleri/main/sohbetler.js';

    // Tablonun gövdesini (tbody) seçiyoruz.
    const tbody = document.getElementById('sohbet-listesi');

    // fetch API'si ile URL'den veriyi çekiyoruz.
    fetch(veriUrl, { cache: 'no-cache' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Veri dosyası yüklenemedi. Ağ durumu: ' + response.status);
            }
            return response.text();
        })
        .then(gelenMetin => {
            // sohbetler.js dosyasındaki "const sohbetVeriMetni = `...`;" kısmını temizliyoruz.
            const temizMetin = gelenMetin.substring(gelenMetin.indexOf('`') + 1, gelenMetin.lastIndexOf('`'));

            // Gelen metni satırlara ayırıyoruz.
            const satirlar = temizMetin.trim().split('\n').filter(satir => satir.trim() !== '');

            // ================================================================
            //              İŞTE DEĞİŞİKLİK BURADA!
            //  Satırları içeren diziyi tabloya eklemeden önce tersine çeviriyoruz.
            // ================================================================
            satirlar.reverse();

            // Artık tersine çevrilmiş sırayla her bir satır için işlem yapıyoruz.
            satirlar.forEach(satir => {
                const hucreler = satir.trim().split(',');

                if (hucreler.length === 3) {
                    const tr = document.createElement('tr');
                    
                    const tarih = hucreler[0].trim();
                    const konusmaci = hucreler[1].trim();
                    const konu = hucreler[2].trim();
                    
                    const tdTarih = document.createElement('td');
                    tdTarih.className = 'mdl-data-table__cell--non-numeric';
                    tdTarih.textContent = tarih;
                    tr.appendChild(tdTarih);
                    
                    const tdKonusmaci = document.createElement('td');
                    tdKonusmaci.className = 'mdl-data-table__cell--non-numeric';
                    tdKonusmaci.textContent = konusmaci;
                    tr.appendChild(tdKonusmaci);
                    
                    const tdKonu = document.createElement('td');
                    tdKonu.className = 'mdl-data-table__cell--non-numeric';
                    tdKonu.textContent = konu;
                    tr.appendChild(tdKonu);
                    
                    tbody.appendChild(tr);
                }
            });
        })
        .catch(error => {
            console.error('Veri çekme hatası:', error);
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:red;">Sohbet listesi yüklenemedi. Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.</td></tr>`;
        });
});
