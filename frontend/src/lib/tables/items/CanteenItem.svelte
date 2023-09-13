<script>
    import { getContext } from "svelte"
    
        export let canteen
        let {canteenStore} = getContext("canteenStore")

        function openAcademicBreaks(){
            
        }
        
        function setCanteen(){
            $canteenStore = JSON.parse(JSON.stringify(canteen));
        }
    
    </script>
    
    <tr scope="row">
        <td>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
            </div>
        </td>
        <td>{canteen.id}</td>
        <td>{canteen.name}
        <td>{canteen.address}</td>
        <td>
            <div class="hstack gap-3 flex-wrap">
                <span data-bs-toggle="modal" data-bs-target="#viewCanteenModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#editCanteenModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
                <span data-bs-toggle="modal" data-bs-target="#deleteCanteenModal" on:click={setCanteen}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
            </div>
        </td>
    </tr>