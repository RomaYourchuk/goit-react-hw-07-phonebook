import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import { useDeleteContactMutation } from 'redux/api-service';

const ContactItem = ({ contact }) => {
  const { id, name, phone } = contact;
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  return (
    <li className={s.list__item}>
      <p className={s.text}>{name}</p>
      <p className={s.text}>{phone}</p>
      <button
        className={s.button}
        type="button"
        id={id}
        onClick={e => deleteContact(id)}
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string,
  }),
};

export { ContactItem };