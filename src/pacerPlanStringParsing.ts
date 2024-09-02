import { shortStringToDays } from "./Days";
import { PacerPlan } from "./PacerPlan";
import { Task } from "./Task";

/**
 * Create a plan from a string.
 * 
 * @param planString The string representation of the plan.
 * 
 * @returns The plan created from the string.
 * 
 * @example
 * const planString = `---
 * title: Getting Things Done
 * summary: Read Getting Things Done by David Allen
 * startDate: 2024-08-19
 * endDate: 2024-08-23
 * actionDays: MTR
 * totalQuantity: 352
 * ---

 * - [x] Getting Things Done (1-118) ⏳ 2024-08-19
 * - [ ] Getting Things Done (119-235) ⏳ 2024-08-20
 * - [ ] Getting Things Done (236-352) ⏳ 2024-08-22
 * `
 * 
 * const plan = createPacerPlanFromString(planString);
 * 
 * console.log(plan.title); // Output: "Getting Things Done"
 * console.log(plan.summary); // Output: "Read Getting Things Done by David Allen"
 * console.log(plan.startDate); // Output: "2024-08-19"
 * console.log(plan.endDate); // Output: "2024-08-23"
 * console.log(plan.actionDays); // Output: "MTR"
 * console.log(plan.totalQuantity); // Output: 352
 * console.log(plan.tasks); // Output: [Task, Task, Task]
 */
export function createPacerPlanFromString(
    planString: string
): PacerPlan {
    let plan = new PacerPlan();

    const lines = planString.split("\n");
    const metadataLines = lines.slice(1, lines.indexOf("---", 1));
    const taskStrings = lines.slice(lines.indexOf("---", 1) + 1)
        .filter(line => line.trim().length > 0);

    metadataLines.forEach(applyMetadataLineToPacerPlan.bind(null, plan));

    plan.tasks = taskStrings.map(createTaskFromTaskString);

    return plan;
}

/**
 * Creates a Task object from a task string.
 *
 * @param taskString - The task string to parse.
 * @returns A Task object created from the task string.
 */
export function createTaskFromTaskString(taskString: string): Task {

    // regex to match the task string
    // - [x] Getting Things Done (1-118) ⏳ 2024-08-19
    // status: [x] - completed, [ ] - not completed
    // description: Getting Things Done
    // startPoint: 1
    // endPoint: 118
    // scheduledDate: 2024-08-19
    const taskRegex = /^- (\[.\]) (.+) \((\d+)-(\d+)\) ⏳ (\d{4}-\d{2}-\d{2})$/;

    const match = taskString.match(taskRegex);

    if (!match) {
        throw new Error("Invalid task string");
    }

    const [
        _,
        status,
        description,
        startPointString,
        endPointString,
        scheduledDateString
    ] = match;

    const completed = status === "[x]";
    const startPoint = parseInt(startPointString);
    const endPoint = parseInt(endPointString);
    const scheduledDate = new Date(scheduledDateString);

    return new Task({
        description,
        startPoint,
        endPoint,
        completed,
        scheduledDate
    });
}

/**
 * Applies a metadata line to a PacerPlan object.
 * 
 * @param plan - The PacerPlan object to apply the metadata to.
 * @param line - The metadata line to apply.
 * @returns
 */
export function applyMetadataLineToPacerPlan(plan: PacerPlan, line: string): void {
    const [key, value] = line.split(":").map(s => s.trim());

    switch (key) {
        case "title":
            plan.title = value;
            break;
        case "summary":
            plan.summary = value;
            break;
        case "startDate":
            plan.startDate = new Date(value);
            break;
        case "endDate":
            plan.endDate = new Date(value);
            break;
        case "actionDays":
            plan.actionDays = shortStringToDays(value);
            break;
        case "startNumber":
            plan.startNumber = parseInt(value);
            break;
        case "endNumber":
            plan.endNumber = parseInt(value);
            break;
    }
}