import { Days } from "../src/Days";
import { calculateAvailableActionDates } from "../src/dateHelpers";

describe("calculateAvailableActionDates", () => {
    it("should return an empty array if there are no available action days", () => {
        const startDate = new Date(2024, 7, 19);
        const endDate = new Date(2024, 7, 23);
        const actionDays = Days.Saturday | Days.Sunday;

        const result = calculateAvailableActionDates(startDate, endDate, actionDays);

        expect(result).toEqual([]);
    });

    it("should return an empty array if endDate is invalid or null", () => {
        const startDate = new Date("2022-01-01");
        const endDate = null;
        const actionDays = Days.Monday | Days.Wednesday | Days.Friday;

        const result = calculateAvailableActionDates(startDate, endDate, actionDays);

        expect(result).toEqual([]);
    });

    it("should return an empty array if startDate is invalid or null", () => {
        const startDate = null;
        const endDate = new Date("2022-01-01");
        const actionDays = Days.Monday | Days.Wednesday | Days.Friday;

        const result = calculateAvailableActionDates(startDate, endDate, actionDays);

        expect(result).toEqual([]);
    });

    it("should return an array of available action days within the given range", () => {
        const startDate = new Date(2024, 7, 18);
        const endDate = new Date(2024, 7, 24);
        const actionDays = Days.Monday | Days.Saturday | Days.Sunday;

        const result = calculateAvailableActionDates(startDate, endDate, actionDays);

        expect(result).toEqual([
            new Date(2024, 7, 18), 
            new Date(2024, 7, 19), 
            new Date(2024, 7, 24)
        ]);
    });

    it("should return an array of available action days when start date and end date are the same", () => {
        const startDate = new Date("2022-01-01");
        const endDate = new Date("2022-01-01");
        const actionDays = Days.Monday | Days.Wednesday | Days.Friday;

        const result = calculateAvailableActionDates(startDate, endDate, actionDays);

        expect(result).toEqual([
            new Date("2022-01-01"),
        ]);
    });

    it("should return an empty array if start date is after end date", () => {
        const startDate = new Date("2022-01-07");
        const endDate = new Date("2022-01-01");
        const actionDays = Days.Monday | Days.Wednesday | Days.Friday;

        const result = calculateAvailableActionDates(startDate, endDate, actionDays);

        expect(result).toEqual([]);
    });
});