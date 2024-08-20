import { calculateAvailableActionDates } from "./dateHelper";
import { Days } from "./Days";
import { GetEndPoint } from "./PacerPlan.helper";
import { Task } from "./Task";

export class PacerPlan {
    title: string;
    summary: string
    startDate: Date;
    endDate: Date;
    actionDays: Days;
    totalPoints: number;
    tasks: Task[];

    /**
     * Generates tasks for the PacerPlan according to the action days, start date, end date, and total points.
     */
    generateTasks(): Task[] {
        const tasks: Task[] = [];
        const availableActionDates = calculateAvailableActionDates(this.startDate, this.endDate, this.actionDays);
        const wholePointsPerDay = Math.floor(this.totalPoints / availableActionDates.length);
        let remainingExtraPoints = this.totalPoints % availableActionDates.length;
        let currentPoint = 1;

        availableActionDates.forEach((currentDate, index) => {
            const endPoint = GetEndPoint({ currentPoint, wholePointsPerDay, remainingExtraPoints, totalPoints: this.totalPoints });

            tasks.push({
                description: this.title,
                startPoint: currentPoint,
                endPoint: endPoint,
                scheduledDate: currentDate,
                completed: false
            });
            currentPoint = endPoint + 1;

            if (remainingExtraPoints > 0) {
                --remainingExtraPoints;
            }
        });

        this.tasks = tasks;
        return tasks;
    }
}