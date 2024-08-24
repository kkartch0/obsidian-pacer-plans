import { Task } from "../src/Task";

describe("toString", () => {
    it("should return the correct string representation of the task", () => {
        const task = new Task();
        task.description = "Sample Task";
        task.startPoint = 100;
        task.endPoint = 200;
        task.scheduledDate = new Date("2022-01-01");
        task.completed = false;

        const result = task.toString();

        expect(result).toEqual("- [ ] Sample Task (100-200) ⏳ 2022-01-01");
    });

    it("should return the correct string representation when the task is completed", () => {
        const task = new Task();
        task.description = "Completed Task";
        task.startPoint = 50;
        task.endPoint = 100;
        task.scheduledDate = new Date("2022-02-01");
        task.completed = true;

        const result = task.toString();

        expect(result).toEqual("- [x] Completed Task (50-100) ⏳ 2022-02-01");
    });
});