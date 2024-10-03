package istidata.istidataBE.repository;

import istidata.istidataBE.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface personRepository extends JpaRepository<Person, Long> {
    List<Person> findByNik(String nik); 

    List<Person> findByNameContaining(String name);

    List<Person> findByNikAndName(String nik,String name);
}

// Repository interface untuk entitas Person yang digunakan untuk 
// berinteraksi dengan database melalui Spring Data JPA.