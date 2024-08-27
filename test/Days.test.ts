import { daysToShortString, Days, shortStringToDays } from "../src/Days";

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
        expect(result).toEqual("UMTWRFS");
    });
});

describe("shortStringToDays", () => {
    it("should return Days.None for an empty string", () => {
        const result = shortStringToDays("");
        expect(result).toEqual(Days.None);
    });

    it("should return the correct Days enum value for a single day", () => {
        const result = shortStringToDays("M");
        expect(result).toEqual(Days.Monday);
    });

    it("should return the correct Days enum value for multiple days", () => {
        const result = shortStringToDays("MWF");
        expect(result).toEqual(Days.Monday | Days.Wednesday | Days.Friday);
    });

    it("should return the correct Days enum value for all days", () => {
        const result = shortStringToDays("UMTWRFS");
        expect(result).toEqual(Days.Everyday);
    });
});