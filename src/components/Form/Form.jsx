import React, { useState, useEffect } from 'react';

import * as MyStyles from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContactsThunk, getContactsThunk } from 'redux/contactsThunk';
import Notiflix from 'notiflix';
const Form = () => {
  const dispatch = useDispatch();
  const [contactName, setcontactName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.items);
  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const reset = () => {
    setcontactName('');
    setNumber('');
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setcontactName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    const { name, number } = e.target;
    const contact = {
      name: name.value,
      phone: number.value,
    };
    e.preventDefault();
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === contactName.toLowerCase()
      )
    ) {
      Notiflix.Notify.warning(
        `Contact "${contactName}" is already in your contacts list`
      );
      return;
    } else {
      dispatch(addContactsThunk(contact));
      reset();
    }
  };

  return (
    <MyStyles.Form onSubmit={handleSubmit}>
      <MyStyles.Text>Name</MyStyles.Text>
      <MyStyles.Input
        type="text"
        name="name"
        value={contactName}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostzrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      ></MyStyles.Input>
      <MyStyles.Text>Number</MyStyles.Text>
      <MyStyles.Input
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <MyStyles.Button type="submit">Add Contact</MyStyles.Button>
    </MyStyles.Form>
  );
};

export default Form;
