import { Task } from "../src/Task";

describe("toString", () => {
    describe("when start and end points are the same", () => {
        describe("when the task is not completed", () => {
            it("returns the correct string representation", () => {
                const task = new Task({
                    description: "Completed Task",
                    quantityType: "Pages",
                    quantities: [100],
                    scheduledDate: new Date("2022-01-01"),
                    completed: false
                });

                const result = task.toString();

                expect(result).toEqual("- [ ] Completed Task (page 100) ⏳ 2022-01-01");
            });
        });

        describe("when the task is completed", () => {
            it("returns the correct string representation", () => {
                const task = new Task({
                    description: "Sample Task",
                    quantityType: "Pages",
                    quantities: [100],
                    scheduledDate: new Date("2022-01-01"),
                    completed: true
                });

                const result = task.toString();

                expect(result).toEqual("- [x] Sample Task (page 100) ⏳ 2022-01-01");
            });
        });
    });

    describe("when start and end points are different", () => {
        describe("when the task is not completed", () => {
            it("returns the correct string representation", () => {
                const task = new Task({
                    description: "Sample Task",
                    quantityType: "Pages",
                    quantities: [55, 56, 57, 58, 59, 60],
                    scheduledDate: new Date("2022-02-01"),
                    completed: false
                });

                const result = task.toString();

                expect(result).toEqual("- [ ] Sample Task (pages 55-60) ⏳ 2022-02-01");
            });
        });

        describe("when the task is completed", () => {
            it("returns the correct string representation", () => {
                const task = new Task({
                    description: "Completed Task",
                    quantityType: "Pages",
                    quantities: [50, 51, 52, 53, 54, 55],
                    scheduledDate: new Date("2022-02-01"),
                    completed: true
                });

                const result = task.toString();

                expect(result).toEqual("- [x] Completed Task (pages 50-55) ⏳ 2022-02-01");
            });
        });
    });

    describe("when there are tags", () => {
        it("returns the correct string representation", () => {
            const task = new Task({
                description: "Sample Task",
                quantityType: "Pages",
                quantities: [55, 56, 57, 58, 59, 60],
                scheduledDate: new Date("2022-02-01"),
                completed: false,
                tags: ["work", "book"]
            });

            const result = task.toString();

            expect(result).toEqual("- [ ] Sample Task (pages 55-60) #work #book ⏳ 2022-02-01");
        });
    });
});