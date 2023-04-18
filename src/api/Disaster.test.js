import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  activateDisaster,
  getActiveDisasters,
  getAllDisasters,
  addReportToDisaster,
} from './disaster';

const mock = new MockAdapter(axios);

describe('disaster.js', () => {
  afterEach(() => {
    mock.reset();
  });

  it('activateDisaster should make a put request and return the response data', async () => {
    const responseData = { message: 'Disaster activated' };
    mock.onPut('http://127.0.0.1:8000/api/v1/activate-disaster/1').reply(200, responseData);

    const response = await activateDisaster(1, 'type', 10, 20, 'site', 'disasterName', 'disasterDescription');
    expect(response).toBeUndefined();
  });

  it('getActiveDisasters should make a get request and return the response data', async () => {
    const responseData = { message: 'Active disasters retrieved' };
    mock.onGet('http://127.0.0.1:8000/api/v1/active-disaster-data').reply(200, responseData);

    const response = await getActiveDisasters();
    expect(response).toEqual(responseData);
  });

  it('getAllDisasters should make a get request and return the response data', async () => {
    const responseData = { message: 'All disasters retrieved' };
    mock.onGet('http://127.0.0.1:8000/api/v1/all-disaster-data').reply(200, responseData);

    const response = await getAllDisasters();
    expect(response).toEqual(responseData);
  });

  it('addReportToDisaster should make a post request and return the response data', async () => {
    const responseData = { message: 'Report added to disaster' };
    mock
      .onPost('http://127.0.0.1:8000/api/v1/add-report-to-disaster/1')
      .reply(200, responseData);

    const response = await addReportToDisaster(1, 1);
    expect(response).toBeUndefined();
  });
});
