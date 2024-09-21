import { PacerPlan } from "./PacerPlan";
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

/**
 * Generates tasks for the PacerPlan according to the action days, start date, end date, and total points.
 */
export function generateTasksForPacerPlan(plan: PacerPlan): Task[] {
    const tasks: Task[] = [];

    if (plan.totalQuantity <= 0) {
        return tasks;
    }
    const wholePointsPerDay = Math.floor(plan.quantityPerDay);
    const availableActionDates = plan.availableActionDates;

    let remainingExtraPoints = plan.totalQuantity % availableActionDates.length;
    let currentPoint = plan.startNumber;

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

    plan.tasks = tasks;
    return tasks;
}

