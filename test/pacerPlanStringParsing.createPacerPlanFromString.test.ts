import { Days } from "../src/Days";
import { createPacerPlanFromString } from "../src/pacerPlanStringParsing";
import { PacerPlan } from "../src/PacerPlan";
import { Task } from "../src/Task";

describe("createPacerPlanFromString", () => {
    it("should create a PacerPlan object from a string representation", () => {
        const planTitle = "Book";
        const planContent = `---
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
`;

        // Act
        const result = createPacerPlanFromString(planTitle, planContent);

        // Assert
        const expectedPlan = new PacerPlan({
            title: "Book",
            summary: "Read Book by Author",
            startDate: new Date(2024, 7, 19),
            endDate: new Date(2024, 7, 23),
            actionDays: Days.Monday | Days.Tuesday | Days.Thursday,
            quantityType: "Pages",
            startNumber: 5,
            endNumber: 19,
            tasks: [
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [5, 6, 7, 8, 9],
                    completed: true,
                    scheduledDate: new Date(2024, 7, 19)
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [10, 11, 12, 13, 14],
                    completed: false,
                    scheduledDate: new Date(2024, 7, 20)
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [15, 16, 17, 18, 19],
                    completed: false,
                    scheduledDate: new Date(2024, 7, 22)
                })
            ]
        }
        );
        expect(result).toEqual(expectedPlan);
    });

    it("when some tasks are singular quanity: should create a PacerPlan object from a string representation", () => {
        const planTitle = "Book";
        const planContent = `---
summary: Read Book by Author 
startDate: 2024-08-19
endDate: 2024-08-23
actionDays: MTR
quantityType: Pages
startNumber: 1
endNumber: 4
---
- [x] Book (pages 1-2) ⏳ 2024-08-19 ✅ 2024-08-19
- [ ] Book (page 3) ⏳ 2024-08-20
- [ ] Book (page 4) ⏳ 2024-08-22
`;


        // Act
        const result = createPacerPlanFromString(planTitle, planContent);

        // Assert
        const expectedPlan = new PacerPlan({
            title: "Book",
            summary: "Read Book by Author",
            startDate: new Date(2024, 7, 19),
            endDate: new Date(2024, 7, 23),
            actionDays: Days.Monday | Days.Tuesday | Days.Thursday,
            quantityType: "Pages",
            startNumber: 1,
            endNumber: 4,
            tasks: [
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [1, 2],
                    completed: true,
                    scheduledDate: new Date(2024, 7, 19),
                    additionalProperties: " ✅ 2024-08-19"
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [3],
                    completed: false,
                    scheduledDate: new Date(2024, 7, 20),
                    additionalProperties: ""
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [4],
                    completed: false,
                    scheduledDate: new Date(2024, 7, 22),
                    additionalProperties: ""
                })
            ]
        }
        );
        expect(result).toEqual(expectedPlan);
    });

    it("when plan has tags: should create a PacerPlan object from a string representation", () => {
        const planTitle = "Book";
        const planContent = `---
summary: Read Book by Author
startDate: 2024-08-19
endDate: 2024-08-23
actionDays: MTR
quantityType: Pages
startNumber: 1
endNumber: 4
tags:
  - work
  - book
---
- [x] Book (pages 1-2) #work #book ⏳ 2024-08-19
- [ ] Book (page 3) #work #book ⏳ 2024-08-20
`;
    });
});