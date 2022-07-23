import { useState } from 'react';
import { useCreateContactMutation } from 'redux/api-service';
import s from './ContactForm.module.css';

function ContactForm({ contacts: { data: contacts } }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [createContact] = useCreateContactMutation();

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return new Error(`Something went wrong in ContactForm`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contactExist = contacts.find(contact => contact.name === name);
    if (!contactExist) {
      createContact({ name, number });
      setName('');
      setNumber('');
    } else {
      alert(`${name} is already in contact`);
    }
  };

  return (
    <form className={s.form} action="submit" onSubmit={handleSubmit}>
      <div className={s.container}>
        <label className={s.label}>
          <span className={s.label__title}>Name</span>
          <input
            className={s.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleInputChange}
          />
        </label>
        <label className={s.label}>
          <span className={s.label__title}>Number</span>
          <input
            className={s.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleInputChange}
          />
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
}

export default ContactForm;