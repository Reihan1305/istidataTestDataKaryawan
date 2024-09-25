package istidata.istidataBE.services;

import istidata.istidataBE.model.Person;
import istidata.istidataBE.repository.personRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.ValidationException;
import java.util.List;
import java.util.Optional;

@Service
public class personService{

    @Autowired
    private personRepository personRepo;

    public Person createPerson(Person person){
        List<Person> existingPerson = personRepo.findByNik(person.getNik());
        if (!existingPerson.isEmpty()) {
            throw new ValidationException("nik sudah ada");
        }
        return personRepo.save(person);
    }

    public List<Person> findAllPerson(){
        return personRepo.findAll();
    }

    public Person findById(Long Id){
        return personRepo.findById(Id).orElse(null);
    }

    public Person updateUser(Long Id,Person person){
        Optional<Person> oldPersonOpt = personRepo.findById(Id);
        if(oldPersonOpt.isEmpty()){
            throw new ValidationException("person");
        }
        Person oldPerson = oldPersonOpt.get();
        
        if(!oldPerson.getNik().equals(person.getNik())){
            List<Person> existingPerson = personRepo.findByNik(person.getNik());
            if (!existingPerson.isEmpty()) {
                throw new ValidationException("nik sudah ada");
            }
        }
        person.setId(Id);
        return personRepo.save(person);
    }

    public void deletePerson(Long Id){
        personRepo.deleteById(Id);
    }

    public List<Person> searchPersons(String nik,String name){
        if(nik != null && !nik.isEmpty() && name != null && !name.isEmpty()){
            return personRepo.findByNikAndName(nik,name);
        }else if(nik != null && !nik.isEmpty()){
            return personRepo.findByNik(nik);
        }else if(name != null && !name.isEmpty()){
            return personRepo.findByNameContaining(name);
        }else{
            return personRepo.findAll();
        }
    };
}