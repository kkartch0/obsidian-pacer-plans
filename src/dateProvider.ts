export interface IDateProvider {
    today: () => Date;
}

export const dateProvider: IDateProvider = {
    today(): Date {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }
};