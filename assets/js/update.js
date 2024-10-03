$(document).ready(function () {
  $(document).on('click','.backButton',function(){
    window.location.href="index.html"
})
  const id = localStorage.getItem("personId");
  console.log(id);
  if (id) {
    $.ajax({
      url: `http://localhost:8080/api/person/${id}`,
      type: "GET",
      success: function (person) {
        $("#nik").val(person.nik);
        $("#name").val(person.name);
        $("#warnaKesukaan").val(person.warnaKesukaan);
        $(
          'input[name="jenisKelamin"][value="' + person.jenisKelamin + '"]'
        ).prop("checked", true);
        $("#tanggalLahir").val(person.tanggalLahir);
        $("#alamat").val(person.alamat);
        $("#negara").val(person.negara);
      },
      error: function (error) {
        alert("Gagal mengambil data: " + error.responseText);
      },
    });
  }

  $("#addKaryawanForm").on("submit", function (event) {
    event.preventDefault();

    const nik = $("#nik").val();
    const name = $("#name").val();
    const jenisKelamin = $('input[name="jenisKelamin"]:checked').val();
    const tanggalLahir = $("#tanggalLahir").val();
    const alamat = $("#alamat").val();
    const negara = $("#negara").val();
    const warnaKesukaan = $('#warnaKesukaan').val();

    if (!jenisKelamin) {
      alert("Silakan pilih jenis kelamin.");
      return; // Menambahkan return untuk mencegah pengiriman form jika jenis kelamin tidak dipilih
    }

    if (!/^\d+$/.test(nik)) {
      // Memeriksa apakah NIK hanya mengandung angka
      alert("NIK harus berupa angka.");
      return;
    }

    if (nik.length !== 16) {
      // Memeriksa panjang NIK
      alert("NIK harus terdiri dari 16 digit.");
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
      url: "http://localhost:8080/api/person/" + id,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(newKaryawan),
      success: function () {
        // Memperbaiki kesalahan pengetikan di sini
        alert("Data berhasil diupdate");
        window.location.href = "index.html";
        localStorage.removeItem("personId");
      },
      error: function (error) {
        alert("Gagal update karyawan: " + error.responseText);
      },
    });
  });

  $('a[href="index.html"]').on("click", function () {
    localStorage.removeItem("personId");
  });
});
