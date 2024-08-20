export function availableDays(startDate: Date, endDate: Date): number {
    let availableDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1
    if (availableDays < 0) {
        availableDays = 0;
    }
    return availableDays;
}