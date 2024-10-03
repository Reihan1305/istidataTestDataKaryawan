$(document).ready(function () {
  $(document).on('click','.backButton',function(){
    window.location.href = "index.html"
  })
  // Mengambil ID dari localStorage
  const id = localStorage.getItem("personId");
  console.log(id);
  if (id) {
    // Meminta data dari backend menggunakan ID
    $.ajax({
      url: `http://localhost:8080/api/person/${id}`,
      type: "GET",
      success: function (person) {
        // Mengisi form dengan person yang diterima
        $("#nik").val(person.nik);
        $("#name").val(person.name);
        $(
          'input[name="jenisKelamin"][value="' + person.jenisKelamin + '"]'
        ).prop("checked", true);
        $("#warnaKesukaan").val(person.warnaKesukaan);
        $("#tanggalLahir").val(person.tanggalLahir);
        $("#alamat").val(person.alamat);
        $("#negara").val(person.negara);
      },
      error: function (error) {
        alert("Gagal mengambil data: " + error.responseText);
      },
    });
  }

  // Menangani klik pada tombol "Kembali"
  $('a[href="index.html"]').on("click", function () {
    // Menghapus ID dari localStorage
    localStorage.removeItem("karyawanId");
  });
});
