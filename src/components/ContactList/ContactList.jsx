import { ContactListItem } from '../ContactListItem/ContactListItem';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ name, number, id }) => {
        return (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            onRemoveContact={onRemoveContact}
          />
        );
      })}
    </ul>
  );
};
