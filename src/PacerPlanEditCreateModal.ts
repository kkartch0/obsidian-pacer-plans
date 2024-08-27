import { Modal, App, Setting } from "obsidian";
import { PacerPlan } from "./PacerPlan";
import { Days, shortStringToDays } from "./Days";

export class PacerPlanEditCreateModal extends Modal {
	result: PacerPlan;
	onSubmit: (result: PacerPlan) => void;

	constructor(app: App, onSubmit: (result: PacerPlan) => void) {
		super(app);
		this.onSubmit = onSubmit;
	}

	onOpen() {
		this.result = new PacerPlan();

		const defaultFileName = "Untitled Plan";
		this.result.title = defaultFileName;

		let resultFile = this.app.vault.getAbstractFileByPath(this.result.title + ".md");
		let fileNumber = 2;

		while (resultFile) {
			this.result.title = defaultFileName + " " + fileNumber;
			resultFile = this.app.vault.getAbstractFileByPath(this.result.title + ".md");
			fileNumber++;
		}

		this.result.startDate = new Date();
		this.result.actionDays = Days.Everyday;

		const { contentEl } = this;
		contentEl.createEl("h1", { text: "New Pacer Plan" });

		new Setting(contentEl)
			.setName("Title")
			.setDesc("The name of the plan.")
			.addText((text) =>
				text.onChange((value) => (this.result.title = value))
					.setPlaceholder(this.result.title)
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
					.setValue(new Date().toISOString().split("T")[0])
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
			.setDesc("The days of the week the plan is active. U = Sunday, M = Monday, T = Tuesday, W = Wednesday, R = Thursday, F = Friday, S = Saturday.")
			.addText((text) =>
				text.onChange(
					(value) =>
						(this.result.actionDays = shortStringToDays(value))
				)
				.setPlaceholder("UMTWRFS")
			);

		new Setting(contentEl)
			.setName("Total Quantity")
			.setDesc(
				"The total quantity to be completed. e.g. pages to read, paragraphs to write, or problems to solve, etc."
			)
			.addText((text) =>
				text.onChange(
					(value) =>
						(this.result.totalQuantity = Number.parseInt(value))
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