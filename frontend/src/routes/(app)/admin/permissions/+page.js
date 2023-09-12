import { PathGetPermissions,DefaultGetQueries } from "$lib/api/paths"
export async function load({fetch,cookies,url,depends}) {
    depends('permissions:refresh');
      
    // const cookieStr = cookies.getAll()
    // .map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');

    // console.log(cookieStr)
    let permissionsResponse = (await (await fetch(PathGetPermissions(DefaultGetQueries(url)))).json())

    // let permissionsResponse = {a:5}

    
    // let cookieData = await fetch("https://backend.boofey.app/api/cookies-and-data",{
    //     headers: {
    //         // Cookie: cookieStr,
    //     }
    // })

    // console.log(cookieData)


    // console.log(cookieData)
    
    // cookies.set('CookieExample', 'Exampel', {httpOnly:true});

    // console.log(permissionsResponse)
    return {permissionsResponse}
};