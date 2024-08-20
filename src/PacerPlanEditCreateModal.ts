import { Modal, App, Setting, Component } from "obsidian";

export class PacerPlanEditCreateModal extends Modal {
	result: any;
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.createEl('h1', { text: 'New Pacer Plan' });

		new Setting(contentEl)
			.setName('Name')
			.addText(text =>
				text.onChange((value) => this.result = value)
			);

		new Setting(contentEl)
			.setName('Summary')
			.addTextArea(text => text.onChange((value) => this.result = value));
	
		new Setting(contentEl)
			.setName('Start Date')
			.addMomentFormat((cb) => cb.onChange((value) => this.result = value));
		
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
