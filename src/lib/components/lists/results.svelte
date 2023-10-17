<script>
    export let results = null;
    // export let tests = null;

    import { ApiUrl } from "../../_utils/static_store";
    import { get } from "svelte/store";
    // import TestPicker from '../../_utils/_tests/test_picker.svelte';


    // async function handleDelete(studentId) {
    //     let confirmm = confirm("Really want to delete permanently?");
    //     if (!confirmm) {
    //         return;
    //     }
    //     var token = localStorage.getItem("token");
    //     var loginPath = get(ApiUrl);
    //     let res;
    //     res = await fetch(loginPath + "/panel/student_delete/" + studentId, {
    //         mode: "cors",
    //         method: "post",
    //         headers: {
    //             Authorization: "Bearer " + token,
    //             "Content-Type": "application/json",
    //         },
    //     });

    //     if (res.status == 200) {
    //         try {
    //             let response = await res.text();
    //             response = await JSON.parse(response);
    //             if (response.status == "success") {
    //                 location.reload();
    //             } else {
    //                 console.log(response.message);
    //                 alert(response.message);
    //             }
    //         } catch (e) {
    //             console.log("caught");

    //             console.log(e);
    //         }
    //     } else {
    //         console.log(await res.text());
    //     }
    // }
</script>

{#if results}
    <table class="w3-table-all w3-hoverable">
        <thead>
            <tr class="w3-light-grey">
                <th>#</th>
                <th>Name</th>

                <th>Email Id</th>
                <th>Contact</th>
                <th>Student ID</th>
                <th>Delete?</th><th /></tr
            >
        </thead>
        {#each results as result, ind}
            <tr class="w3-hover-shadow">
                <td>{ind + 1}</td>
                <td>{result.name}</td>

                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td
                    ><a class="w3-text-blue" href="/students/{result._id}"
                        >{result._id}</a
                    ></td
                >
                <td
                    ><button
                        class="w3-text-red w3-center"
                        on:click={() => {
                            handleDelete(result._id);
                        }}>Delete</button
                    ></td
                >
            </tr>
        {/each}
    </table>

    <!-- <div class="grid-container w3-round">
        <TestPicker picker={false} />
        
    </div> -->
{/if}
