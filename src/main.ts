import { MarkdownView, Notice, Plugin } from 'obsidian';
import { PacerPlanSettingsTab } from './PacerPlanSettingsTab';
import { PacerPlanEditCreateModal } from './PacerPlanEditCreateModal';
import { generateTasksForPacerPlan } from './PacerPlan.helper';
import { createPacerPlanFromString } from './pacerPlanStringParsing';
import { dateProvider } from './dateProvider';

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
					result.tasks = generateTasksForPacerPlan(result, dateProvider);

					let resultString = result.toString();
					console.log("Pacer Plan:")
					console.log(resultString);

					// write string to new file using vault
					const fileName = result.title + ".md";
					const planFile = await this.app.vault.create(fileName, resultString);

					// open the newly created file
					this.app.workspace.getLeaf("tab").openFile(planFile);

				}).open();
			}
		});

		this.addCommand({
			id: "recalculate-pacer-plan-tasks",
			name: "Recalculate Pacer Plan tasks",
			callback: async () => {
				// load in the current file
				const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (!activeView) {
					new Notice("No active view");
					return;
				}

				const file = activeView.file;
				if (!file) {
					new Notice("No active file");
					return;
				}

				const fileContents = await this.app.vault.read(file);
				const fileTitle = file.basename;

				const plan = createPacerPlanFromString(fileTitle, fileContents);

				console.log("Recalculating tasks for plan:");
				console.log(plan);
				console.log("Plan:");
				console.log(plan.toString())

				plan.tasks = generateTasksForPacerPlan(plan, dateProvider);

				console.log("Updated Plan:");
				const updatedPlanString = plan.toString();
				console.log(updatedPlanString)

				await this.app.vault.modify(file, updatedPlanString);
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


