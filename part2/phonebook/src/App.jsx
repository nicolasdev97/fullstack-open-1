import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import { useEffect } from "react";
import personsData from "../services/personsData";
import Message from "./Message";

function App() {
  const [persons, setPersons] = useState([]);

  const [message, setMessage] = useState(null);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    personsData.get().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsData
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setMessage(`Updated ${personObject.name} number`);
            setMessageError(false);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response.data
              )
            );
          })
          .catch(() => {
            setMessage(
              `Information of ${existingPerson.name} has already been removed from server`
            );
            setMessageError(true);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    personsData.create(personObject).then((response) => {
      setMessage(`Added ${personObject.name}`);
      setMessageError(false);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  const removePerson = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personsData.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const [filter, setFilter] = useState("");

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} messageError={messageError} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
}

export default App;
