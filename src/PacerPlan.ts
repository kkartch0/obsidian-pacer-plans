import { calculateAvailableActionDates } from "./dateHelper";
import { Days, daysToShortString } from "./Days";
import { GetEndPoint } from "./PacerPlan.helper";
import { Task } from "./Task";

export class PacerPlan {
    title: string;
    summary: string;
    startDate: Date;
    endDate: Date;
    actionDays: Days;
    startNumber: number;
    endNumber: number;

    tasks: Task[];
    quantityType: string;

    constructor(
        {
            title,
            summary,
            startDate,
            endDate,
            actionDays,
            startNumber,
            endNumber,
            tasks
        }: {
            title?: string,
            summary?: string,
            startDate?: Date,
            endDate?: Date,
            actionDays?: Days,
            startNumber?: number,
            endNumber?: number,
            totalQuantity?: number, tasks?: Task[]
        } = {}) {
        this.title = title || "";
        this.summary = summary || "";
        this.startDate = startDate || new Date();
        this.endDate = endDate || new Date();
        this.actionDays = actionDays || Days.None;
        this.startNumber = startNumber || 0;
        this.endNumber = endNumber || 0;
        this.tasks = tasks || [];
    }

    get totalQuantity(): number {
        return this.endNumber - this.startNumber + 1;
    }

    /**
     * Generates tasks for the PacerPlan according to the action days, start date, end date, and total points.
     */
    generateTasks(): Task[] {
        const tasks: Task[] = [];

        if (this.totalQuantity <= 0) {
            return tasks;
        }

        const availableActionDates = calculateAvailableActionDates(this.startDate, this.endDate, this.actionDays);
        const wholePointsPerDay = Math.floor(this.totalQuantity / availableActionDates.length);

        let remainingExtraPoints = this.totalQuantity % availableActionDates.length;
        let currentPoint = this.startNumber;

        availableActionDates.forEach((currentDate, index) => {
            const endPoint = GetEndPoint({ currentPoint, wholePointsPerDay, remainingExtraPoints, endNumber: this.endNumber });

            tasks.push(new Task({
                description: this.title,
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

        this.tasks = tasks;
        return tasks;
    }

    toString(): string {
        let tasksString = this.tasks.map(task => task.toString()).join("\n");

        return `---
title: ${this.title}
summary: ${this.summary}
startDate: ${this.startDate.toISOString().slice(0, 10)}
endDate: ${this.endDate.toISOString().slice(0, 10)}
actionDays: ${daysToShortString(this.actionDays)}
startNumber: ${this.startNumber}
endNumber: ${this.endNumber}
---
${tasksString}
`;
    }
}