import { Modal, App, Setting } from "obsidian";
import { PacerPlan } from "./PacerPlan";
import { Days, shortStringToDays } from "./Days";

export class PacerPlanEditCreateModal extends Modal {
	result: PacerPlan;
	onSubmit: (result: PacerPlan) => void;

	totalQuantitySetting: Setting;

	constructor(app: App, onSubmit: (result: PacerPlan) => void) {
		super(app);
		this.onSubmit = onSubmit;
	}

	fileExists(fileName: string): boolean {
		const resultFile = this.app.vault.getAbstractFileByPath(this.result.title + ".md");
		if (resultFile) {
			return true;
		}
		return false;
	}


	onOpen() {
		this.result = new PacerPlan();

		this.setDefaultTitleName();

		this.result.startDate = new Date();
		this.result.actionDays = Days.Everyday;

		const { contentEl } = this;
		contentEl.createEl("h1", { text: "New Pacer Plan" });

		new Setting(contentEl)
			.setName("Title")
			.setDesc("The name of the plan. e.g. 'Read Atomic Habits', 'Chapter 3 Math Problems', 'Complete 100 Paragraph Essay'")
			.addText((text) =>
				text.onChange((value) => (this.result.title = value))
					.setPlaceholder(this.result.title)
			);

		new Setting(contentEl)
			.setName("Summary")
			.setDesc("(Optional) A brief description of the plan. e.g. Why are you doing it? What are you trying to accomplish? Why is this important to you?")
			.addTextArea((text) =>
				text.onChange((value) => (this.result.summary = value))
			);

		new Setting(contentEl)
			.setName("Quantity Type")
			.setDesc("The units for the quantity of work to be done. e.g. pages, paragraphs, problems, etc.")
			.addText((text) =>
				text.onChange((value) => {
					this.totalQuantitySetting.setName(`Total ${value}`);
					this.totalQuantitySetting.setDesc(
						`The total ${value.toLowerCase()} to be completed.`
					)
					this.result.quantityType = value
				})
			);

		this.totalQuantitySetting = new Setting(contentEl)
			.setName("Total Quantity")
			.setDesc(
				"The total quantity of work to be completed."
			)
			.addText((text) =>
				text.onChange((value) => {
					this.result.totalQuantity = Number.parseInt(value);
				})
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

	private setDefaultTitleName() {
		const defaultFileName = "Untitled Plan";
		this.result.title = defaultFileName;
		let fileNumber = 2;

		while (this.fileExists(this.result.title)) {
			this.result.title = defaultFileName + " " + fileNumber;
			fileNumber++;
		}
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}