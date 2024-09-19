import { Task } from "../src/Task";

describe("toString", () => {
    describe("when start and end points are the same", () => {
        describe("when the task is not completed", () => {
            it("returns the correct string representation", () => {
                const task = new Task({
                    description: "Completed Task",
                    quantityType: "Pages",
                    startPoint: 100,
                    endPoint: 100,
                    scheduledDate: new Date("2022-01-01"),
                    completed: false
                });

                const result = task.toString();

                expect(result).toEqual("- [ ] Completed Task (100) ⏳ 2022-01-01");
            });
        });

        describe("when the task is completed", () => {
            it("returns the correct string representation", () => {
                const task = new Task({
                    description: "Sample Task",
                    quantityType: "Pages",
                    startPoint: 100,
                    endPoint: 100,
                    scheduledDate: new Date("2022-01-01"),
                    completed: true
                });

                const result = task.toString();

                expect(result).toEqual("- [x] Sample Task (100) ⏳ 2022-01-01");
            });
        });
    });

    describe("when start and end points are different", () => {
        describe("when the task is not completed", () => {
            it("returns the correct string representation", () => {
                const task = new Task({
                    description: "Sample Task",
                    quantityType: "Pages",
                    startPoint: 50,
                    endPoint: 100,
                    scheduledDate: new Date("2022-02-01"),
                    completed: false
                });

                const result = task.toString();

                expect(result).toEqual("- [ ] Sample Task (50-100) ⏳ 2022-02-01");
            });
        });

        describe("when the task is completed", () => {
            it("returns the correct string representation", () => {
                const task = new Task({
                    description: "Completed Task",
                    quantityType: "Pages",
                    startPoint: 50,
                    endPoint: 100,
                    scheduledDate: new Date("2022-02-01"),
                    completed: true
                });

                const result = task.toString();

                expect(result).toEqual("- [x] Completed Task (50-100) ⏳ 2022-02-01");
            });
        });
    });
});