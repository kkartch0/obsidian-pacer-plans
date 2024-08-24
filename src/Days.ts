import { isActionDay } from "./dateHelper";

export enum Days {
    None = 0,
    Sunday = 1 << 0,
    Monday = 1 << 1,
    Tuesday = 1 << 2,
    Wednesday = 1 << 3,
    Thursday = 1 << 4,
    Friday = 1 << 5,
    Saturday = 1 << 6,
    Everyday = Sunday | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday
}

/**
 * Converts a Days enum value to a short string representation.
 * 
 * - Monday -> M
 * - Tuesday -> T
 * - Wednesday -> W
 * - Thursday -> R
 * - Friday -> F
 * - Saturday -> S
 * - Sunday -> U
 * 
 * @param days - The Days enum value to convert.
 * @returns The short string representation of the given day.
 * 
 * @example
 * let actionDays = Days.Monday | Days.Wednesday | Days.Friday;
 * const shortString = DaysToShortString(actionDays);
 * console.log(shortString); // Output: "MWF"
 * 
 * actionDays = Days.Sunday | Days.Saturday;
 * const shortString = DaysToShortString(actionDays);
 * console.log(shortString); // Output: "SU"
 */
export function daysToShortString(days: Days): string {
    let result = '';
    if (isActionDay(Days.Monday, days) ? 'M' : '') {
        result += 'M';
    }

    if (isActionDay(Days.Tuesday, days) ? 'T' : '') {
        result += 'T';
    }

    if (isActionDay(Days.Wednesday, days) ? 'W' : '') {
        result += 'W';
    }

    if (isActionDay(Days.Thursday, days) ? 'R' : '') {
        result += 'R';
    }

    if (isActionDay(Days.Friday, days) ? 'F' : '') {
        result += 'F';
    }

    if (isActionDay(Days.Saturday, days) ? 'S' : '') {
        result += 'S';
    }

    if (isActionDay(Days.Sunday, days) ? 'U' : '') {
        result += 'U';
    }

    return result;
}