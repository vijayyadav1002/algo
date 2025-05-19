import { findMaxConsecutiveOnes } from "./max.consecutive.ones";

describe("findMaxConsecutiveOnes", () => {
    test("[1,1,1,0,1,1] is 3", () => {
        const result = findMaxConsecutiveOnes([1,1,1,0,1,1]);
        expect(result).toBe(3);
    })
    test("[1,1,1,0,1,1,1,1] is 4", () => {
        const result = findMaxConsecutiveOnes([1,1,1,0,1,1,1,1]);
        expect(result).toBe(4);
    })
})