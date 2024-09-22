import { calculateAvailableActionDates } from "./dateHelper";
import { PacerPlan } from "./PacerPlan";
import { Task } from "./Task";

export interface IDateProvider {
    today(): Date;
}

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
* Generates tasks for the specified PacerPlan according to the plan's action days, start date, end date, and total points.
*/
export function generateTasksForPacerPlan(plan: PacerPlan, dateProvider: IDateProvider): Task[] {

    const tasks: Task[] = [];

    if (plan.totalQuantity <= 0) {
        return tasks;
    }

    const todaysDate = dateProvider.today();
    const startDate = todaysDate > plan.startDate ? todaysDate : plan.startDate;

    const availableActionDates = calculateAvailableActionDates(startDate, plan.endDate, plan.actionDays);
    const quantityPerDay = plan.totalQuantity / availableActionDates.length;
    const wholePointsPerDay = Math.floor(quantityPerDay);

    let remainingExtraPoints = plan.totalQuantity % availableActionDates.length;
    let currentPoint = plan.startNumber;

    availableActionDates.forEach((currentDate) => {
        const endPoint = getEndPoint({ currentPoint, wholePointsPerDay, remainingExtraPoints, endNumber: plan.endNumber });
        const quantities = Array.from({ length: endPoint - currentPoint + 1 }, (_, i) => currentPoint + i);

        tasks.push(new Task({
            description: plan.title,
            quantityType: plan.quantityType,
            quantities,
            scheduledDate: currentDate,
            completed: false
        }));
        currentPoint = endPoint + 1;

        if (remainingExtraPoints > 0) {
            --remainingExtraPoints;
        }
    });

    return tasks;
}