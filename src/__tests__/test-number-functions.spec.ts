import type { RAW } from '../machinery/models';
import { rawToNano, rawToNumber } from '../machinery/nanocurrency-web-wrapper';
import { rawToReadable } from '../machinery/text-utils';

describe('rawToNano', () => {
  test('given 1 RAW', () => {
    const raw: RAW = {
      raw: '1',
    };
    expect(rawToNano(raw)).toStrictEqual({
      amount: '0.000000000000000000000000000001',
    });
  });
  test('given 1000000 nano as RAW should return 1 NANO', () => {
    const raw: RAW = {
      raw: '1000000000000000000000000000000',
    };
    expect(rawToNano(raw)).toStrictEqual({
      amount: '1.000000000000000000000000000000',
    });
  });
  test('given 100 NANO as RAW should return 100 NANO', () => {
    const raw: RAW = {
      raw: '100000000000000000000000000000000',
    };
    expect(rawToNano(raw)).toStrictEqual({
      amount: '100.000000000000000000000000000000',
    });
  });
});

describe('rawToNumber', function () {
  test('with much RAW', () => {
    const raw: RAW = { raw: '100000000000000000000000000000000000000' };
    const n = rawToNumber(raw);
    expect(n).toStrictEqual('100000000');
  });

  test('with low RAW', () => {
    const raw: RAW = { raw: '1' };
    const n = Number.parseFloat(rawToNumber(raw));
    expect(n).toStrictEqual(1e-30);
  });
  test('two very low RAWs are comparable', () => {
    const oneRaw: number = Number.parseFloat(rawToNumber({ raw: '1' }));
    const twoRaw: number = Number.parseFloat(rawToNumber({ raw: '2' }));
    expect(oneRaw > twoRaw).toStrictEqual(false);
    expect(oneRaw < twoRaw).toStrictEqual(true);
  });
});

describe('rawToReadable', () => {
  test('given almost zero RAW', () => {
    const raw: RAW = { raw: '1' };
    expect(rawToReadable(raw)).toStrictEqual('0.000000..');
  });
  test('given some RAW', () => {
    const raw: RAW = { raw: '1000000000000000000000000' };
    expect(rawToReadable(raw)).toStrictEqual('0.000001');
  });
  test('given a lot of RAW', () => {
    const raw: RAW = { raw: '100000000000000000000000000000000000000' };
    expect(rawToReadable(raw)).toStrictEqual('100000000');
  });
  test('and some with decimals', () => {
    const raw: RAW = { raw: '100000000001000000000000000000000000000' };
    expect(rawToReadable(raw)).toStrictEqual('100000000.001');
  });
  test('and some with lower decimals', () => {
    const raw: RAW = { raw: '100000000000000100000000000000000000000' };
    expect(rawToReadable(raw)).toStrictEqual('100000000.000000..');
  });
});
