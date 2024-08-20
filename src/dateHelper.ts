import { Days } from "./Days";

/**
 * Calculates the number of available days between a start date and an end date.
 * 
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @returns The number of available days.
 */
export function availableDays(startDate: Date, endDate: Date): number {
    let availableDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1
    if (availableDays < 0) {
        availableDays = 0;
    }
    return availableDays;
}


/**
 * Checks if a given day is an action day based on the provided action days bitmask.
 * 
 * @param day - The day to check.
 * @param actionDays - The bitmask representing the action days.
 * @returns A boolean indicating whether the given day is an action day.
 */
export function isActionDay(day: number, actionDays: Days): boolean {
    return (actionDays & day) === day;
}
