import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { v4 as uuid } from 'uuid';

const mock = new MockAdapter(axios);

const mockData = [
  {
    email: 'user@email.com',
    quantity: 3,
    total: 149.97,
    payment: {
      ccNum: '1234123412341234',
      exp: '12/34',
    },
  },
];

export const postForm = async (payload) => {
  const url = '/api/magic';
  const id = uuid();

  const userExists = mockData.find((order) => order.email === payload.email);
  if (userExists) {
    mock.onPost(url).reply(422, { error: 'Already Exists' });
  } else {
    mockData.push(payload);
    mock.onPost(url).reply(201, { id });
  }

  return await axios.post(url, payload);
};
