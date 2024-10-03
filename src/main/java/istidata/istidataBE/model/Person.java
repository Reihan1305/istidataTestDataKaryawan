package istidata.istidataBE.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "persons")
@Data // Generates getters, setters, toString, equals, hashCode
@NoArgsConstructor // Generates a no-args constructor
@AllArgsConstructor // Generates an all-args constructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "NIK harus diisi")
    @Column(unique = true, nullable = false) // Ensure NIK is unique and not null in the database
    private String nik;

    @NotBlank(message = "Nama Lengkap harus diisi")
    private String name;

    @NotBlank(message = "Jenis Kelamin harus diisi")
    private String jenisKelamin;

    @Column(nullable = true)
    private String warnaKesukaan;

    @NotNull(message = "Tanggal Lahir harus diisi")
    private String tanggalLahir;

    @NotBlank(message = "Alamat harus diisi")
    private String alamat;

    @NotBlank(message = "Asal negara harus diisi")
    private String negara;

    public String getNik(){
        return this.nik;
    }
    public void setId(Long id){
        this.id = id;
    };
}
