package istidata.istidataBE.controller;

import istidata.istidataBE.model.Person;
import istidata.istidataBE.services.personService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/person")
public class personController{
    @Autowired
    private personService personservice;

    @PostMapping
    public ResponseEntity<Person> createUser(@RequestBody Person person){
        System.out.println(person);
        return new ResponseEntity<>(personservice.createPerson(person),HttpStatus.CREATED);
    }

    @GetMapping 
    public ResponseEntity<List<Person>> getAllUser(){      
        System.out.println(ResponseEntity.ok(personservice.findAllPerson()));
        return ResponseEntity.ok(personservice.findAllPerson());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getUserById(@PathVariable Long id) {
        Person person = personservice.findById(id);
        return person != null ? ResponseEntity.ok(person):ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable Long id, @RequestBody Person person) {
        if(personservice.findById(id) == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(personservice.updateUser(id, person));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if(personservice.findById(id) == null){
            return ResponseEntity.notFound().build();
        }

        personservice.deletePerson(id);
        return ResponseEntity.noContent().build();
    };

    @GetMapping("/search")
    public ResponseEntity<List<Person>> findUserByNikName(
        @RequestParam(value = "nik",required = false) String nik,
        @RequestParam(value = "name",required = false) String name
    ){
        List<Person> person = personservice.searchPersons(nik,name);
        return ResponseEntity.ok(person);
    }
}