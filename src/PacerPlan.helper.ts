import { calculateAvailableActionDates } from "./dateHelpers";
import { IDateProvider } from "./dateProvider";
import { PacerPlan } from "./PacerPlan";
import { Task } from "./Task";

export function getCurrentTaskQuantity(
    {
        wholePointsPerDay,
        remainingExtraPoints,
    }: {
        wholePointsPerDay: number;
        remainingExtraPoints: number;
    }
): number {
    let currentTaskQuantity = wholePointsPerDay;
    if (remainingExtraPoints > 0) {
        currentTaskQuantity += 1;
    }
    return currentTaskQuantity;
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

    let availableActionDates = calculateAvailableActionDates(startDate, plan.endDate, plan.actionDays);

    const includeTodayWhenItHasCompletedTask = true;
    const todayHasCompletedTask = plan.tasks.some(task => { 
        const dateIsToday = datesAreEqual(task.scheduledDate, todaysDate);
        return task.completed && dateIsToday; 
    });

    if (includeTodayWhenItHasCompletedTask && todayHasCompletedTask) {
        // remove todaysDate from the list of availableActionDates
        availableActionDates = availableActionDates.filter(date => !datesAreEqual(date, todaysDate));
    }

    if (availableActionDates.length === 0) {
        return tasks;
    }

    const completedTasks = plan.tasks.filter(task => task.completed);
    tasks.push(...completedTasks);

    const quantitiesRemaining = getQuantitiesRemaining(plan);
    const totalQuantity = quantitiesRemaining.length;

    const quantityPerDay = totalQuantity / availableActionDates.length;
    const wholePointsPerDay = Math.floor(quantityPerDay);

    let remainingExtraPoints = totalQuantity % availableActionDates.length;
    let currentPoint = 0;

    availableActionDates.forEach((currentDate) => {
        const currentTaskQuantity = getCurrentTaskQuantity({ wholePointsPerDay, remainingExtraPoints });
        const quantities = quantitiesRemaining.slice(currentPoint, currentPoint + currentTaskQuantity);

        tasks.push(new Task({
            description: plan.title,
            quantityType: plan.quantityType,
            quantities,
            scheduledDate: currentDate,
            completed: false
        }));

        currentPoint += currentTaskQuantity;

        if (remainingExtraPoints > 0) {
            --remainingExtraPoints;
        }
    });

    return tasks;
}


/**
 * Returns a flat list of quatities from the specified tasks for each task that is not completed.
 */
function getQuantitiesRemaining(plan: PacerPlan): number[] {
    if (plan.tasks.length > 0) {
        return plan.tasks
            .filter(task => !task.completed)
            .reduce((quantities, task) => quantities.concat(task.quantities), [] as number[]);
    } else {
        // return an array of numbers from startNumber to endNumber
        return Array.from({ length: plan.totalQuantity }, (_, i) => plan.startNumber + i);
    }
}

function datesAreEqual(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}