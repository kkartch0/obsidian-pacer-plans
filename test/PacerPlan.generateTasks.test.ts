import { generateTasksForPacerPlan } from "../src/PacerPlan.helper";
import { Days } from "../src/Days";
import { PacerPlan } from "../src/PacerPlan";
import { Task } from "../src/Task";

describe("PacerPlan", () => {
    describe("generateTasks", () => {
        it("scenario 1: should generate tasks for the PacerPlan", () => {
            const plan = new PacerPlan();
            plan.title = "Getting Things Done";
            plan.summary = "Read Getting Things Done by David Allen";
            plan.quantityType = "Pages";
            plan.startDate = new Date(2024, 7, 19);
            plan.endDate = new Date(2024, 7, 23);
            plan.actionDays = Days.Monday | Days.Tuesday | Days.Thursday;
            plan.startNumber = 1;
            plan.endNumber = 352;

            const result = generateTasksForPacerPlan(plan);

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
            const plan = new PacerPlan();
            plan.title = "Math Problems";
            plan.summary = "Complete math problems from the textbook";
            plan.quantityType = "Problems";
            plan.startDate = new Date(2024, 8, 2);
            plan.endDate = new Date(2024, 8, 6);
            plan.actionDays = Days.Everyday;
            plan.startNumber = 1;
            plan.endNumber = 24;

            const result = generateTasksForPacerPlan(plan);

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
            const plan = new PacerPlan();
            plan.title = "Getting Things Done";
            plan.summary = "Read Getting Things Done by David Allen";
            plan.startDate = new Date(2024, 7, 19);
            plan.endDate = new Date(2024, 7, 23);
            plan.actionDays = Days.Saturday | Days.Sunday;
            plan.startNumber = 1;
            plan.endNumber = 352;

            const result = generateTasksForPacerPlan(plan);

            expect(result).toEqual([]);
        });

        it("should return an empty array if start date is after end date", () => {
            const plan = new PacerPlan();
            plan.title = "Getting Things Done";
            plan.summary = "Read Getting Things Done by David Allen";
            plan.startDate = new Date("2022-01-07");
            plan.endDate = new Date("2022-01-01");
            plan.actionDays = Days.Monday | Days.Wednesday | Days.Friday;
            plan.startNumber = 1;
            plan.endNumber = 352;

            const result = generateTasksForPacerPlan(plan);

            expect(result).toEqual([]);
        });
    });
});