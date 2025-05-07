import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addContact } from '../../redux/contactsOps';
import { selectContacts } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const normalizedName = name.toLowerCase();
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <label>
        Number:
        <input value={number} onChange={e => setNumber(e.target.value)} required />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}
