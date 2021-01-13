import type { RAW } from '../machinery/models';
import { rawToNano } from '../machinery/nanocurrency-web-wrapper';

describe('rawToNano', () => {
  test('given 1 raw', () => {
    const raw: RAW = {
      raw: '1',
    };
    expect(rawToNano(raw)).toStrictEqual('0.000000000000000000000001');
  });
  test('given 1000000 nano as raw should return 1 NANO', () => {
    const raw: RAW = {
      raw: '1000000000000000000000000000000',
    };
    expect(rawToNano(raw)).toStrictEqual({ amount: '1' });
  });
  test('given 100 NANO as raw should return 100 NANO', () => {
    const raw: RAW = {
      raw: '100000000000000000000000000000000',
    };
    expect(rawToNano(raw)).toStrictEqual({ amount: '100' });
  });
});
