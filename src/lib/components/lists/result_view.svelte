<script>
    export let total_test_results = null;
    console.log("wxyz");
    console.log(total_test_results);
    import { ApiUrl } from "../../_utils/static_store.js";
    import { get } from "svelte/store";
  
  </script>
  
  <div class="w3-round">
    <!-- <p>This is result_{total_test_results}</p> -->
    {#if total_test_results}
      <table class="w3-table-all w3-hoverable" id="tabledata" width="100%">
        <thead>
          <tr class="w3-light-grey">
            <th>Name</th>
            <th>Student ID</th>
            <th>Student Number</th>
            <th>Max Marks</th>
            <th>Marks Obtained</th>
  
            <!-- <th>Delete?</th> -->
          </tr>
        </thead>
        {#each total_test_results as result}
          <tr class="w3-hover-shadow">
            <td>{result["Student Name"]}</td>
            <!-- <td>{result.student._id}</td> -->
            <td>{result["Student ID"]}</td>
            <td>{result["Phone No"]}</td>
            <td>{result["Max Marks"]}</td>
            <td>{result["Marks Obtained"]}</td>
            <!-- <td>
              {#each subject.streams as stream}
                {stream.name},
              {/each}
            </td>
            <td
              ><a class="w3-text-blue" href="/subjects/{subject._id}"
                >{subject._id}</a
              ></td
            >
            <td
              ><button
                class="w3-text-red w3-center"
                on:click={() => {
                  handleDelete(subject._id);
                }}>Delete</button
              ></td
            > -->
          </tr>
        {/each}
        <!-- {#each result_new as result}
          <tr class="w3-hover-shadow">
            <td>{result.student.name}</td>
            <td>{result.test}</td>
            <td>{result.student.phone}</td>
            <td>{result.max_marks}</td>
            <td>{result.total}</td>
            <td>
              {#each subject.streams as stream}
                {stream.name},
              {/each}
            </td>
            <td
              ><a class="w3-text-blue" href="/subjects/{subject._id}"
                >{subject._id}</a
              ></td
            >
            <td
              ><button
                class="w3-text-red w3-center"
                on:click={() => {
                  handleDelete(subject._id);
                }}>Delete</button
              ></td
            >
          </tr>
        {/each} -->
      </table>
    {/if}
  </div>
  