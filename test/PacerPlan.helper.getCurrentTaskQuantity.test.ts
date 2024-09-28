import { getCurrentTaskQuantity } from "../src/PacerPlan.helper";

describe("getCurrentTaskQuantity", () => {
    it("should calculate the correct end point when there are no remaining extra points", () => {
        const result = getCurrentTaskQuantity({ 
            wholePointsPerDay: 50, 
            remainingExtraPoints: 0,
        });

        expect(result).toEqual(50);
    });

    it("should calculate the correct end point when there are remaining extra points", () => {
        const result = getCurrentTaskQuantity({ 
            wholePointsPerDay: 50, 
            remainingExtraPoints: 10,
        });

        expect(result).toEqual(51);
    });

    it("should not exceed the total points as the end point", () => {
        const result = getCurrentTaskQuantity({ 
            wholePointsPerDay: 100, 
            remainingExtraPoints: 50,
        });

        expect(result).toEqual(101);
    });
});