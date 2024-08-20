import { Days } from "./Days";
import { Task } from "./Task";

export class PacerPlan {
    title: string;
    summary: string
    startDate: Date;
    endDate: Date;
    actionDays: Days;
    totalPoints: number;

    tasks: Task[];
}