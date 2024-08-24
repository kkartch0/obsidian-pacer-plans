import { calculateAvailableActionDates } from "./dateHelper";
import { Days, daysToShortString } from "./Days";
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


    constructor(
        {
            title,
            summary,
            startDate,
            endDate,
            actionDays,
            totalPoints,
            tasks
        }: {
            title?: string,
            summary?: string,
            startDate?: Date,
            endDate?: Date,
            actionDays?: Days,
            totalPoints?: number, tasks?: Task[]
        } = {}) {
        this.title = title || "";
        this.summary = summary || "";
        this.startDate = startDate || new Date();
        this.endDate = endDate || new Date();
        this.actionDays = actionDays || Days.None;
        this.totalPoints = totalPoints || 0;
        this.tasks = tasks || [];
    }

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
totalPoints: ${this.totalPoints}
---

${tasksString}
`;
    }
}