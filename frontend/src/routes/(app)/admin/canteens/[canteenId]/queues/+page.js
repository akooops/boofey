import { PathGetQueues,DefaultGetQueries,PathGetQueueStudents } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('queues:refresh');
    let res = await fetch(PathGetQueues(params.canteenId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let queuesResponse = await res.json()
    
    let activeQueue = queuesResponse.data.activeQueue
    let activeQueueStudents
    if(activeQueue){
        res = await fetch(PathGetQueueStudents(activeQueue.id,DefaultGetQueries(url),true),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })
        redirector(res)
        
        let ActiveQueuesResponse = await res.json()

        activeQueueStudents = ActiveQueuesResponse.data.queueStudents

    }



    

    return {queuesResponse,activeQueueStudents,tabTitle:"Queues"}
};