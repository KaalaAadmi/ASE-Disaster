import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { requestResponders, disasterOrders, getAllOrders, getOrder } from './order';

const mock = new MockAdapter(axios);

describe('order.js', () => {
  afterEach(() => {
    mock.reset();
  });

  it('requestResponders should make a post request and return the response data', async () => {
    const responseData = { message: 'Request created' };
    mock.onPost('http://127.0.0.1:8000/api/v1/request-resources').reply(200, responseData);

    const response = await requestResponders(1, 2, 3, 4, 5, 6, true);
    expect(response).toEqual(JSON.stringify(responseData));
  });

  it('disasterOrders should make a get request and return the response data', async () => {
    const responseData = { message: 'Disaster orders retrieved' };
    mock.onGet('http://127.0.0.1:8000/api/v1/disaster-orders/1').reply(200, responseData);

    const response = await disasterOrders(1);
    expect(response).toEqual(JSON.stringify(responseData));
  });

  it('getAllOrders should make a get request and return the response data', async () => {
    const responseData = { message: 'All orders retrieved' };
    mock.onGet('http://127.0.0.1:8000/api/v1/all-order-data').reply(200, responseData);

    const response = await getAllOrders();
    expect(response).toEqual(JSON.stringify(responseData));
  });

  it('getOrder should make a get request and return the response data', async () => {
    const responseData = { message: 'Order retrieved' };
    mock.onGet('http://127.0.0.1:8000/api/v1/order/1').reply(200, responseData);

    const response = await getOrder(1);
    expect(response).toEqual(JSON.stringify(responseData));
  });
});
