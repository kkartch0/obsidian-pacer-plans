import { calculateAvailableActionDates } from "./dateHelper";
import { Days, daysToShortString } from "./Days";
import { Task } from "./Task";

export interface IDateProvider {
    today(): Date;
}

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
            tasks,
            quantityType
        }: {
            title?: string,
            summary?: string,
            startDate?: Date,
            endDate?: Date,
            actionDays?: Days,
            startNumber?: number,
            endNumber?: number,
            tasks?: Task[],
            quantityType?: string
        } = {}) {
        this.title = title || "";
        this.summary = summary || "";
        this.startDate = startDate || new Date();
        this.endDate = endDate || new Date();
        this.actionDays = actionDays || Days.None;
        this.startNumber = startNumber || 0;
        this.endNumber = endNumber || 0;
        this.quantityType = quantityType || "";
        this.tasks = tasks || [];
    }

    get totalQuantity(): number {
        return this.endNumber - this.startNumber + 1;
    }

    get availableActionDates(): Date[] {
        return calculateAvailableActionDates(this.startDate, this.endDate, this.actionDays);
    }

    get quantityPerDay(): number {
        return this.totalQuantity / this.availableActionDates.length;
    }

    toString(): string {
        let tasksString = this.tasks.map(task => task.toString()).join("\n");

        return `---
summary: ${this.summary}
startDate: ${this.startDate.toISOString().slice(0, 10)}
endDate: ${this.endDate.toISOString().slice(0, 10)}
actionDays: ${daysToShortString(this.actionDays)}
quantityType: ${this.quantityType}
startNumber: ${this.startNumber}
endNumber: ${this.endNumber}
---
${tasksString}
`;
    }
}