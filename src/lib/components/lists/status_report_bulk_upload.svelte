<script>
  export let returnData = null;
  </script>
  
  {#if returnData}
  <table class="w3-table-all w3-hoverable">
      <thead>
        <tr class="w3-light-grey">
          <th>Serial Number</th>
          <th>Status</th>
          <th>Message</th>
        
        </tr>
      </thead>
      {#each returnData as r}
      <tr class="w3-hover-shadow">
          <td>{r.serial_number}</td>
          <td>{r.status}</td>
          <td>{r.message}</td>
          <!-- <td>{student.batch?student.batch.name:"-"}</td>
          <td>{student.branch?student.branch.name:"-"}</td>
          <td>{student.email}</td>
          <td><a class="w3-text-blue"  href="/students/{student._id}">{student._id}</a></td> -->
      </tr>
      {/each}
    </table>
  {/if}