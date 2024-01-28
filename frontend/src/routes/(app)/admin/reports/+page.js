import { PathGetPaymentMethods,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

// export const ssr = false;
export async function load({fetch,url,depends,params}) {
    return {tabTitle:"Payment Methods",arTabTitle:"وسائل الدفع"}
};
