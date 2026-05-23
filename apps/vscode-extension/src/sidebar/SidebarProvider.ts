import * as vscode from "vscode";

import * as fs from "fs";

import * as path from "path";

export class SidebarProvider
implements vscode.WebviewViewProvider {

    public static readonly viewType =
        "idksql.sidebar";

    constructor(

        private readonly context:
        vscode.ExtensionContext

    ) {}

    resolveWebviewView(

        webviewView:
        vscode.WebviewView

    ) {

        webviewView.webview.options = {

            enableScripts: true
        };

        const htmlPath = path.join(

            this.context.extensionPath,

            "src",

            "sidebar",

            "webview.html"
        );

        const html =
            fs.readFileSync(

                htmlPath,

                "utf-8"
            );

        webviewView.webview.html =
            html;
    }
}
