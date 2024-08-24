import { Editor, MarkdownView, Notice, Plugin } from 'obsidian';
import { PacerPlanSettingsTab } from './PacerPlanSettingsTab';
import { PacerPlanEditCreateModal } from './PacerPlanEditCreateModal';
import { executionAsyncId } from 'async_hooks';

// Remember to rename these classes and interfaces!

interface PacerPlanPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: PacerPlanPluginSettings = {
	mySetting: 'default'
}

export default class PacerPlansPlugin extends Plugin {
	settings: PacerPlanPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'create-new-pacer-plan',
			name: 'Create new Pacer Plan',
			callback: () => {
				new PacerPlanEditCreateModal(this.app, async (result) => {
					result.generateTasks();

					let resultString = result.toString();
					console.log("Pacer Plan:")
					console.log(resultString);

					// write string to new file using vault
					const planFile = await this.app.vault.create(result.title + ".md", resultString);

					// open the newly created file
					this.app.workspace.getLeaf("tab").openFile(planFile);
					
				}).open();
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new PacerPlanSettingsTab(this.app, this));

	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


