import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = localStorage.getItem('contacts');
    if (localContacts) setContacts(JSON.parse(localContacts));
  }, []);

  useEffect(() => {
    contacts.length &&
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = data => {
    if (contacts.some(contact => contact.name === data.name)) {
      return Notify.info(`${data.name} is already in your contacts`);
    }

    const newContact = {
      ...data,
      id: nanoid(),
    };

    setContacts([...contacts, newContact]);

    Notify.success(`${data.name} has been successfully added to your contacts`);
  };

  const onRemoveContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    Notify.success('The contact has been successfully removed');
  };

  const onFilterChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const handleFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = handleFilterContacts();

  return (
    <div className="container">
      <h1 className="title head">Phonebook</h1>
      <ContactForm createContact={createContact} />
      <h2 className="title">Contacts</h2>
      <Filter value={filter} onChange={onFilterChange} />
      {contacts.length ? (
        <ContactList
          contacts={filteredContacts}
          onRemoveContact={onRemoveContact}
        />
      ) : (
        <p className="">There are no contacts in your phoneboook</p>
      )}
    </div>
  );
};
