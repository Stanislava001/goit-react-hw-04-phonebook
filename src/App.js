import React, { Component } from "react";
import shortid from "shortid";
import Container from "./components/Container";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactsList from "./components/ContactsList";
import "./App.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (name, number) => {
    const { contacts } = this.state;

    const isName = contacts
      .map((contact) => contact.name.toLowerCase())
      .includes(name.toLowerCase());

    if (isName) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = {
        id: shortid.generate(),
        name,
        number,
      };

      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  deleteContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  filterContacts = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterContacts} />
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
