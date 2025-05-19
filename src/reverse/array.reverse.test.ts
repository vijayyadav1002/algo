import { LocalArray } from "./array.reverse"

describe("Array Reverse", () => {
    test("reverse all ['a', 'b', 'c', 'd']", () => {
        const localArray = new LocalArray('a', 'b', 'c', 'd');
        expect(localArray.reverse()).toEqual(['d', 'c', 'b', 'a']);
        expect(localArray.reverse2()).toEqual(['d', 'c', 'b', 'a']);
        expect(localArray.reverse3()).toEqual(['d', 'c', 'b', 'a']);
    })
})