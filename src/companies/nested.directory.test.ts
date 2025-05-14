import { toggleFolder, sampleFiles } from "@/companies/nested.directory"

describe("nested.directory - ToggleFolder ", () => {
    test("toggle companies", () => {
        const result = toggleFolder("src/companies".split("/"), [...sampleFiles]);
        expect(result?.[0].files?.[0].isOpen).toBe(true)
    })
    test("toggle nested.directory.ts should be undefined", () => {
        const result = toggleFolder("src/companies/nested.directory.ts".split("/"), [...sampleFiles]);
        expect(result?.[0].files?.[0].files?.[0]?.isOpen).toBe(undefined)
    })
})