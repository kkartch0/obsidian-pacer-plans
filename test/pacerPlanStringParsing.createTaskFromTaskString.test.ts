import { createTaskFromTaskString } from "../src/pacerPlanStringParsing";
import { Task } from "../src/Task";

describe("createTaskFromTaskString", () => {
    it("should create a Task object from a task string", () => {
        const taskString = "- [x] Getting Things Done (1-118) ⏳ 2024-08-19";
        const expectedTask = new Task({
            description: "Getting Things Done",
            startPoint: 1,
            endPoint: 118,
            completed: true,
            scheduledDate: new Date("2024-08-19")
        });

        const result = createTaskFromTaskString(taskString);

        expect(result).toEqual(expectedTask);
    });
});