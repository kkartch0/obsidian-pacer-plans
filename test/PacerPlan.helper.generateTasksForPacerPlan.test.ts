import { generateTasksForPacerPlan } from "../src/PacerPlan.helper";
import { Days } from "../src/Days";
import { PacerPlan } from "../src/PacerPlan";
import { Task } from "../src/Task";

describe("PacerPlan", () => {
    describe("generateTasksForPacerPlan", () => {
        it("scenario 1: should generate tasks for the PacerPlan", () => {
            const plan = new PacerPlan({
                title: "Getting Things Done",
                summary: "Read Getting Things Done by David Allen",
                quantityType: "Pages",
                startDate: new Date(2024, 7, 19),
                endDate: new Date(2024, 7, 23),
                actionDays: Days.Monday | Days.Tuesday | Days.Thursday,
                startNumber: 1,
                endNumber: 352
            });

            const result = generateTasksForPacerPlan(plan, { today: () => new Date(2024, 7, 19) });

            expect(result).toEqual([
                {
                    description: "Getting Things Done",
                    quantityType: "Pages",
                    startPoint: 1,
                    endPoint: 118,
                    scheduledDate: new Date(2024, 7, 19),
                    completed: false
                },
                {
                    description: "Getting Things Done",
                    quantityType: "Pages",
                    startPoint: 119,
                    endPoint: 235,
                    scheduledDate: new Date(2024, 7, 20),
                    completed: false
                },
                {
                    description: "Getting Things Done",
                    quantityType: "Pages",
                    startPoint: 236,
                    endPoint: 352,
                    scheduledDate: new Date(2024, 7, 22),
                    completed: false
                }
            ]);
        });

        it("scenario 2: should generate tasks for the PacerPlan", () => {
            const plan = new PacerPlan({
                title: "Math Problems",
                summary: "Complete math problems from the textbook",
                quantityType: "Problems",
                startDate: new Date(2024, 8, 2),
                endDate: new Date(2024, 8, 6),
                actionDays: Days.Everyday,
                startNumber: 1,
                endNumber: 24
            });

            const result = generateTasksForPacerPlan(plan, { today: () => new Date(2024, 8, 2) });

            expect(result).toStrictEqual([
                new Task({
                    description: "Math Problems",
                    quantityType: "Problems",
                    startPoint: 1,
                    endPoint: 5,
                    scheduledDate: new Date(2024, 8, 2),
                    completed: false
                }),
                new Task({
                    description: "Math Problems",
                    quantityType: "Problems",
                    startPoint: 6,
                    endPoint: 10,
                    scheduledDate: new Date(2024, 8, 3),
                    completed: false
                }),
                new Task({
                    description: "Math Problems",
                    quantityType: "Problems",
                    startPoint: 11,
                    endPoint: 15,
                    scheduledDate: new Date(2024, 8, 4),
                    completed: false
                }),
                new Task({
                    description: "Math Problems",
                    quantityType: "Problems",
                    startPoint: 16,
                    endPoint: 20,
                    scheduledDate: new Date(2024, 8, 5),
                    completed: false
                }),
                new Task({
                    description: "Math Problems",
                    quantityType: "Problems",
                    startPoint: 21,
                    endPoint: 24,
                    scheduledDate: new Date(2024, 8, 6),
                    completed: false
                }),
            ]);
        });

        it("should return an empty array if there are no available action days", () => {
            const plan = new PacerPlan({
                title: "Getting Things Done",
                summary: "Read Getting Things Done by David Allen",
                startDate: new Date(2024, 7, 19),
                endDate: new Date(2024, 7, 23),
                actionDays: Days.Saturday | Days.Sunday,
                startNumber: 1,
                endNumber: 352,
            });

            const result = generateTasksForPacerPlan(plan, { today: () => new Date(2024, 7, 19) });

            expect(result).toEqual([]);
        });

        it("should return an empty array if start date is after end date", () => {
            const plan = new PacerPlan({
                title: "Getting Things Done",
                summary: "Read Getting Things Done by David Allen",
                startDate: new Date(2022, 1, 7),
                endDate: new Date(2022, 1, 1),
                actionDays: Days.Monday | Days.Wednesday | Days.Friday,
                startNumber: 1,
                endNumber: 352
            });

            const result = generateTasksForPacerPlan(plan, { today: () => new Date(2022, 1, 7) });

            expect(result).toEqual([]);
        });
    });
});