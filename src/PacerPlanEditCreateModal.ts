import { Modal, App, Setting } from "obsidian";
import { PacerPlan } from "./PacerPlan";
import { Days, shortStringToDays } from "./Days";
import { calculateAvailableActionDates } from "./dateHelper";

export class PacerPlanEditCreateModal extends Modal {
	result: PacerPlan;
	onSubmit: (result: PacerPlan) => void;

	endingPointSetting: Setting;
	startingPointSetting: Setting;
	planInformationTable: HTMLTableElement;
	cancelButton: Setting;
	createButton: Setting;

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
		this.result.startDate.setHours(0, 0, 0, 0);

		this.result.actionDays = Days.Everyday;
		this.result.startNumber = 1;
		this.result.endNumber = 1;

		const { contentEl } = this;
		contentEl.createEl("h1", { text: "New Pacer Plan" });

		new Setting(contentEl)
			.setName("Title")
			.setDesc("The name of the plan. e.g. 'Read Atomic Habits', 'Chapter 3 Math Problems', 'Complete 100 Paragraph Essay'")
			.addText((text) =>
				text.onChange((value) => {
					this.result.title = value;
					this.displayPlanInformation(contentEl);
				})
					.setPlaceholder(this.result.title)
			);

		new Setting(contentEl)
			.setName("Summary")
			.setDesc("(Optional) A brief description of the plan. e.g. Why are you doing it? What are you trying to accomplish? Why is this important to you?")
			.addTextArea((text) =>
				text.onChange((value) => {
					this.result.summary = value;
					this.displayPlanInformation(contentEl);
				})
			);

		new Setting(contentEl)
			.setName("Quantity Type")
			.setDesc("The units for the quantity of work to be done. e.g. pages, paragraphs, problems, etc.")
			.addText((text) =>
				text.onChange((value) => {
					this.result.quantityType = value;
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
					this.displayPlanInformation(contentEl);
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
					this.displayPlanInformation(contentEl);
				}).setPlaceholder(this.result.endNumber.toString())
			);


		new Setting(contentEl)
			.setName("Start Date")
			.setDesc("The date the plan starts.")
			.addText((text) =>
				text
					.onChange((value) => {
						const dateParts = value.split("-").map((part) => Number.parseInt(part));
						this.result.startDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
						this.displayPlanInformation(contentEl);
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
						(value) => {
							const dateParts = value.split("-").map((part) => Number.parseInt(part));
							this.result.endDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

							this.displayPlanInformation(contentEl);
						}
					)
					.setPlaceholder("YYYY-MM-DD")
			);

		new Setting(contentEl)
			.setName("Action Days")
			.setDesc("The days of the week the plan is active. U = Sunday, M = Monday, T = Tuesday, W = Wednesday, R = Thursday, F = Friday, S = Saturday.")
			.addText((text) =>
				text.onChange(
					(value) => {
						if (value.length === 0) {
							value = "UMTWRFS";
						}
						this.result.actionDays = shortStringToDays(value);
						this.displayPlanInformation(contentEl);
					}
				)
					.setPlaceholder("UMTWRFS")
			);

		this.displayPlanInformation(contentEl);
	}

	private AddButtons(contentEl: HTMLElement) {
		this.createButton = new Setting(contentEl).addButton((cb) => cb.setButtonText("Create").onClick(() => {
			this.close();
			this.onSubmit(this.result);
		})
		);

		this.cancelButton = new Setting(contentEl).addButton((cb) => cb.setButtonText("Cancel").onClick(() => {
			this.close();
		})
		);
	}

	displayPlanInformation(contentEl: HTMLElement) {
		if (this.planInformationTable) {
			contentEl.removeChild(this.planInformationTable);
			contentEl.removeChild(this.createButton.settingEl);
			contentEl.removeChild(this.cancelButton.settingEl);
		}
		this.planInformationTable = contentEl.createEl("table");
		this.planInformationTable.style.width = "100%";
		this.planInformationTable.addClass("callout");

		// Display the total quantity of work to be done
		const row1 = this.planInformationTable.createEl("tr");
		row1.createEl("td", { text: "Total Quantity" });
		row1.createEl("td", { text: this.result.totalQuantity.toString() });

		// Display the number of action days the plan is active
		const row2 = this.planInformationTable.createEl("tr");
		row2.createEl("td", { text: "Number of Action Days" });
		const availableActionDates = calculateAvailableActionDates(this.result.startDate, this.result.endDate, this.result.actionDays);
		row2.createEl("td", { text: availableActionDates.length.toString() });

		// Display the quantity of work to be done per day
		const row3 = this.planInformationTable.createEl("tr");
		row3.createEl("td", { text: "Avg. Quantity per Action Day" });
		const quantityPerDay = this.result.totalQuantity / availableActionDates.length;
		row3.createEl("td", { text: quantityPerDay.toFixed(2) });

		this.AddButtons(contentEl);
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

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}