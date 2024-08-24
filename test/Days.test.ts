import { daysToShortString, Days } from "../src/Days";

describe("daysToShortString", () => {
    it("should return an empty string for Days.None", () => {
        const result = daysToShortString(Days.None);
        expect(result).toEqual("");
    });

    it("should return the correct short string for a single day", () => {
        const result = daysToShortString(Days.Monday);
        expect(result).toEqual("M");
    });

    it("should return the correct short string for multiple days", () => {
        const result = daysToShortString(Days.Monday | Days.Wednesday | Days.Friday);
        expect(result).toEqual("MWF");
    });

    it("should return the correct short string for all days", () => {
        const result = daysToShortString(Days.Everyday);
        expect(result).toEqual("MTWRFSU");
    });
});