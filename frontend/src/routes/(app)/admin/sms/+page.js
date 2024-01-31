import { PathGetParents,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('sms:refresh');
    return {tabTitle:"SMS"}
};