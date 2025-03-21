import {test} from "@playwright/test";
import VpnController from "../src/modules/VpnController/vpnController";
import {USERS} from "../src/Data/Users/users";

for(const locale of Object.keys(USERS)) {
    const {location, user} = USERS[locale]

    for (const [type, creds] of Object.entries(user)) {
        const [email, password] = Object.values(creds)

        test.describe(`Check ${locale}, ${type}`, () => {

                let vpnController: VpnController

                test.beforeEach(() => {
                    vpnController = new VpnController()
                })


                test(`${locale}. ${type}`, async () => {
                    console.log(locale);

                    console.log(email);

                    console.log(password);

                })
        })
    }
}