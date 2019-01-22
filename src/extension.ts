// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as http from 'http';
import { URL } from 'url';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "proxysupporttest" is now active!');
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let server = vscode.commands.registerCommand('proxysupporttest.startServer', () => {
		// The code you place here will be executed every time your command is executed

		http.createServer((req, res) => {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write(req.url);
			res.end();
		}).listen(8080);
		// Display a message box to the user
		vscode.window.showInformationMessage('Server started');
		
	});
	let request = vscode.commands.registerCommand('proxysupporttest.getRequest', () => {
		// The code you place here will be executed every time your command is executed
		
		http.get(new URL("http://127.0.0.1:8080?platform=android"), (res) => {
            let responseString = "";
            res.on("data", (data: Buffer) => {
                responseString += data.toString();
			});
			res.on("end", () => {
                if (res.statusCode === 200) {
                    vscode.window.showInformationMessage(responseString);
                } else {
                    vscode.window.showInformationMessage("Error");
                }
            });
        });

		// Display a message box to the user
		
		
	});
	context.subscriptions.push(server);
	context.subscriptions.push(request);
}

// this method is called when your extension is deactivated
export function deactivate() {}
