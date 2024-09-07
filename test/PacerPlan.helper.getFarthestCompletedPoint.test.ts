import { Task } from "../src/Task";
import { getFarthestCompletedPoint } from "../src/PacerPlan.helper";

describe("getFarthestCompletedPoint", () => {
    it("should return 0 if there are no completed tasks", () => {
        const tasks: Task[] = [
            { description: "Task 1", quantityType: "Pages", startPoint: 1, endPoint: 5, scheduledDate: new Date(), completed: false },
            { description: "Task 2", quantityType: "Pages", startPoint: 6, endPoint: 10, scheduledDate: new Date(), completed: false },
            { description: "Task 3", quantityType: "Pages", startPoint: 11, endPoint: 15, scheduledDate: new Date(), completed: false }
        ];

        const result = getFarthestCompletedPoint(tasks);

        expect(result).toBe(0);
    });

    it("should return the highest endPoint of non-consecutively completed tasks", () => {
        const tasks: Task[] = [
            { description: "Task 1", quantityType: "Pages", startPoint: 1, endPoint: 5, scheduledDate: new Date(), completed: true },
            { description: "Task 2", quantityType: "Pages", startPoint: 6, endPoint: 10, scheduledDate: new Date(), completed: false },
            { description: "Task 3", quantityType: "Pages", startPoint: 11, endPoint: 15, scheduledDate: new Date(), completed: true }
        ];

        const result = getFarthestCompletedPoint(tasks);

        expect(result).toBe(15);
    });

    it("should return the highest endPoint of consecutively completed tasks", () => {
        const tasks: Task[] = [
            { description: "Task 1", quantityType: "Pages", startPoint: 1, endPoint: 5, scheduledDate: new Date(), completed: true },
            { description: "Task 2", quantityType: "Pages", startPoint: 6, endPoint: 10, scheduledDate: new Date(), completed: true },
            { description: "Task 3", quantityType: "Pages", startPoint: 11, endPoint: 15, scheduledDate: new Date(), completed: true }
        ];

        const result = getFarthestCompletedPoint(tasks);

        expect(result).toBe(15);
    });
});