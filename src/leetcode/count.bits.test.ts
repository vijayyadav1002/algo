// https://leetcode.com/problems/counting-bits/submissions/

import { countBits, getBinaryOfNumber } from "./count.bits";


describe("countBits", () => {
    test("Number of 1s till 5", () => {
        const result = countBits(5);
        expect(result).toEqual([0,1,1,2,1,2])
    })
    test("Number of 1s till 7", () => {
        const result = countBits(7);
        expect(result).toEqual([0,1,1,2,1,2,2,3])
    })
})


describe("getBinaryOfNumber", () => {
    test("Binary for Number 5", () => {
        const result = getBinaryOfNumber(5)
        expect(result).toEqual([1,0,1])
    })
    test("Binary for Number 4", () => {
        const result = getBinaryOfNumber(4)
        expect(result).toEqual([1,0,0])
    })
})
