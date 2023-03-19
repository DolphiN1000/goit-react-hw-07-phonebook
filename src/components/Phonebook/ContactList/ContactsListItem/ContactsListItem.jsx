import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { fetchDeleteContact } from 'redux/phonebook/phonebook-operations';

// import styles from './contactsListItem.module.scss';

const ContactsListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(fetchDeleteContact(id));
  };

  return (
    <li>
      {name}: {number}
      <button id={id} onClick={() => handleDeleteContact(id)}>
        Delete
      </button>
    </li>
  );
};

export default ContactsListItem;

ContactsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
