export class Task {
    description: string;
    quantityType: string;
    startPoint: number;
    endPoint: number;
    scheduledDate: Date;
    completed: boolean;

    constructor({
        description,
        quantityType,
        startPoint,
        endPoint,
        scheduledDate,
        completed
    }: {
        description: string;
        quantityType: string;
        startPoint: number;
        endPoint: number;
        scheduledDate: Date;
        completed: boolean;
    }) {
        this.description = description;
        this.quantityType = quantityType;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.scheduledDate = scheduledDate;
        this.completed = completed;
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
        const rangeString = (this.startPoint === this.endPoint) ? 
            this.startPoint.toString() : `${this.startPoint}-${this.endPoint}`; 

        return `${prefix} ${this.description} (${rangeString}) ⏳ ${this.scheduledDate.toISOString().slice(0, 10)}`;
    }
}