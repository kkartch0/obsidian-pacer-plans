import { createTaskFromTaskString } from "../src/pacerPlanStringParsing";
import { Task } from "../src/Task";

describe("createTaskFromTaskString", () => {
    it("should create a Task object from a task string", () => {
        const taskString = "- [x] Getting Things Done (1-11) ⏳ 2024-08-19";
        const expectedTask = new Task({
            description: "Getting Things Done",
            quantityType: "Pages",
            quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            completed: true,
            scheduledDate: new Date("2024-08-19")
        });

        const result = createTaskFromTaskString(taskString, "Pages");

        expect(result).toEqual(expectedTask);
    });
});