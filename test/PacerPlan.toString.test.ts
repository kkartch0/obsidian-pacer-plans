import { Task } from "../src/Task";
import { Days } from "../src/Days";
import { PacerPlan } from "../src/PacerPlan";

describe("PacerPlan", () => {
    describe("toString", () => {
        it("should return the string representation of the PacerPlan", () => {
            // Arrange
            const plan = new PacerPlan({
                title: "Book",
                summary: "Read Book by Author",
                quantityType: "Pages",
                startDate: new Date(2024, 7, 19),
                endDate: new Date(2024, 7, 23),
                actionDays: Days.Monday | Days.Tuesday | Days.Thursday,
                startNumber: 5,
                endNumber: 19,
                tasks: [
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [5, 6, 7, 8, 9],
                        scheduledDate: new Date(2024, 7, 19),
                        completed: true
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [10, 11, 12, 13, 14],
                        scheduledDate: new Date(2024, 7, 20),
                        completed: false
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [15, 16, 17, 18, 19],
                        scheduledDate: new Date(2024, 7, 22),
                        completed: false
                    })
                ]
            });

            // Act
            const result = plan.toString();

            // Assert
            expect(result).toEqual(`---
summary: Read Book by Author
startDate: 2024-08-19
endDate: 2024-08-23
actionDays: MTR
quantityType: Pages
startNumber: 5
endNumber: 19
---
- [x] Book (pages 5-9) ⏳ 2024-08-19
- [ ] Book (pages 10-14) ⏳ 2024-08-20
- [ ] Book (pages 15-19) ⏳ 2024-08-22
`);
        });
    });
});