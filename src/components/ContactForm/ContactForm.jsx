import { useReducer } from 'react';
import css from './ContactForm.module.css';

function reducer(prevState, action) {
  if (action.type === 'name') {
    return {
      ...prevState,
      name: action.payload,
    };
  }
  if (action.type === 'number') {
    return {
      ...prevState,
      number: action.payload,
    };
  }
}

export const ContactForm = ({ createContact }) => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    number: '',
  });

  const handleChange = ({ target }) => {
    if (target.name === 'name') {
      dispatch({ type: 'name', payload: target.value });
    }
    if (target.name === 'number') {
      dispatch({ type: 'number', payload: target.value });
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    createContact(state);

    reset();
  };

  const reset = () => {
    dispatch({ type: 'name', payload: '' });
    dispatch({ type: 'number', payload: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={css.contactform}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          required
          onChange={handleChange}
          value={state.name}
          placeholder="Enter name..."
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          required
          onChange={handleChange}
          value={state.number}
          placeholder="Enter number..."
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        />
      </label>
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};
