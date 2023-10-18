import { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.createContact(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ number: '', name: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.contactform}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            required
            onChange={this.handleChange}
            value={this.state.name}
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
            onChange={this.handleChange}
            value={this.state.number}
            placeholder="Enter number..."
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          />
        </label>
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    );
  }
}
