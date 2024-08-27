import { GetEndPoint } from "../src/PacerPlan.helper";

describe("GetEndPoint", () => {
    it("should calculate the correct end point when there are no remaining extra points", () => {
        const result = GetEndPoint({ 
            currentPoint: 100, 
            wholePointsPerDay: 50, 
            remainingExtraPoints: 0,
            totalQuantity: 149
        });

        expect(result).toEqual(149);
    });

    it("should calculate the correct end point when there are remaining extra points", () => {
        const result = GetEndPoint({ 
            currentPoint: 200, 
            wholePointsPerDay: 50, 
            remainingExtraPoints: 10,
            totalQuantity: 249
        });

        expect(result).toEqual(249);
    });

    it("should not exceed the total points as the end point", () => {
        const result = GetEndPoint({ 
            currentPoint: 300, 
            wholePointsPerDay: 100, 
            remainingExtraPoints: 50,
            totalQuantity: 350
        });

        expect(result).toEqual(350);
    });
});