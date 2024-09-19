import { Days } from "../src/Days";
import { createPacerPlanFromString } from "../src/pacerPlanStringParsing";
import { PacerPlan } from "../src/PacerPlan";

describe("createPacerPlanFromString", () => {
    it("should create a PacerPlan object from a string representation", () => {
        const planTitle = "Getting Things Done";
        const planContent = `---
summary: Read Getting Things Done by David Allen
startDate: 2024-08-19
endDate: 2024-08-23
actionDays: MTR
quantityType: Pages
startNumber: 22
endNumber: 352
---
- [x] Getting Things Done (22-132) ⏳ 2024-08-19
- [ ] Getting Things Done (133-242) ⏳ 2024-08-20
- [ ] Getting Things Done (243-352) ⏳ 2024-08-22
`;


        // Act
        const result = createPacerPlanFromString(planTitle, planContent);

        // Assert
        const expectedPlan = new PacerPlan({
            title: "Getting Things Done",
            summary: "Read Getting Things Done by David Allen",
            startDate: new Date("2024-08-19"),
            endDate: new Date("2024-08-23"),
            actionDays: Days.Monday | Days.Tuesday | Days.Thursday,
            quantityType: "Pages",
            startNumber: 22,
            endNumber: 352,
            tasks: [
                {
                    description: "Getting Things Done",
                    quantityType: "Pages",
                    startPoint: 22,
                    endPoint: 132,
                    completed: true,
                    scheduledDate: new Date("2024-08-19")
                },
                {
                    description: "Getting Things Done",
                    quantityType: "Pages",
                    startPoint: 133,
                    endPoint: 242,
                    completed: false,
                    scheduledDate: new Date("2024-08-20")
                },
                {
                    description: "Getting Things Done",
                    quantityType: "Pages",
                    startPoint: 243,
                    endPoint: 352,
                    completed: false,
                    scheduledDate: new Date("2024-08-22")
                }
            ]
        }
        );
        expect(result).toEqual(expectedPlan);
    });
});