<script>
  export let results = null;
  console.log(results);
  import { ApiUrl } from "../../_utils/static_store.js";
  import { get } from "svelte/store";
  // export mathjax=null;
  // import Options from "./options.svelte";
  // let result_obj ={
  //   result_id:" ",
  //   result_name:" ",
  //   batch_id:" ",
  //   batch_name:" ",
  //   branch_id:" ",
  //   branch_name:" ",
  //   date:" ",
  //   result_type:" "
  // }
  let total_test_results = [
    {
      result_id: " ",
      result_name: " ",
      batch_id: " ",
      batch_name: " ",
      branch_id: " ",
      branch_name: " ",
      date: " ",
      result_type: " ",

    },
  ];

  let total_result_data = {};
  let test_batch_result;

  // let length = results.length;

  // if (results.length != 0) {
  //   for (let i=0; i<results.length; i++){
  //     if (results[i].test != " ") {
  //       let test_result_length = total_test_results.length;
  //       for (let j=0; j<test_result_length; j++){
  //         if (total_test_results[j].result_id != results[i].test ){
  //           total_test_results.push({
  //             result_id: results[i].test,
  //             result_name: results[i].result_name,
  //             batch_id: results[i].batch._id,
  //             batch_name: results[i].batch.name,
  //             branch_id: results[i].branch._id,
  //             branch_name: results[i].branch.name,
  //             date: results[i].declaration_time,
  //             result_type: results[i].result_type,
  //             index_i:i,
  //             index_j:j,
  //           });
  //         }
  //       }
  //     }
  //   }
  // }

//   if (results.length != 0) {
//   const newResultsToAdd = []; // Create an array to store the new results to add

//   for (let i = 0; i < results.length; i++) {
//     if (results[i].test !== " ") {
//       let shouldAdd = true;

//       for (let j = 0; j < total_test_results.length; j++) {
//         if (total_test_results[j].result_id === results[i].test) {
//           shouldAdd = false;
//           break; // No need to continue checking
//         }
//       }

//       if (shouldAdd) {
//         newResultsToAdd.push({
//           result_id: results[i].test,
//           result_name: results[i].result_name,
//           batch_id: results[i].batch._id,
//           batch_name: results[i].batch.name,
//           branch_id: results[i].branch._id,
//           branch_name: results[i].branch.name,
//           date: results[i].declaration_time,
//           result_type: results[i].result_type,
//           index_i: i,
//         });
//       }
//     }
//   }

//   // Add the new results to total_test_results after the loop
//   total_test_results = total_test_results.concat(newResultsToAdd);
// }

if (results.length != 0) {
  const uniqueResultIds = new Set(); // Create a set to store unique result_id values

  for (let i = 0; i < results.length; i++) {
    if (results[i].test !== " ") {
      // Check if the result_id is already in the set
      if (!uniqueResultIds.has(results[i].test)) {
        // If it's not in the set, add it to both the set and the total_test_results array
        uniqueResultIds.add(results[i].test);

        total_test_results.push({
          result_id: results[i].test,
          result_name: results[i].result_name,
          batch_id: results[i].batch._id,
          batch_name: results[i].batch.name,
          branch_id: results[i].branch._id,
          branch_name: results[i].branch.name,
          date: results[i].declaration_time,
          result_type: results[i].result_type,
        
        });
      }
    }
  }
}



  async function handleDelete(testId) {
    let confirmm = confirm("Really want to delete the Test permanently?");
    if (!confirmm) {
      return;
    }
    var token = localStorage.getItem("token");
    var loginPath = get(ApiUrl);
    let res;
    res = await fetch(loginPath + "/panel/test_delete/" + testId, {
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
  console.log("total_test_results");
  console.log(total_test_results);
  console.log("total_test_results");
  total_test_results.shift();
</script>

<!-- {#if results}
    <table class="w3-table-all w3-hoverable">
        <thead>
          <tr class="w3-light-grey">
            <th> Name</th>
            <th>Student ID</th>
            <th>Student Number</th>
            <th>Max Marks</th>
            <th>Marks Obtained</th>
           
          </tr>
        </thead>
        {#each results as result}
        <tr class="w3-hover-shadow">
          <td>{result.student.name}</td>
          <td>{result.student._id}</td>
          <td>{result.student.phone}</td>
          <td>{result.max_marks}</td>
          <td>{result.total}</td>
           
        </tr>
        {/each}
      </table>
    {/if} -->
    <!-- {#if results}
 
  <table class="w3-table-all w3-hoverable">
    <thead>
      <tr class="w3-light-grey">
        <th>Exam Name</th>
 
      </tr>
    </thead>
    {#each results as result}
      <tr class="w3-hover-shadow">
        <td>{result.test}</td>
  
      </tr>
    {/each}
  </table>
{/if} -->

{#if total_test_results}

  <table class="w3-table-all w3-hoverable">
    <thead>
      <tr class="w3-light-grey">
        <th>Exam Name </th>
        <th>Batch </th>
            <th>Branch</th>
            <th>Date</th>
            <th>Type</th>
            <th>Result</th>
      </tr>
    </thead>
    {#each total_test_results as result}
      <tr class="w3-hover-shadow">
        <td>{result.result_name}</td>
        <td>{result.batch_name}</td>
        <td>{result.branch_name}</td>
          <td>{result.result_id}</td>
          <td>{result.result_type}</td>
          <!-- <td>{result.total}</td> -->
          <td><a  class="w3-text-blue w3-center"  href="/results/result/{result.result_id}">Result</a></td>

      </tr>
    {/each}
  </table>
{/if}
