import { rr_create_obstacle } from './direction_rr';
import * as turf from "@turf/turf";

jest.mock('@turf/turf', () => {
  return {
    ...jest.requireActual('@turf/turf'),
    bboxPolygon: jest.fn(),
    buffer: jest.fn(),
  };
});

const disasters = [
  {
    latitude: '40.712776',
    longitude: '-74.005974',
  },
  {
    latitude: '40.712800',
    longitude: '-74.006000',
  },
];

describe('direction_rr', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('rr_create_obstacle should create obstacle from disasters', () => {
    rr_create_obstacle(disasters);

    expect(turf.bboxPolygon).toHaveBeenCalled();
    expect(turf.buffer).toHaveBeenCalled();
  });
});
