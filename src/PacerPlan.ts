import { Days, daysToShortString } from "./Days";
import { sanitizeForFileName } from "./sanitizeForFilename";
import { Task } from "./Task";

export class PacerPlan {
    private _title: string;
    summary: string;
    startDate: Date;
    endDate: Date;
    actionDays: Days;
    quantityType: string;
    startNumber: number;
    endNumber: number;
    tags: string[];

    tasks: Task[];

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
            quantityType,
            tags,
        }: {
            title?: string,
            summary?: string,
            startDate?: Date,
            endDate?: Date,
            actionDays?: Days,
            startNumber?: number,
            endNumber?: number,
            tasks?: Task[],
            quantityType?: string,
            tags?: string[],
        } = {}) {
        this._title = sanitizeForFileName(title || "");
        this.summary = summary || "";
        this.startDate = startDate || new Date();
        this.endDate = endDate || new Date();
        this.actionDays = actionDays || Days.None;
        this.startNumber = startNumber || 0;
        this.endNumber = endNumber || 0;
        this.quantityType = quantityType || "";
        this.tasks = tasks || [];
        this.tags = tags || [];
    }

    set title(value: string) {
        this._title = sanitizeForFileName(value || "");
    }

    get title(): string {
        return this._title;
    }

    get totalQuantity(): number {
        return this.endNumber - this.startNumber + 1;
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
tags:${this.getTagsString()}
---
${tasksString}
`;
    }

    private getTagsString(): string {
        let tagsString = this.tags.map(tag => `  - ${tag}`).join("\n");

        if (this.tags.length > 0) {
            tagsString = "\n" + tagsString;
        }

        return tagsString;
    }
}