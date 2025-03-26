import { exec } from "child_process";
import * as path from "path";

export class VpnController {
    private vpnCliPath: string;

    constructor() {
        // Typical ExpressVPN installation path on macOS
        this.vpnCliPath = path.join('/Applications', 'ExpressVPN.app', 'Contents', 'MacOS', 'expressvpn');
    }

    runVPN(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    reject(error.message);
                    return;
                }

                if (stderr) {
                    console.error(`Error: ${stderr}`);
                    reject(stderr);
                    return;
                }

                console.log(`Output: ${stdout}`);
                resolve(stdout);
            });
        });
    }

    async vpnConnect(location: string): Promise<string> {
        return await this.runVPN(`${this.vpnCliPath} connect "${location}"`);
    }

    async vpnDisconnect(): Promise<string> {
        return await this.runVPN(`${this.vpnCliPath} disconnect`);
    }

    async vpnCheckStatus(): Promise<string> {
        const status = await this.runVPN(`${this.vpnCliPath} status`);
        return status.trim();
    }

    async sleepVPN(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default VpnController;
