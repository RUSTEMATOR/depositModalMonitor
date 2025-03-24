import {expect, Page, test} from "@playwright/test";
import VpnController from "../src/modules/VpnController/vpnController";
import {USERS} from "../src/Data/Users/users";
import PageMethods from "../src/modules/PageMethods/PageMethods";

for(const locale of Object.keys(USERS)) {
    const {location, user} = USERS[locale]

    for (const [type, creds] of Object.entries(user)) {
        const [email, password] = Object.values(creds)

        test.describe(`Check ${locale}, ${type}`, () => {

                let vpnController: VpnController
                let pageMethods: PageMethods
                let status: string
                const timeout = 30000;
                const interval = 1000;
                const startTime = Date.now();

                test.beforeEach(async ({page}) => {
                    vpnController = new VpnController();
                    pageMethods = new PageMethods(page)

                    const currentStatus = await vpnController.vpnCheckStatus();
                    if (currentStatus === `Connected to ${location}`) {
                        console.log('Correct location, proceeding to the test');
                    } else if (currentStatus === `Not connected`) {
                        console.log('Connecting...');
                        await vpnController.vpnConnnect(location);
                    } else {
                        console.log('Changing location...')
                        await vpnController.vpnDisconnect();
                        await vpnController.sleepVPN(5000)
                        await vpnController.vpnConnnect(location);
                    }

                    do {
                        status = await vpnController.vpnCheckStatus();
                        console.log(`Current status: ${status}`);
                        if (status === `Connected to ${location}`) {
                            console.log(`Successfully connected to ${location}`);
                            break;
                        }
                        await new Promise(resolve => setTimeout(resolve, interval));
                    } while (Date.now() - startTime < timeout);
        });



                test(`Visual comparison of dep modal ${locale}. ${type}`, async () => {
                    await pageMethods.navigateToMainPage()
                    await pageMethods.signIn(email, password)
                    await pageMethods.openDepModal()
                    await pageMethods.getPaymentList.waitFor({state: 'visible'})
                    await pageMethods.page.waitForTimeout(5000)


                    await expect(pageMethods.getPaymentList).toHaveScreenshot()
                })
        })
    }
}