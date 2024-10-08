import { generateTasksForPacerPlan } from "../src/PacerPlan.helper";
import { Days } from "../src/Days";
import { PacerPlan } from "../src/PacerPlan";
import { Task } from "../src/Task";

describe("PacerPlan", () => {
    describe("generateTasksForPacerPlan", () => {
        it("when completed tasks are contingous: should generate tasks for the PacerPlan", () => {
            // Arrange
            const plan = new PacerPlan({
                title: "Book",
                summary: "Read Book by Some Author",
                quantityType: "Pages",
                startDate: new Date(2024, 7, 19),
                endDate: new Date(2024, 7, 21),
                actionDays: Days.Everyday,
                startNumber: 1,
                endNumber: 10,
                tasks: [
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [1, 2, 3],
                        scheduledDate: new Date(2024, 7, 19),
                        completed: true
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [4, 5, 6],
                        scheduledDate: new Date(2024, 7, 20),
                        completed: false
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [7, 8, 9, 10],
                        scheduledDate: new Date(2024, 7, 21),
                        completed: false
                    })
                ]
            });

            // Act
            const result = generateTasksForPacerPlan(plan, { today: () => new Date(2024, 7, 21) });

            // Assert
            expect(result).toEqual([
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [1, 2, 3],
                    scheduledDate: new Date(2024, 7, 19),
                    completed: true
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [4, 5, 6, 7, 8, 9, 10],
                    scheduledDate: new Date(2024, 7, 21),
                    completed: false
                }),
            ]);
        });

        describe("when today has a completed task", () => {
            it("should exclude today from action days", () => {
                // Arrange
                const plan = new PacerPlan({
                    title: "Book",
                    summary: "Read Book by Some Author",
                    quantityType: "Pages",
                    startDate: new Date(2024, 7, 19),
                    endDate: new Date(2024, 7, 21),
                    actionDays: Days.Everyday,
                    startNumber: 1,
                    endNumber: 10,
                    tasks: [
                        new Task({
                            description: "Book",
                            quantityType: "Pages",
                            quantities: [1, 2, 3],
                            scheduledDate: new Date(2024, 7, 19),
                            completed: true
                        }),
                        new Task({
                            description: "Book",
                            quantityType: "Pages",
                            quantities: [4, 5, 6],
                            scheduledDate: new Date(2024, 7, 20),
                            completed: false
                        }),
                        new Task({
                            description: "Book",
                            quantityType: "Pages",
                            quantities: [7, 8, 9, 10],
                            scheduledDate: new Date(2024, 7, 21),
                            completed: false
                        })
                    ]
                });

                // Act
                const result = generateTasksForPacerPlan(plan, { today: () => new Date(2024, 7, 19) });

                // Assert
                expect(result).toEqual([
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [1, 2, 3],
                        scheduledDate: new Date(2024, 7, 19),
                        completed: true
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [4, 5, 6, 7],
                        scheduledDate: new Date(2024, 7, 20),
                        completed: false
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [8, 9, 10],
                        scheduledDate: new Date(2024, 7, 21),
                        completed: false
                    }),
                ]);
            });
        });

        it("generated tasks should take into account completed tasks' end points (extra points completed)", () => {
            // Arrange
            const plan = new PacerPlan({
                title: "Book",
                summary: "Read Book by Some Author",
                quantityType: "Pages",
                startDate: new Date(2024, 7, 19),
                endDate: new Date(2024, 7, 21),
                actionDays: Days.Everyday,
                startNumber: 1,
                endNumber: 10,
                tasks: [
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [1, 2, 3, 4, 5, 6],
                        scheduledDate: new Date(2024, 7, 19),
                        completed: true
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [4, 5, 6],
                        scheduledDate: new Date(2024, 7, 20),
                        completed: false
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [7, 8, 9, 10],
                        scheduledDate: new Date(2024, 7, 21),
                        completed: false
                    })
                ]
            });

            // Act
            const result = generateTasksForPacerPlan(plan, { today: () => new Date(2024, 7, 19) });

            // Assert
            expect(result).toEqual([
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [1, 2, 3, 4, 5, 6],
                    scheduledDate: new Date(2024, 7, 19),
                    completed: true
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [7, 8],
                    scheduledDate: new Date(2024, 7, 20),
                    completed: false
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [9, 10],
                    scheduledDate: new Date(2024, 7, 21),
                    completed: false
                }),
            ]);
        });

        it("generated tasks should take into account completed tasks' end points (less points completed than suggested)", () => {
            // Arrange
            const plan = new PacerPlan({
                title: "Book",
                summary: "Read Book by Some Author",
                quantityType: "Pages",
                startDate: new Date(2024, 7, 19),
                endDate: new Date(2024, 7, 21),
                actionDays: Days.Everyday,
                startNumber: 1,
                endNumber: 10,
                tasks: [
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [1],
                        scheduledDate: new Date(2024, 7, 19),
                        completed: true
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [4, 5, 6],
                        scheduledDate: new Date(2024, 7, 20),
                        completed: false
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [7, 8, 9, 10],
                        scheduledDate: new Date(2024, 7, 21),
                        completed: false
                    })
                ]
            });

            // Act
            const result = generateTasksForPacerPlan(plan, { today: () => new Date(2024, 7, 19) });

            // Assert
            expect(result).toEqual([
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [1],
                    scheduledDate: new Date(2024, 7, 19),
                    completed: true
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [2, 3, 4, 5, 6],
                    scheduledDate: new Date(2024, 7, 20),
                    completed: false
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [7, 8, 9, 10],
                    scheduledDate: new Date(2024, 7, 21),
                    completed: false
                }),
            ]);
        });

        it("the number of tasks shall not exceed the number required to complete the remaining quantity", () => {
            // Arrange
            const plan = new PacerPlan({
                title: "Book",
                summary: "Read Book by Some Author",
                quantityType: "Pages",
                startDate: new Date(2024, 7, 19),
                endDate: new Date(2024, 7, 21),
                actionDays: Days.Everyday,
                startNumber: 10,
                endNumber: 10,
                tasks: [
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [1, 2, 3, 4, 5, 6],
                        scheduledDate: new Date(2024, 7, 19),
                        completed: true
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [4, 5, 6, 7],
                        scheduledDate: new Date(2024, 7, 20),
                        completed: false
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [8, 9, 10],
                        scheduledDate: new Date(2024, 7, 21),
                        completed: false
                    })
                ]
            });

            // Act
            const result = generateTasksForPacerPlan(plan, { today: () => new Date(2024, 7, 19) });

            // Assert
            expect(result).toEqual([
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [1, 2, 3, 4, 5, 6],
                    scheduledDate: new Date(2024, 7, 19),
                    completed: true
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [10],
                    scheduledDate: new Date(2024, 7, 20),
                    completed: false
                })
            ]);
        });

        it("when plan has tags: should correctly add tags to tasks", () => {
            // Arrange
            const plan = new PacerPlan({
                title: "Book",
                summary: "Read Book by Some Author",
                quantityType: "Pages",
                startDate: new Date(2024, 7, 19),
                endDate: new Date(2024, 7, 21),
                actionDays: Days.Everyday,
                startNumber: 10,
                endNumber: 10,
                tags: ["work", "book"],
                tasks: [
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [1, 2, 3, 4, 5, 6],
                        scheduledDate: new Date(2024, 7, 19),
                        completed: true
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [4, 5, 6, 7],
                        scheduledDate: new Date(2024, 7, 20),
                        completed: false
                    }),
                    new Task({
                        description: "Book",
                        quantityType: "Pages",
                        quantities: [8, 9, 10],
                        scheduledDate: new Date(2024, 7, 21),
                        completed: false
                    })
                ]
            });

            // Act
            const result = generateTasksForPacerPlan(plan, { today: () => new Date(2024, 7, 19) });

            // Assert
            expect(result).toEqual([
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [1, 2, 3, 4, 5, 6],
                    scheduledDate: new Date(2024, 7, 19),
                    completed: true
                }),
                new Task({
                    description: "Book",
                    quantityType: "Pages",
                    quantities: [10],
                    scheduledDate: new Date(2024, 7, 20),
                    completed: false,
                    tags: ["work", "book"]
                })
            ]);
        });
    });
});