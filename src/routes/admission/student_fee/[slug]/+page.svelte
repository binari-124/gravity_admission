<script>
  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  // import ImageUpload from "../../../_utils/imageUpload.svelte.js";

  /** @type {import('./$types').PageData} */
  export let data;
  export let studentId = data.studentId;
  console.log("studentID from slug:" + studentId);
  let body = {
    // arr_inst: [],
    // arr_time: [],
    // arr_paid_by: [],
    // arr_dd: [],
    // arr_receipt: [],
  };

  let installments = [
    { installment: "50000 ", timestamp: " " },
    { installment: "50000 ", timestamp: " " },
  ];

  let x = [];

  let date = new Date();

  let myURL = "";

  // let cor_address = false;

  async function getStudent() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/student/" + studentId, {
      mode: "cors",
      method: "get",
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
          body = response.data;
          // batches= response.data.batches;
        } else {
          console.log(response.message);
        }
      } catch (e) {
        console.log("caught1");
        alert("Some problem has occured, see console for more info.");
        console.log(e.message);
      }
    } else {
      console.log(await res.text());
    }
  }

  let src = "../images/";

  onMount(async () => {
    console.log("mounted");
    let loginPath = get(ApiUrl);
    await getStudentbatches();
    await getStudentcompatiblebatches();
  });

  async function handleSubmit(event) {
    console.log("submitting inquiry form");

    //email...phone 10 digit, name,

    console.log(body);
    var token = localStorage.getItem("token");
    // body.topic = topic;
    var loginPath = get(ApiUrl);

    const res = await fetch(myURL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(
        //   {
        //   email: inquiry_email,
        //   message: inquiry_message,
        //   phone: inquiry_phone,
        //   name: inquiry_name,
        // }
        body
      ),
    });
    // console.log(await res.text());
    const json = await res.json();
    if (json.status == "success") {
      alert("Thankyou for contacting us, our team will reach you shortly");
      // centre.reload();
    }
    // let result = JSON.stringify(json);
    // console.log(result);

    // console.log(json.stringify(body,null,2))
    // console.log(body);
  }

  async function handlePlus() {
    installments.push({ installment: "", timestamp: "" });
    installments = installments;
  }

  // async function handleSubmit(){
  //   console.log(installments);
  // }

  async function deleteInstallment(index) {
    console.log(index);
    installments.splice(index, 1);
    // installments.pop();
    installments = installments;
  }


  async function editInstallment(index){

  }

  console.log(body);
</script>

<div class="shadow">
  <button class="btn" on:click={handlePlus}>Plus</button>
    {#each installments as installment,index}
    <span>{index}</span>
    <input type="text" bind:value={installment.installment} />
    <input type="date" bind:value={installment.timestamp} />
    <button class="btn" on:click={()=>deleteInstallment(index)}>Delete</button>

    <br>
    {/each}
    <button class="btn" on:click={handleSubmit}>Submit</button>

</div>