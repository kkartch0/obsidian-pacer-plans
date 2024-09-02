import { Task } from "../src/Task";
import { Days } from "../src/Days";
import { PacerPlan } from "../src/PacerPlan";

describe("PacerPlan", () => {
    describe("toString", () => {
        it("should return the string representation of the PacerPlan", () => {
            const plan = new PacerPlan();
            plan.title = "Getting Things Done";
            plan.summary = "Read Getting Things Done by David Allen";
            plan.startDate = new Date(2024, 7, 19);
            plan.endDate = new Date(2024, 7, 23);
            plan.actionDays = Days.Monday | Days.Tuesday | Days.Thursday;
            plan.startNumber = 22;
            plan.endNumber = 352;
            plan.tasks = [ 
                new Task({
                    description: "Getting Things Done",
                    startPoint: 22,
                    endPoint: 132,
                    scheduledDate: new Date(2024, 7, 19),
                    completed: true
                }),
                new Task({
                    description: "Getting Things Done",
                    startPoint: 133,
                    endPoint: 242,
                    scheduledDate: new Date(2024, 7, 20),
                    completed: false
                }),
                new Task({
                    description: "Getting Things Done",
                    startPoint: 243,
                    endPoint: 352,
                    scheduledDate: new Date(2024, 7, 22),
                    completed: false
                })
            ];

            const result = plan.toString();

            expect(result).toEqual(`---
title: Getting Things Done
summary: Read Getting Things Done by David Allen
startDate: 2024-08-19
endDate: 2024-08-23
actionDays: MTR
startNumber: 22
endNumber: 352
---
- [x] Getting Things Done (22-132) ⏳ 2024-08-19
- [ ] Getting Things Done (133-242) ⏳ 2024-08-20
- [ ] Getting Things Done (243-352) ⏳ 2024-08-22
`);
        });
    });
});