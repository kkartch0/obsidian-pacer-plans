import { Modal, App, Setting } from "obsidian";
import { PacerPlan } from "./PacerPlan";
import { Days, shortStringToDays } from "./Days";

export class PacerPlanEditCreateModal extends Modal {
	result: PacerPlan;
	onSubmit: (result: PacerPlan) => void;

	endingPointSetting: Setting;
	startingPointSetting: Setting;
	totalQuantitySetting: Setting;

	constructor(app: App, onSubmit: (result: PacerPlan) => void) {
		super(app);
		this.onSubmit = onSubmit;
	}

	fileExists(fileName: string): boolean {
		const resultFile = this.app.vault.getAbstractFileByPath(fileName);
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
		this.result.startNumber = 1;
		this.result.endNumber = 1;

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
					this.result.quantityType = value
				})
			);

		this.startingPointSetting = new Setting(contentEl)
			.setName("Starting Point")
			.setDesc(
				"The point to start at. e.g. 1, 10, 20 etc."
			)
			.addText((text) =>
				text.onChange((value) => {
					this.result.startNumber = Number.parseInt(value);
					this.setTotalQuantity();
				}).setPlaceholder(this.result.startNumber.toString())
			);

		this.endingPointSetting = new Setting(contentEl)
			.setName("Ending Point")
			.setDesc(
				"The point to end at. e.g. 33, 200, 299, etc."
			)
			.addText((text) =>
				text.onChange((value) => {
					this.result.endNumber = Number.parseInt(value);
					this.setTotalQuantity();
				}).setPlaceholder(this.result.endNumber.toString())
			);

		this.totalQuantitySetting = new Setting(contentEl)
			.setName("Total Quantity")
			.setDesc(
				"The total quantity of work to be completed."
			)
		this.setTotalQuantity()

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

		while (this.fileExists(this.result.title + ".md")) {
			this.result.title = defaultFileName + " " + fileNumber;
			fileNumber++;
		}
	}

	setTotalQuantity() {
		this.totalQuantitySetting.clear().addText((text) =>
			text.setValue(this.result.totalQuantity.toString()))
			.setDisabled(true);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}