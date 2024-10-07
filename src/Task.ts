import pluralize from 'pluralize';
import { getRangeString } from './Task.helper';

export class Task {
    description: string;
    quantityType: string;
    scheduledDate: Date;
    completed: boolean;
    quantities: number[];
    additionalProperties: string;

    constructor({
        description,
        quantityType,
        quantities,
        scheduledDate,
        completed,
        additionalProperties
    }: {
        description: string;
        quantityType: string;
        quantities: number[];
        scheduledDate: Date;
        completed: boolean;
        additionalProperties?: string;
    }) {
        this.description = description;
        this.quantityType = quantityType;
        this.quantities = quantities;
        this.scheduledDate = scheduledDate;
        this.completed = completed;
        this.additionalProperties = additionalProperties ?? "";
    }

    /**
     * Returns a string representation of the Task object.
     * 
     * The string includes the scheduled date, description, and start and end points.
     * The scheduled date is formatted as a ISO string with only the date part.

     * The format of the string is: "description (startPoint-endPoint) ⏳ YYYY-MM-DD".
     * 
     * @returns A string representation of the Task object.
     */
    toString(): string {
        const prefix = this.completed ? "- [x]" : "- [ ]";
        const rangeString = getRangeString(this.quantities); 

        const totalQuantity = this.quantities.length;
        const label = pluralize(this.quantityType, totalQuantity, false).toLowerCase();

        return `${prefix} ${this.description} (${label} ${rangeString}) ⏳ ${this.scheduledDate.toISOString().slice(0, 10)}${this.additionalProperties}`;
    }
}