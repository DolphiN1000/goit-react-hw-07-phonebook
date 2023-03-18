import '../../shared/styles/styles.scss';

import ContactsForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';


import { lazy, Suspense } from 'react';
import { FidgetSpinner } from 'react-loader-spinner';

import {
  fetchAddContact,
  fetchAllContacts,
  fetchDeleteContact,
} from 'redux/phonebook/phonebook-operations';

import {
    getFilteredContacts,
} from 'redux/phonebook/phonebook-selectors';

import styles from './phonebook.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { setFilter } from 'redux/filter/filter-slice';
const ContactsList = lazy(() => import('./ContactList/ContactList'));
const Phonebook = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    dispatch(fetchAddContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(fetchDeleteContact(id));
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isContacts = Boolean(filteredContacts.length);

  return (
    <Suspense
      fallback={
        <FidgetSpinner
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={['#ff0000', '#00ff00', '#0000ff']}
          backgroundColor="#F4442E"
        />
      }
    >
      <div className={styles.container}>
        <h1>Phonebook</h1>

        <ContactsForm onSubmit={handleAddContact} />
        <h2>Contacts</h2>
        <Filter handleChange={handleFilter} />
        {isContacts && (
          <ContactsList
            contacts={filteredContacts}
            deleteContact={handleDeleteContact}
          />
        )}
        {!isContacts && <p>Not yet added contacts</p>}
      </div>
    </Suspense>
  );
};

export default Phonebook;
