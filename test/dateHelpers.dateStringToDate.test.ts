
import { dateStringToDate } from "../src/dateHelpers";

describe("dateStringToDate", () => {
    it("should convert a valid date string to a Date object", () => {
        const dateString = "2023-10-05";
        const expectedDate = new Date(2023, 9, 5); // Note: months are 0-indexed in JavaScript Date
        const result = dateStringToDate(dateString);
        expect(result).toEqual(expectedDate);
    });

    it("should handle single-digit months and days correctly", () => {
        const dateString = "2023-01-09";
        const expectedDate = new Date(2023, 0, 9); // January is month 0
        const result = dateStringToDate(dateString);
        expect(result).toEqual(expectedDate);
    });

    it("should return an invalid date for an invalid date string", () => {
        const dateString = "invalid-date";
        const result = dateStringToDate(dateString);
        expect(result.toString()).toBe("Invalid Date");
    });

    it("should handle leap years correctly", () => {
        const dateString = "2020-02-29";
        const expectedDate = new Date(2020, 1, 29); // February is month 1
        const result = dateStringToDate(dateString);
        expect(result).toEqual(expectedDate);
    });

    it("should handle end of month correctly", () => {
        const dateString = "2023-02-28";
        const expectedDate = new Date(2023, 1, 28); // February is month 1
        const result = dateStringToDate(dateString);
        expect(result).toEqual(expectedDate);
    });
});