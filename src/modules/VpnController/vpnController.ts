import { exec } from "child_process";

export class VpnController {
    constructor() {}

    runVPN(command: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(command, { cwd: 'C:/Program Files (x86)/ExpressVPN/services/' }, (error, stdout, stderr) => {
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

    async vpnConnnect(location: string): Promise<string> {
        return await this.runVPN(`ExpressVPN.CLI connect "${location}"`);
    }

    async vpnDisconnect(): Promise<string> {
        return await this.runVPN('ExpressVPN.CLI disconnect');
    }

    async vpnCheckStatus(): Promise<string> {
        const status = await this.runVPN('ExpressVPN.CLI status');
        return status.trim();
    }

    async sleepVPN(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default VpnController;