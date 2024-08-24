import { Task } from "../src/Task";

describe("toString", () => {
    it("should return the correct string representation of the task", () => {
        const task = new Task({
            description: "Sample Task",
            startPoint: 100,
            endPoint: 200,
            scheduledDate: new Date("2022-01-01"),
            completed: false
        });

        const result = task.toString();

        expect(result).toEqual("- [ ] Sample Task (100-200) ⏳ 2022-01-01");
    });

    it("should return the correct string representation when the task is completed", () => {
        const task = new Task({
            description: "Completed Task",
            startPoint: 50,
            endPoint: 100,
            scheduledDate: new Date("2022-02-01"),
            completed: true
        });

        const result = task.toString();

        expect(result).toEqual("- [x] Completed Task (50-100) ⏳ 2022-02-01");
    });
});