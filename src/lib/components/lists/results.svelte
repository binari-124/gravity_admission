<script>
    export let results = null;
    console.log(results);
    import {ApiUrl} from '../../_utils/static_store.js';
  import { get } from 'svelte/store';
    // export mathjax=null;
    // import Options from "./options.svelte";
  
    async function handleDelete(testId){
          let confirmm = confirm("Really want to delete the Test permanently?");
          if(!confirmm)
          {
              return;
          }
          var token = localStorage.getItem("token");
          var loginPath=get(ApiUrl);
          let res;
          res = await fetch(loginPath+'/panel/test_delete/'+testId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
  
          if(res.status==200){
              try{
                      let response= await res.text();
                      response= await JSON.parse(response);
                      if(response.status == "success")
                      {
                          location.reload();
                      }
                      else{
                          console.log(response.message);
                          alert(response.message);
                      }	
              }
              catch(e){
                  console.log("caught");
                  
                  console.log(e);
              }
              
          }
          else{
                      console.log(await res.text());
                  }
      }
    </script>
    
    {#if results}
    <table class="w3-table-all w3-hoverable">
        <thead>
          <tr class="w3-light-grey">
            <th> Name</th>
            <th>Student ID</th>
            <th>Student Number</th>
            <!-- <th>Batches</th> -->
            <th>Max Marks</th>
            <!-- <th>Test ID</th> -->
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
            <!-- <td>{test.streams.length>0?test.streams.map(s=>s.name).join(","):"-"}</td> -->
            <!-- <td>{test.batches.length>0?test.batches.map(s=>s.name).join(","):"-"}</td> -->
          
            <!-- <td><a  class="w3-text-blue w3-center"  href="/tests/edit/{test.test_type}/{test._id}">{test._id}</a></td> -->
            <!-- <td><a  class="w3-text-blue w3-center"  href="/results/result/{test._id}">Result</a></td> -->
            <!-- <td><button class="w3-text-red w3-center w3-panel w3-border w3-round"  on:click={()=>{handleDelete(subject._id)}} >Delete</button></td> -->
        </tr>
        {/each}
      </table>
    {/if}
  