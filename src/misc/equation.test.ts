import { findXYZ } from './equation';

describe('findXYZ is a function', () => {
    test('Input 1 with 3x + 9y + 8z = 79', () => {
        const data = 10;
        expect(findXYZ(data)).toEqual([
            { x: 0, y: 7, z: 2 },
            { x: 1, y: 4, z: 5 },
            { x: 2, y: 1, z: 8 },
            { x: 3, y: 6, z: 2 },
            { x: 4, y: 3, z: 5 },
            { x: 5, y: 0, z: 8 },
            { x: 6, y: 5, z: 2 },
            { x: 7, y: 2, z: 5 },
            { x: 9, y: 4, z: 2 }
          ]);
    });
});