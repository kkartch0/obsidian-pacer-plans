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
 * 
 * @example
 * enum Days {
 *     Sunday = 1 << 0,    // 1 (0000001)
 *     Monday = 1 << 1,    // 2 (0000010)
 *     Tuesday = 1 << 2,   // 4 (0000100)
 *     Wednesday = 1 << 3, // 8 (0001000)
 *     Thursday = 1 << 4,  // 16 (0010000)
 *     Friday = 1 << 5,    // 32 (0100000)
 *     Saturday = 1 << 6,  // 64 (1000000)
 * }
 * 
 * const actionDays = Days.Monday | Days.Wednesday | Days.Friday; // 42 (00101010)
 * const isWednesdayActionDay = isActionDay(Days.Wednesday, actionDays); // returns true
 * // Explanation:
 * // day = Days.Wednesday; // 8 (0001000)
 * // actionDays = Days.Monday | Days.Wednesday | Days.Friday; // 42 (00101010)
 * // (day & actionDays) === day
 * // (8 & 42) === 8
 * // (0001000 & 00101010) === 0001000
 * // 8 === 8 // true
 */
export function isActionDay(day: Days, actionDays: Days): boolean {
    return (day & actionDays) === day;
}

/**
 * Converts a numeric day of the week to a corresponding Days enum value.
 * 
 * @param dayOfWeek - The numeric representation of the day of the week.
 * @returns The corresponding Days enum value.
 */
export function dayOfWeekToDaysEnum(dayOfWeek: number): Days {
    switch (dayOfWeek) {
        case 0: return Days.Sunday;
        case 1: return Days.Monday;
        case 2: return Days.Tuesday;
        case 3: return Days.Wednesday;
        case 4: return Days.Thursday;
        case 5: return Days.Friday;
        case 6: return Days.Saturday;
        default: return Days.None;
    }
}


/**
 * Calculates the available action days between a start date and an end date based on the 
 * provided action days.
 * 
 * @param startDate - The start date.
 * @param endDate - The end date.
 * @param actionDays - The action days.
 * @returns An array of available action days.
 */
export function calculateAvailableActionDates(startDate: Date | null, endDate: Date | null, actionDays: Days): Date[] {
    // if either date is invalid or null, return an empty array
    if (!startDate || !endDate || startDate > endDate) {
        return [];
    }

    const availableDays: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        const day = dayOfWeekToDaysEnum(dayOfWeek);
        if (isActionDay(day, actionDays)) {
            availableDays.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return availableDays;
}

export function dateStringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
} 