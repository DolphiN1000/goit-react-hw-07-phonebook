import axios from 'axios';

const phonebookInstance = axios.create({
  baseURL: 'https://6414c7dce8fe5a3f3a0f7036.mockapi.io/api/contacts',
});

export const getAllContacts = async () => {
  const { data } = await phonebookInstance.get('/');
  return data;
};

export const addContact = async data => {
  const { data: result } = await phonebookInstance.post('/', data);
  return result;
};

export const deleteContact = async id => {
  const { data } = await phonebookInstance.delete(`/${id}`);
  return data;
};
