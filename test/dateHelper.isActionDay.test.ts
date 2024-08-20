import { Days } from "../src/Days";
import { isActionDay} from "../src/dateHelper";

describe("isActionDay", () => {
    it("should return true if the given day is an action day", () => {
        const day = Days.Monday;
        const actionDays = Days.Monday | Days.Wednesday | Days.Friday;

        const result = isActionDay(day, actionDays);

        expect(result).toBe(true);
    });

    it("should return false if the given day is not an action day", () => {
        const day = Days.Tuesday;
        const actionDays = Days.Monday | Days.Wednesday | Days.Friday;

        const result = isActionDay(day, actionDays);

        expect(result).toBe(false);
    });
});