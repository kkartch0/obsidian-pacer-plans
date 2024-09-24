import { availableDays } from "../src/dateHelpers";

describe('daysBetween', () => {
    it('should return the correct number of days between two dates', () => {
        const startDate = new Date('2022-01-01');
        const endDate = new Date('2022-01-10');
        const result = availableDays(startDate, endDate);
        expect(result).toBe(10);
    });

    it('should return 0 when the start and end dates are the same', () => {
        const startDate = new Date('2022-01-01');
        const endDate = new Date('2022-01-01');
        const result = availableDays(startDate, endDate);
        expect(result).toBe(1);
    });

    it('should return zero when the end date is before the start date', () => {
        const startDate = new Date('2022-01-10');
        const endDate = new Date('2022-01-01');
        const result = availableDays(startDate, endDate);
        expect(result).toBe(0);
    });
});
