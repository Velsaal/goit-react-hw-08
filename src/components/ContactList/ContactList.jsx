import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { selectNameFilter } from '../../redux/filters/selectors';
import s from './ContactList.module.css'; 

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={s.list}>
      {visibleContacts.map(({ id, name, number }) => (
        <li key={id} className={s.listItem}>
          <span className={s.contactInfo}>
            {name}: {number}
          </span>
          <button className={s.deleteButton} onClick={() => dispatch(deleteContact(id))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
