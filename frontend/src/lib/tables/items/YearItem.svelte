<script>
    import { getContext } from "svelte"
    
        export let year
        let {yearStore} = getContext("yearStore")

        function openAcademicBreaks(){
            
        }
        
        function setYear(){
            $yearStore = JSON.parse(JSON.stringify(year));
        }
    
    </script>
    
    <tr scope="row" class="{year.current ? "table-active bg-success-subtle": ""}">
        <td>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" >
            </div>
        </td>
        <td>{year.id}</td>
        <td>{year.name}
        {#if year.current}
        <!-- <span class="badge bg-warning">Current</span> -->
        <span class="badge bg-success-subtle text-success ms-1">Current</span>

        {/if}
        </td>
        <td>{year.from}</td>
        <td>{year.to}</td>
        <td>{year.academicDays}</td>
        <td>
            <div class="hstack gap-3 flex-wrap">
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.index")}
                <span on:click={openAcademicBreaks}><a href="/admin/academicYears/{year.id}/academicBreaks"  target="_blank"  class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Academic Breaks" ><i class="ri-calendar-2-fill"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("academicYears.show")}
                <span data-bs-toggle="modal" data-bs-target="#viewYearModal" on:click={setYear}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View" ><i class="ri-eye-fill"></i></a></span>
                {/if}
                {#if JSON.parse(sessionStorage.getItem("permissions")).includes("academicYears.update")}
                <span data-bs-toggle="modal" data-bs-target="#editYearModal" on:click={setYear}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit" ><i class="ri-edit-2-line"></i></a></span>
                {/if}
                {#if !year.current}
                    {#if JSON.parse(sessionStorage.getItem("permissions")).includes("academicYears.destroy")}
                    <span data-bs-toggle="modal" data-bs-target="#deleteYearModal" on:click={setYear}><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>
                    {/if}
                {/if}
            </div>
        </td>
    </tr>