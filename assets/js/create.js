$(document).ready(function() {
    $(document).on('click','.backButton',function(){
        window.location.href="index.html"
    })

    $('#addKaryawanForm').on('submit', function(event) {
        event.preventDefault();

        const nik = $('#nik').val();
        const name = $('#name').val();
        const jenisKelamin = $('input[name="jenisKelamin"]:checked').val();
        const tanggalLahir = $('#tanggalLahir').val();
        const alamat = $('#alamat').val();
        const negara = $('#negara').val();
        const warnaKesukaan = $('#warnaKesukaan').val();

        if (!jenisKelamin) {
            alert('Silakan pilih jenis kelamin.');
            return; // Menambahkan return untuk mencegah pengiriman form jika jenis kelamin tidak dipilih
        }

        if (!/^\d+$/.test(nik)) { // Memeriksa apakah NIK hanya mengandung angka
            alert('NIK harus berupa angka.');
            return;
        }

        if (nik.length !== 16) { // Memeriksa panjang NIK
            alert('NIK harus terdiri dari 16 digit.');
            return;
        }

        const newKaryawan = {
            nik: String(nik),
            name,
            jenisKelamin,
            tanggalLahir,
            alamat,
            negara,
            warnaKesukaan
        };

        console.log(newKaryawan);
        $.ajax({
            url: "http://localhost:8080/api/person",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(newKaryawan),
            success: function() { 
                alert("Data berhasil ditambahkan");
                window.location.href = "index.html";
            },
            error: function(xhr) {
                const response = JSON.parse(xhr.responseText);
                const message = response.message || 'Terjadi kesalahan saat menambahkan karyawan.';
        
                alert('Gagal menambahkan karyawan: ' + message);
                console.log(xhr);
            }
        });
        
    });
});
