<script>
    export let students = null;

    import { ApiUrl } from "../../_utils/static_store";
    import { get } from "svelte/store";

    async function handleDelete(studentId) {
        let confirmm = confirm("Really want to delete permanently?");
        if (!confirmm) {
            return;
        }
        var token = localStorage.getItem("token");
        var loginPath = get(ApiUrl);
        let res;
        res = await fetch(loginPath + "/panel/student_delete/" + studentId, {
            mode: "cors",
            method: "post",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        if (res.status == 200) {
            try {
                let response = await res.text();
                response = await JSON.parse(response);
                if (response.status == "success") {
                    location.reload();
                } else {
                    console.log(response.message);
                    alert(response.message);
                }
            } catch (e) {
                console.log("caught");

                console.log(e);
            }
        } else {
            console.log(await res.text());
        }
    }
    
</script>
<div class="flex ">

</div>
{#if students}
    <table class="w3-table-all w3-hoverable">
        <thead>
            <tr class="w3-light-grey">
                <th>All <br>
                    <input type="checkbox"></th>
                <th>#</th>
                <th>Name</th>
             
                <th>Email Id</th>
                <th>Contact</th>
                <th>More</th>
                <!-- <th>Delete?</th><th /> -->
                <!-- <th>More</th><th /> -->

                </tr
            >
        </thead>
        {#each students as student, ind}
            <tr class="w3-hover-shadow">
                <td><input type="checkbox" ></td>
                <td>{ind + 1}</td>
                <td>{student.name}</td>
                <!-- <td>{student.stream.name}</td>
            <td>{student.batch?student.batch.name:"-"}</td>
            <td>{student.branch?student.branch.name:"-"}</td> -->
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td
                    ><a class="w3-text-blue" href="/students/{student._id}"
                        >More</a
                    ></td
                >
                <!-- <td
                    ><button
                        class="w3-text-red w3-center"
                        on:click={() => {
                            handleDelete(student._id);
                        }}>Delete</button
                    ></td
                > -->
                <td>
                    <!-- <div class="dropdown dropdown-hover">
                        <label tabindex="0" class=" m-1 border-2 py-2 px-4 rounded-md bg-white ">More</label>
                        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li><a>Item 1</a></li>
                          <li><a>Item 2</a></li>
                          <li><a>Item 2</a></li>
                        </ul>
                      </div> -->
                </td>

            </tr>
        {/each}
    </table>
{/if}
