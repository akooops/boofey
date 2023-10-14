import { goto } from "$app/navigation";
import { refresher, ProfileData } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,cookies,url,depends}) {


    await refresher()

   
    let userResponse = await ProfileData()
    return {userResponse}
};