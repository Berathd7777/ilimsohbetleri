document.addEventListener('DOMContentLoaded', function() {
    // Tablonun gövdesini (tbody) seçiyoruz.
    const tbody = document.getElementById('sohbet-listesi');

    // sohbetVeriMetni değişkeni sohbetler.js dosyasından geliyor.
    // Veriyi satırlara ayırıyor ve boş satırları listeden çıkarıyoruz.
    const satirlar = sohbetVeriMetni.trim().split('\n').filter(satir => satir.trim() !== '');

    // Her bir satır için işlem yapıyoruz.
    satirlar.forEach(satir => {
        // Satırı virgüllerden ayırarak hücre verilerini elde ediyoruz.
        const hucreler = satir.trim().split(',');

        // Eğer satırda 3 eleman (Tarih, Konuşmacı, Konu) varsa tabloya ekle.
        if (hucreler.length === 3) {
            // Yeni bir tablo satırı (tr) oluşturuyoruz.
            const tr = document.createElement('tr');
            
            const tarih = hucreler[0].trim();
            const konusmaci = hucreler[1].trim();
            const konu = hucreler[2].trim();
            
            // Tarih hücresi (td) oluşturup satıra ekliyoruz.
            const tdTarih = document.createElement('td');
            tdTarih.className = 'mdl-data-table__cell--non-numeric';
            tdTarih.textContent = tarih;
            tr.appendChild(tdTarih);
            
            // Konuşmacı hücresi (td) oluşturup satıra ekliyoruz.
            const tdKonusmaci = document.createElement('td');
            tdKonusmaci.className = 'mdl-data-table__cell--non-numeric';
            tdKonusmaci.textContent = konusmaci;
            tr.appendChild(tdKonusmaci);
            
            // Konu hücresi (td) oluşturup satıra ekliyoruz.
            const tdKonu = document.createElement('td');
            tdKonu.className = 'mdl-data-table__cell--non-numeric';
            tdKonu.textContent = konu;
            tr.appendChild(tdKonu);
            
            // Oluşturduğumuz satırı tablonun gövdesine ekliyoruz.
            tbody.appendChild(tr);
        }
    });
});
