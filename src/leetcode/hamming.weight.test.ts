import { hammingWeight, hummingWeightBrainKernighanAlgo } from './hamming.weight';


describe('hammingWeight', () => {
    test('should return the number of 1 bits in the binary representation of a number', () => {
        expect(hammingWeight(0b00000000000000000000000000001011)).toBe(3);
    });
    test('should return 0 for 0', () => {
        expect(hammingWeight(0)).toBe(0);
    });
});


describe('hummingWeightBrainKernighanAlgo', () => {
    test('should return the number of 1 bits in the binary representation of a number', () => {
        expect(hummingWeightBrainKernighanAlgo(0b00000000000000000000000000001011)).toBe(3);
    });
    test('should return 0 for 0', () => {
        expect(hummingWeightBrainKernighanAlgo(0)).toBe(0);
    });
});
