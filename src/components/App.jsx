import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length < this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    if (prevState.contacts.length > this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  createContact = data => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name === data.name)) {
      return Notify.info(`${data.name} is already in your contacts`);
    }

    const newContact = {
      ...data,
      id: nanoid(),
    };

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
    Notify.success(`${data.name} has been successfully added to your contacts`);
  };

  onRemoveContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    Notify.success('The contact has been successfully removed');
  };

  onFilterChange = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  handleFilterContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter, contacts } = this.state;

    const filteredContacts = this.handleFilterContacts();

    return (
      <div className="container">
        <h1 className="title head">Phonebook</h1>
        <ContactForm createContact={this.createContact} />
        <h2 className="title">Contacts</h2>
        <Filter value={filter} onChange={this.onFilterChange} />
        {contacts.length ? (
          <ContactList
            contacts={filteredContacts}
            onRemoveContact={this.onRemoveContact}
          />
        ) : (
          <p className="">There are no contacts in your phoneboook</p>
        )}
      </div>
    );
  }
}
