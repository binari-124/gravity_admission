<script>
  /** @type {import('./$types').PageData} */
  export let data;
  export let test_Id = data.test_Id;
  console.log("studentID from slug:" + test_Id);

  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  import { bubble } from "svelte/internal";
  import { read, utils, writeFileXLSX } from "xlsx";
  // import Test from "../../../../_utils/_tests/general.svelte";

  let testresult = [];

  // let pres;

  // if(testresult){
  //    pres = [testresult.student.name,testresult.student._id,testresult.student.phone, testresult.max_marks, testresult.total];

  // }

  // let date= new Date(certificate.timestamp);
  // let d= new Date(date).toLocaleDateString('en-US', {
  // day: '2-digit',
  // month: '2-digit',
  // year: 'numeric',
  // });
  var token;
  var loginPath;
  // var jsonQuestion;

  // let day= date.getDay();

  onMount(async () => {
    // const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
    // const wb = read(f); // parse the array buffer
    // const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
    // let xyz = utils.sheet_to_json(ws);

    // console.log("This is ws")
    // console.log(ws);
    // console.log("This is xyz");
    // console.log(xyz);
    console.log(test_Id);
    console.log("mounted");
    // localStorage.setItem("token","some value");

    token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }
    Token.set(token);
    loginPath = get(ApiUrl);

    // console.log(loginPath+'/auth/whoami');
    // loginPath = "/api"
    // const res = await fetch(loginPath + "/panel/results/results/"+test_Id , {
    const res = await fetch(loginPath + "/panel/results/results_filter", {
      mode: "cors",
      method: "get",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.status == 200) {
      try {
        let response = await res.text();
        console.log(response);

        response = await JSON.parse(response);
        if (response.status == "success") {
          console.log("got questions");
          testresult = response.data;
          console.log("This is test result");
          console.log(testresult);
          console.log(test_Id);
          console.log("This is test result");
        } else {
          console.log(response.message);
          alert(response.message);
        }
      } catch (e) {
        console.log("caught");

        console.log(e);
      } finally {
      }

      // let data = JSON.parse(text);
    } else {
      console.log(await res.text());
      // user.email="no logged";
    }
    //
  });

  let myarr = [
    { name: "Vikas", abc: "gangwar", wxy: 58 },
    { name: "amit", abc: "anand", wxy: 58 },
  ];

  function exportdata() {
    const ws = utils.json_to_sheet(testresult);
    // const ws = utils.json_to_sheet(myarr);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "abcd.xlsx");

    console.log("This is ws");
    console.log(testresult);
  }
</script>

<!-- <div class="container w3-card" style="--template-color:red">
  {#if test}
  <Test edit={true} body={test} />
  {/if}
  </div> -->
<div>
  <button class="my-4 border-2 rounded-md p-2" on:click={exportdata}
    >Export to Excel</button
  >
</div>

<div class="w3-round">
  {#if testresult}
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
      {#each testresult as result}
        <tr class="w3-hover-shadow">
          <td>{result.student.name}</td>
          <td>{result.student._id}</td>
          <td>{result.student.phone}</td>
          <td>{result.max_marks}</td>
          <td>{result.total}</td>
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
    </table>
  {/if}
</div>

<style>
  * {
    color: rgb(51, 51, 51);
  }
  /*
  By default, CSS is locally scoped to the component,
  and any unused styles are dead-code-eliminated.
  In this page, Svelte can't know which elements are
  going to appear inside the {{{post.html}}} block,
  so we have to use the :global(...) modifier to target
  all elements inside .content
  */
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #dfc502;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  .container {
    width: 100%;
    /* border:1px solid rgb(140, 140, 140); */
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* background: linear-gradient(45deg,rgb(134, 60, 253),var(--template-color)); */
  }
  img {
    display: block;
    width: 150px;
  }
  .certificate {
    font-size: 120px;
    font-family: "MonteCarlo", cursive;
  }
  .organization {
    color: black;
    font-size: 80px;
    font-family: "MonteCarlo", cursive;
  }
  .cont {
    font-family: "MonteCarlo", cursive;
    font-size: 30px;
  }
  .straight {
    font-family: "Merriweather", serif;

    /* font-family: 'MonteCarlo', cursive; */
  }
  .flex {
    margin-top: 30px;
    display: flex;
    align-items: stretch;
  }
  .flexit {
    flex: 1;
    padding: 20px;
  }
  p {
    width: 100%;
    margin: 0;
    text-align: center;
  }
  h1 {
    margin: 300px;
  }
</style>
