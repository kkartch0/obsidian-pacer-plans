import { PacerPlan } from '../src/PacerPlan';
import { Days } from '../src/Days';

describe('PacerPlan', () => {
    it('should create an instance with default values', () => {
        const plan = new PacerPlan();

        expect(plan.title).toBe('');
        expect(plan.summary).toBe('');
        expect(plan.startDate).toBeInstanceOf(Date);
        expect(plan.endDate).toBeInstanceOf(Date);
        expect(plan.actionDays).toBe(Days.None);
        expect(plan.startNumber).toBe(0);
        expect(plan.endNumber).toBe(0);
        expect(plan.quantityType).toBe('');
        expect(plan.tasks).toEqual([]);
    });

    it('should calculate totalQuantity correctly', () => {
        const plan = new PacerPlan({ startNumber: 5, endNumber: 10 });

        expect(plan.totalQuantity).toBe(6);
    });

    it('should sanitize the title', () => {
        const plan = new PacerPlan();
        plan.title = 'Invalid/Title';

        expect(plan.title).toBe('InvalidTitle'); // Assuming sanitizeForFileName replaces '/' with '_'
    });
});