import { IDateProvider, PacerPlan } from "./PacerPlan";
import { Task } from "./Task";

export function getEndPoint(
    {
        currentPoint,
        wholePointsPerDay,
        remainingExtraPoints,
        endNumber
    }: {
        currentPoint: number;
        wholePointsPerDay: number;
        remainingExtraPoints: number;
        endNumber: number;
    }
): number {
    let endPoint = currentPoint + wholePointsPerDay - 1;
    endPoint += remainingExtraPoints > 0 ? 1 : 0;
    endPoint = Math.min(endPoint, endNumber);
    return endPoint;
}

export function getFarthestCompletedPoint(tasks: Task[]): number {
    let furthestCompletedPoint = 0;
    tasks.forEach((task) => {
        if (task.completed && task.endPoint > furthestCompletedPoint) {
            furthestCompletedPoint = task.endPoint;
        }
    });
    return furthestCompletedPoint;
}

/**
* Generates tasks for the specified PacerPlan according to the plan's action days, start date, end date, and total points.
*/
export function generateTasksForPacerPlan(plan: PacerPlan,
    startingPoint: number, dateProvider: IDateProvider): Task[] {

    const tasks: Task[] = [];

    if (plan.totalQuantity <= 0) {
        return tasks;
    }

    const wholePointsPerDay = Math.floor(plan.quantityPerDay);
    const availableActionDates = plan.availableActionDates;

    let remainingExtraPoints = plan.totalQuantity % availableActionDates.length;
    let currentPoint = startingPoint;

    const todaysDate = dateProvider.today();
    const originalStartDate = plan.startDate;

    plan.startDate = todaysDate > originalStartDate ? todaysDate : plan.startDate;

    plan.availableActionDates.forEach((currentDate) => {
        const endPoint = getEndPoint({ currentPoint, wholePointsPerDay, remainingExtraPoints, endNumber: plan.endNumber });

        tasks.push(new Task({
            description: plan.title,
            quantityType: plan.quantityType,
            startPoint: currentPoint,
            endPoint: endPoint,
            scheduledDate: currentDate,
            completed: false
        }));
        currentPoint = endPoint + 1;

        if (remainingExtraPoints > 0) {
            --remainingExtraPoints;
        }
    });

    plan.startDate = originalStartDate;

    return tasks;
}
