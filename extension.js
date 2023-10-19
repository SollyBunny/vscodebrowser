const vscode = require("vscode");
const fs = require("fs");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand("solly-vscode-browser.open", () => {
		console.log("Opening browser")
		const panel = vscode.window.createWebviewPanel(
			"sollyVSCodeBrowser",
			"Browser",
			vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : vscode.ViewColumn.One,
			vscode.ViewColumn.One,
			{
                enableScripts: true,
                // And restrict the webview to only loading content from our extension's `media` directory.
                // localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
            }
		);
		console.log(fs)
		try {
			panel.webview.html = fs.readFileSync(context.asAbsolutePath("index.html"));
		} catch (e) {
			console.log(e);
			panel.webview.html = `<html><body><p>Couldn't open index.html, ${e}<p></body></html>`;
		}
		console.log("Finished opening browser");
	}));
}

// this method is called when your extension is deactivated
function deactivate() {}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
};