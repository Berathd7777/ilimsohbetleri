document.addEventListener('DOMContentLoaded', function() {
    // 1. Verinin çekileceği ham GitHub dosyasının URL'si
    //    Kullanıcı adınızı ve repo adınızı kontrol ettiğinizden emin olun.
    const veriUrl = 'https://raw.githubusercontent.com/Berathd7777/ilimsohbetleri/main/sohbetler.js';

    // Tablonun gövdesini (tbody) seçiyoruz.
    const tbody = document.getElementById('sohbet-listesi');

    // 2. fetch API'si ile URL'den veriyi çekiyoruz.
    //    { cache: 'no-cache' } ayarı, tarayıcının dosyayı önbelleğe almasını engeller.
    //    Bu sayede her zaman en güncel veriyi almış oluruz.
    fetch(veriUrl, { cache: 'no-cache' })
        .then(response => {
            // Eğer cevap başarılı değilse (örn: 404 Not Found) hata fırlat.
            if (!response.ok) {
                throw new Error('Veri dosyası yüklenemedi. Ağ durumu: ' + response.status);
            }
            // Cevabı metin olarak döndür.
            return response.text();
        })
        .then(gelenMetin => {
            // 3. Gelen metni işleyerek tabloyu oluşturuyoruz (eski kodun aynısı).
            
            // sohbetler.js dosyasındaki "const sohbetVeriMetni = `...`;" kısmını temizleyelim.
            // Sadece `` tırnaklar arasındaki metni almak için bir düzenleme yapalım.
            const temizMetin = gelenMetin.substring(gelenMetin.indexOf('`') + 1, gelenMetin.lastIndexOf('`'));

            const satirlar = temizMetin.trim().split('\n').filter(satir => satir.trim() !== '');

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
            // 4. Bir hata olursa kullanıcıyı bilgilendiriyoruz.
            console.error('Veri çekme hatası:', error);
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:red;">Sohbet listesi yüklenemedi. Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.</td></tr>`;
        });
});