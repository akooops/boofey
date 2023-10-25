

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('dash:refresh');
   
    return {tabTitle:"Dashboard"}
};