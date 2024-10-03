$(document).ready(function() {
    // Fungsi mendapatkan person dari BE
    function loadDataPerson() {
        $.ajax({
            url: "http://localhost:8080/api/person",
            type: "GET",
            success: function(person) {
                renderTable(person);
            },
            error: function() {
                alert("Error fetching data.");
            }
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' }).toLowerCase();
        const year = String(date.getFullYear());
        return `${day}-${month}-${year}`;
    }

    function renderTable(person) {
        let karyawanTable = '';
        $.each(person, function(index, p) {
            karyawanTable += `
                <tr>
                    <td style="background-color: ${p.warnaKesukaan === "merah"? "red": p.warnaKesukaan === "biru" ? "blue" :"yellow"}; text-align: center;">${index + 1}</td>
                    <td style="background-color: ${p.warnaKesukaan === "merah"? "red": p.warnaKesukaan === "biru" ? "blue" :"yellow"}; text-align: center;">${p.nik}</td>
                    <td style="background-color: ${p.warnaKesukaan === "merah"? "red": p.warnaKesukaan === "biru" ? "blue" :"yellow"}; text-align: center;">${p.name}</td>
                    <td style="background-color: ${p.warnaKesukaan === "merah"? "red": p.warnaKesukaan === "biru" ? "blue" :"yellow"}; text-align: center;">${p.jenisKelamin == "L" ? "pria" : "wanita"}</td>
                    <td style="background-color: ${p.warnaKesukaan === "merah"? "red": p.warnaKesukaan === "biru" ? "blue" :"yellow"}; text-align: center;">${p.warnaKesukaan}</td>
                    <td style="background-color: ${p.warnaKesukaan === "merah"? "red": p.warnaKesukaan === "biru" ? "blue" :"yellow"}; text-align: center;">${formatDate(p.tanggalLahir)}</td>
                    <td style="background-color: ${p.warnaKesukaan === "merah"? "red": p.warnaKesukaan === "biru" ? "blue" :"yellow"}; text-align: left; width:15rem;">${p.alamat}</td> <!-- Meningkatkan tinggi kolom alamat -->
                    <td style="background-color: ${p.warnaKesukaan === "merah"? "red": p.warnaKesukaan === "biru" ? "blue" :"yellow"}; text-align: center;">${p.negara}</td>
                    <td>
                        <button class="p-0 fw-bold text-warning detailbtn" data-id="${p.id}">detail</button>
                        <button class="p-0 fw-bold text-primary editbtn" data-id="${p.id}">edit</button>
                        <button class="p-0 fw-bold text-danger deletebtn" data-id="${p.id}">delete</button>
                    </td>
                </tr>
            `;
        });
        $('#personTable tbody').html(karyawanTable);
    }

    loadDataPerson();

    $('#searchForm').on('submit', function(event) {
        event.preventDefault();

        const nik = $('#nik').val();
        const name = $('#name').val();

        let query = '?';
        if (nik) {
            query += `nik=${nik}&`;
        }
        if (name) {
            query += `name=${name}`;
        }
        $.ajax({
            url: `http://localhost:8080/api/person/search${query}`,
            type: 'GET',
            success: function(person) {
                renderTable(person);
            },
            error: function(error) {
                alert('Gagal melakukan pencarian: ' + error.responseText);
            }
        });
    });

    $(document).on('click', '.addBtn', function() {
        window.location.href = "createData.html";
    });

    $(document).on('click', '.detailbtn', function() {
        const id = $(this).data('id');
        localStorage.setItem('personId', id);
        window.location.href = "detailData.html";
    });

    $(document).on('click', '.editbtn', function() {
        const id = $(this).data('id');
        localStorage.setItem('personId', id);
        window.location.href = "editData.html";
    });

    $(document).on('click', '.deletebtn', function() {
        const id = $(this).data('id');
        const name = $(this).closest('tr').find('td:eq(2)').text();
        $('#personName').text(name);
        $('#confirmDelete').data('id', id);
        $('#deleteModal').modal('show');
        $('#confirmDelete').on('click', function() {
            $.ajax({
                url: `http://localhost:8080/api/person/${id}`,
                type: 'DELETE',
                success: function() {
                    alert("Data berhasil dihapus");
                    $('#deleteModal').modal('hide');
                    loadDataPerson();
                },
                error: function() {
                    alert("Error saat menghapus data");
                }
            });
        });
    });
});
