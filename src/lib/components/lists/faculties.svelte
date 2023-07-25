<script>
    export let faculties = [];
    import {ApiUrl} from '../../_utils/static_store.js';
  import { get } from 'svelte/store';
  
  async function handleDelete(facultyId){
          let confirmm = confirm("Really want to delete permanently?");
          if(!confirmm)
          {
              return;
          }
          var token = localStorage.getItem("token");
          var loginPath=get(ApiUrl);
          let res;
          res = await fetch(loginPath+'/panel/faculties/delete/'+facultyId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
  
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
    
    <table class="w3-table-all w3-hoverable"  width="100%">
      <thead>
        <tr class="w3-light-grey">
          <th>#</th>
          <th>Name</th>
          <th>Faculty Id</th>
          <th>Description</th>
          <th>Stream</th>
          <th>Subject</th>
          <th>Edit</th>
          <th>Delete</th>
          
        </tr>
      </thead>
      {#each faculties as faculty,ind}
      <tr class="w3-hover-shadow">
          <td>{ind+1}</td>
          <td>{faculty.name}</td>
              <td><a class="w3-text-blue">{faculty._id}</a></td>
              <td>{faculty.description}</td>
              <td>{faculty.stream?faculty.stream.name:"-"}</td>
              <td>{faculty.subject?faculty.subject.name:"-"}</td>
              <td><a href="/faculties/edit/{faculty._id}"><button class="w3-button w3-card w3-round"><i class="w3-text-grey fas fa-edit"></i> Edit</button></a></td>
              <td> <button on:click={()=>{handleDelete(faculty._id)}} class="w3-button w3-red w3-card w3-round"><i class="w3-text-white fas fa-trash"></i> Delete</button></td>
      </tr>
      {/each}
    </table>
  