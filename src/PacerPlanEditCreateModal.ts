import { Modal, App, Setting } from "obsidian";
import { PacerPlan } from "./PacerPlan";
import { Days } from "./Days";

export class PacerPlanEditCreateModal extends Modal {
	result: PacerPlan;
	onSubmit: (result: PacerPlan) => void;

	constructor(app: App, onSubmit: (result: PacerPlan) => void) {
		super(app);
		this.onSubmit = onSubmit;
	}

	onOpen() {
		this.result = new PacerPlan();

		const { contentEl } = this;
		contentEl.createEl("h1", { text: "New Pacer Plan" });

		new Setting(contentEl)
			.setName("Title")
			.setDesc("The name of the plan.")
			.addText((text) =>
				text.onChange((value) => (this.result.title = value))
			);

		new Setting(contentEl)
			.setName("Summary")
			.setDesc("A brief description of the plan.")
			.addTextArea((text) =>
				text.onChange((value) => (this.result.summary = value))
			);

		new Setting(contentEl)
			.setName("Start Date")
			.setDesc("The date the plan starts.")
			.addText((text) =>
				text
					.onChange((value) => {
						this.result.startDate = new Date(value);
					})
					.setPlaceholder("YYYY-MM-DD")
			);

		new Setting(contentEl)
			.setName("End Date")
			.setDesc("The date the plan ends.")
			.addText((text) =>
				text
					.onChange(
						(value) => (this.result.endDate = new Date(value))
					)
					.setPlaceholder("YYYY-MM-DD")
			);

		new Setting(contentEl)
			.setName("Action Days")
			.setDesc("The days of the week the plan is active.")
			.addText((text) =>
				text.onChange(
					(value) =>
						(this.result.actionDays = BinaryStringToDays(value))
				)
			);

		new Setting(contentEl)
			.setName("Total Points")
			.setDesc(
				"The total points to be completed. A point is a single unit such as a page to read, a paragraph to write, or a problem to solve."
			)
			.addText((text) =>
				text.onChange(
					(value) =>
						(this.result.totalPoints = Number.parseInt(value))
				)
			);

		new Setting(contentEl).addButton((cb) =>
			cb.setButtonText("Create").onClick(() => {
				this.close();
				this.onSubmit(this.result);
			})
		);

		new Setting(contentEl).addButton((cb) =>
			cb.setButtonText("Cancel").onClick(() => {
				this.close();
			})
		);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

function BinaryStringToDays(binaryString: string): Days {
	return <Days>Number.parseInt(binaryString, 2);
}
