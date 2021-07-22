// import './App.css';

import React from "react";

import Section from "./components/Section";
import Form from "./components/Form";
import ContactsList from "./components/ContactsList";
import ContactsListItem from "./components/ContactsListItem";
import Filter from "./components/Filter";

class App extends React.Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    if (localStorage.getItem("contacts")) {
      this.setState({ contacts: JSON.parse(localStorage.getItem("contacts")) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.setState.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = (data) => {
    if (this.state.contacts.find((contact) => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    this.setState((prev) => {
      return { contacts: [...prev.contacts, data] };
    });
  };

  deleteContact = (deletedContactId) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter(
        (contact) => contact.id !== deletedContactId
      ),
    }));
  };

  onChangeSearchInput = (evt) => {
    this.setState({ filter: evt.target.value });
  };

  getVisibleContacts = () => {
    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <Section title="Phonebook">
          <Form propOnSubmit={this.formSubmitHandler} />
        </Section>
        <Section title="Contacts">
          <Filter
            value={this.state.filter}
            onChange={this.onChangeSearchInput}
          />
          <ContactsList>
            <ContactsListItem
              contacts={visibleContacts}
              onDeleteButtonClick={this.deleteContact}
            ></ContactsListItem>
          </ContactsList>
        </Section>
      </>
    );
  }
}
export default App;
// 5.оформление
