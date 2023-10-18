import css from './ContactListItem.module.css';

export const ContactListItem = ({ name, number, id, onRemoveContact }) => {
  return (
    <li key={id} className={css.item}>
      {name}: {number}&nbsp;&nbsp;
      <button className={css.deletebtn} onClick={() => onRemoveContact(id)}>
        Delete
      </button>
    </li>
  );
};
