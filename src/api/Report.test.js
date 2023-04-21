import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addReport, getReports } from './Report';

const mock = new MockAdapter(axios);

describe('report.js', () => {
  afterEach(() => {
    mock.reset();
  });

  it('addReport should make a post request and return the response data', async () => {
    const responseData = { message: 'Report added' };
    const token = 'fakeToken';
    mock.onPost('http://127.0.0.1:8000/api/v1/add-report-data').reply(200, responseData);

    const response = await addReport('type', 12.34, 56.78, 'details', token);
    expect(response).toBeUndefined();
  });

  it('getReports should make a get request and return the response data', async () => {
    const responseData = { message: 'Reports retrieved' };
    mock.onGet('http://127.0.0.1:8000/api/v1/all-report-data').reply(200, responseData);

    const response = await getReports();
    expect(response).toEqual(responseData);
  });
});
