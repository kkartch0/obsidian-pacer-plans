import { Task } from "../src/Task";
import { Days } from "../src/Days";
import { PacerPlan } from "../src/PacerPlan";

describe("PacerPlan", () => {
    describe("toString", () => {
        it("should return the string representation of the PacerPlan", () => {
            // Arrange
            const plan = new PacerPlan({
                title: "Getting Things Done",
                summary: "Read Getting Things Done by David Allen",
                quantityType: "Pages",
                startDate: new Date(2024, 7, 19),
                endDate: new Date(2024, 7, 23),
                actionDays: Days.Monday | Days.Tuesday | Days.Thursday,
                startNumber: 22,
                endNumber: 352,
                tasks: [
                    new Task({
                        description: "Getting Things Done",
                        quantityType: "Pages",
                        startPoint: 22,
                        endPoint: 132,
                        scheduledDate: new Date(2024, 7, 19),
                        completed: true
                    }),
                    new Task({
                        description: "Getting Things Done",
                        quantityType: "Pages",
                        startPoint: 133,
                        endPoint: 242,
                        scheduledDate: new Date(2024, 7, 20),
                        completed: false
                    }),
                    new Task({
                        description: "Getting Things Done",
                        quantityType: "Pages",
                        startPoint: 243,
                        endPoint: 352,
                        scheduledDate: new Date(2024, 7, 22),
                        completed: false
                    })
                ]
            });

            // Act
            const result = plan.toString();

            // Assert
            expect(result).toEqual(`---
summary: Read Getting Things Done by David Allen
startDate: 2024-08-19
endDate: 2024-08-23
actionDays: MTR
quantityType: Pages
startNumber: 22
endNumber: 352
---
- [x] Getting Things Done (pages 22-132) ⏳ 2024-08-19
- [ ] Getting Things Done (pages 133-242) ⏳ 2024-08-20
- [ ] Getting Things Done (pages 243-352) ⏳ 2024-08-22
`);
        });
    });
});