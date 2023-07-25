<script>
    export let picker = false;
    export let selectedFiles;
      export let faculties = null;
      export let batchId;
      import {ApiUrl} from '../../../_utils/static_store.js';
      import { get } from 'svelte/store';
  
      function toggleSelectedFiles(qId){
      if(selectedFiles.includes(qId))
      {
        let ind=selectedFiles.indexOf(qId);
        selectedFiles.splice(ind,1);
      }
      else
      {
          selectedFiles.push(qId);
      }
      selectedFiles = selectedFiles;
    }
  
    async function handleDelete(facultyId){
          let confirmm = confirm("Really want to remove the file from the batch?");
          if(!confirmm)
          {
              return;
          }
          var token = localStorage.getItem("token");
          var loginPath=get(ApiUrl);
          let res;
          res = await fetch(loginPath+'/panel/batches/batch_remove_faculty/'+batchId+"/"+facultyId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
  
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
      
      {#if faculties}
      <table class="w3-table-all w3-hoverable">
          <thead>
            <tr class="w3-light-grey">
              <td>ID</td>
              <th>Name</th>
              <th>Remove from Batch?</th>
            </tr>
          </thead>
          {#each faculties as faculty}
          <tr class="w3-hover-shadow">
              <td>{faculty._id}</td>
              <td>{faculty.name}</td>
             
              <td><a class="w3-text-white w3-round w3-red w3-margin w3-padding w3-card" on:click={handleDelete(faculty._id)}>Remove</a></td>
          </tr>
          {/each}
        </table>
        
      {/if}