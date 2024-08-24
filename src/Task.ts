export class Task {
    description: string;
    startPoint: number;
    endPoint: number;
    scheduledDate: Date;
    completed: boolean;

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
        let prefix = this.completed ? "- [x]" : "- [ ]";

        return `${prefix} ${this.description} (${this.startPoint}-${this.endPoint}) ⏳ ${this.scheduledDate.toISOString().slice(0, 10)}`;
    }
}