<script>
  import { onMount } from "svelte";
  import { Token } from "../../../_utils/dynamic_store.js";
  import { ApiUrl } from "../../../_utils/static_store.js";
  import { get } from "svelte/store";
  // import ImageUpload from "../../../_utils/imageUpload.svelte.js";

  /** @type {import('./$types').PageData} */
  export let data;
  export let studentId = data.studentId;

  let data_save = true;
  let condition = false;

  let condition1 = true;

  function cond(index){
    return condition+index;
  }
  
  let create_body = {amount:0,timestamp:new Date(Date.now()).toISOString().replace('-', '/').split('T')[0].replace('-', '/')};
  console.log(create_body);

  async function createInstallment(){
    console.log(create_body);
    var token = localStorage.getItem("token");

    // const res = await fetch("/panel/fees/installments/create/"+body._id, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    //   body: JSON.stringify(create_body),
    // });
    // // console.log(await res.text());
    // const json = await res.json();
    // if (json.status == "success") {
    //   alert("Thankyou, your Installment has been created");
    //   location.reload();
    //   // centre.reload();
    // } else {
    //   alert("Some problem has occured " + json.message);
    //   // location.reload();
    // }
  } 

  let myURL = "/panel/student_installment";

  async function saveInstallment(index) {
    var token = localStorage.getItem("token");

    let data = JSON.parse(JSON.stringify(body.installments));
    for (let i = 0; i < body.length; i++) {
      delete data[i].edit;
    }
    console.log(1);
    console.log(data[index - 1]);
    console.log("submitting inquiry form");

    //email...phone 10 digit, name,

    // console.log(body);
    // var token = localStorage.getItem("token");
    // // body.topic = topic;
    // var loginPath = get(ApiUrl);

    const res = await fetch("/panel/student_installment_edit/"+body.instllments[index-1]._id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data)

    });
    // console.log(await res.text());
    const json = await res.json();
    if (json.status == "success") {
      alert("Thankyou, your Installment has been saved");
      location.reload();
      // centre.reload();
    } else {
      alert("Some problem has occured " + json.message);
      // location.reload();
    }
    let result = JSON.stringify(json);
    console.log(result);

    console.log(json.stringify(body, null, 2));
    console.log(body);
  }

  async function deleteInstallment(index) {
    var token = localStorage.getItem("token");

    let data = JSON.parse(JSON.stringify(body.installments));
    for (let i = 0; i < body.length; i++) {
      delete data[i].edit;
    }
    console.log(1);
    console.log(data[index - 1]);
    console.log("submitting inquiry form");

    //email...phone 10 digit, name,

    // console.log(body);
    // var token = localStorage.getItem("token");
    // // body.topic = topic;
    // var loginPath = get(ApiUrl);

    const res = await fetch("/panel/student_installment_delete/"+body.instllments[index-1]._id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data)

    });
    // console.log(await res.text());
    const json = await res.json();
    if (json.status == "success") {
      alert("Thankyou, your Installment has been saved");
      location.reload();
      // centre.reload();
    } else {
      alert("Some problem has occured " + json.message);
      // location.reload();
    }
    let result = JSON.stringify(json);
    console.log(result);

    console.log(json.stringify(body, null, 2));
    console.log(body);
  }

  async function editInstallment(index) {
    var token = localStorage.getItem("token");
    body.installments[index - 1].edit = true;
    if (!data_save) {
      data_save = true;
    }
    condition = false;
  }

  console.log("studentID from slug:" + studentId);
  let body;
  // body.installments.push({
  //     amount: "50000",
  //     timestamp: "",
  //     installment_status:{
  //       received:false,
  //       timestamp: "",
  //       payment_mode:"",
  //       payment_reference_number:"",//receipt number
  //       staff:"",
  //     },
  //     // arr_paid_by: "",
  //     // dd_cheque_number: " ",
      
  //     edit: true,
  //   });

  // let body.installments = [];

  let date = new Date();

  // let cor_address = false;

  async function getStudentFees() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    console.log("trying branches");
    var res = await fetch(loginPath + "/panel/student_fee/" + studentId, {
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

  // async function handleSubmit1(event) {
  //   console.log("Installment Received");
  //   console.log(body);
  //   var token = localStorage.getItem("token");

  //   var loginPath = get(ApiUrl);
  //   // console.log(body);
  //   // here we have created the clone of the body, otherwise secondary address will be getting permanently deleted

  //   let data = JSON.parse(JSON.stringify(body));
  //   if (cor_address) {
  //     delete data.secondary_address;
  //   }
  //   const res = await fetch(myURL, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   // console.log(await res.text());
  //   const json = await res.json();
  //   if (json.status == "success") {
  //     alert("Thankyou for contacting us, our team will reach you shortly");
  //     // location.reload();
  //     location.href = "/admission/" + json.data;
  //   } else {
  //     alert("Some problem has occured " + json.message);
  //     // location.reload();
  //   }

  // }

  let src = "../images/";

  onMount(async () => {
    console.log("mounted");

    let token = localStorage.getItem("token");
    if (!token) {
      console.log("yes");
      location.href = "/login";
    }

    Token.set(token);

    let loginPath = get(ApiUrl);
    myURL = loginPath + "/panel/student_installment";
    await getStudentFees();
  });

  async function installment_received(index) {
    body = JSON.parse(JSON.stringify(body.installments));
    for (let i = 0; i < body.length; i++) {
      delete body[i].edit;
    }
    console.log(1);
    console.log(body[index - 1]);
    console.log("submitting inquiry form");

    //email...phone 10 digit, name,

    // console.log(body);
    // var token = localStorage.getItem("token");
    // // body.topic = topic;
    // var loginPath = get(ApiUrl);

    const res = await fetch("/panel/student_installment_receive/"+body.instllments[index-1]._id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        payment_mode:body.installments[index-1].installment_status.payment_mode,
        payment_reference_number:body.installments[index-1].installment_status.payment_reference_number}),
    });
    // console.log(await res.text());
    const json = await res.json();
    if (json.status == "success") {
      alert("Thankyou, your Installment has been received");
      location.reload();
      // centre.reload();
    } else {
      alert("Some problem has occured " + json.message);
      // location.reload();
    }
    let result = JSON.stringify(json);
    console.log(result);

    console.log(json.stringify(body, null, 2));
    console.log(body);
  }

  async function handlePlus() {
    body.installments.push({
      amount: "50000",
      timestamp: "",
      installment_status:{
        received:false,
        timestamp: "",
        payment_mode:"",
        payment_reference_number:"",//receipt number
        staff:"",
      },
      // arr_paid_by: "",
      // dd_cheque_number: " ",
      
      edit: true,
    });
    body.installments = body.installments;
  }
  

  // async function handleSubmit(){
  //   console.log(body.installments);
  // }

  // let disabled = [];


  // async function editInstallment(index) {
  //   disabled[index] = false;
  // }

  // async function saveInstallment(index) {
  //   disabled[index] = true;
  // }

  // let x = disabled;
  console.log(body);
</script>

{#if body}
  <div class="">
    <div>
      <p
        class="font-bold mt-8 mb-6 bg-green-700 text-white border-2 w-full p-2 justify-between text-center"
      >
        For Office use only
      </p>
    </div>
    <div class="card">
      <input type="text" bind:value={create_body.amount} placeholder="amount" />
      <input type="date" bind:value={create_body.timestamp} placeholder="amount" />
      <button on:click={createInstallment}>Add new</button>

    </div>

    <form action="">
      <div class="flex flex-row ">
        <p>Fee Details:</p>

        <div class="flex flex-col">
          <div class="mx-3 flex flex-row">
            <p>Total Fee</p>

            <input
              class="border-2 ml-2"
              type="number"
              bind:value={body.amount}
            />
          </div>

          <div class="mx-3 flex flex-col ">
            <div class="shadow-md p-4 my-2">
              <button class="btn my-2 mr-4 mb-6" on:click={handlePlus}
                >Add Installment</button
              ><br>

              {#each body.installments as installment, index}
                <span>Installment {index + 1}</span>
                <input
                  disabled={(index)=>cond(index)}
                  class="border-2"
                  type="text"
                  bind:value={installment.amount}
                />
                <span>Payment Date</span>
                <input
                  disabled={condition}
                  class="border-2"
                  type="date"
                  bind:value={installment.timestamp}
                />

                <div class="mx-3 flex flex-row space-x-3 mt-2">
                  <p class="mr-3">Paid by</p>

                  <label>
                    <input
                      disabled={condition}
                      type="radio"
                      bind:group={body.installments[index].installment_status.payment_mode}
                      name={index + 1}
                      value="Cash"
                    />
                    Cash
                  </label>

                  <label>
                    <input
                      disabled={condition}
                      type="radio"
                      bind:group={body.installments[index].installment_status.payment_mode}
                      name={index + 1}
                      value="Cheque"
                    />
                    Cheque
                  </label>

                  <label>
                    <input
                      disabled={condition}
                      type="radio"
                      bind:group={body.installments[index].installment_status.payment_mode}
                      name={index + 1}
                      value="Demand Draft"
                    />
                    Demand Draft
                  </label>

                  <label>
                    <input
                      disabled={condition}
                      type="radio"
                      bind:group={body.installments[index].installment_status.payment_mode}
                      name={index + 1}
                      value="NEFT"
                    />
                    NEFT
                  </label>

                  <label>
                    <input
                      disabled={condition}
                      type="radio"
                      bind:group={body.installments[index].installment_status.payment_mode}
                      name={index + 1}
                      value="RTGS"
                    />
                    RTGS
                  </label>

                  <label>
                    <input
                      disabled={condition}
                      type="radio"
                      bind:group={body.installments[index].installment_status.payment_mode}
                      name={index + 1}
                      value="ECS"
                    />
                    ECS
                  </label>

                  <br />
                </div>

                <div class="mx-3 flex flex-row space-x-3 mt-2">
                  <div class="flex flex-row mt-1">
                    <label for="dd_cheque_number">DD / Cheque Number</label>
                    <!-- {#if installment.edit}
                    <input class="border-2 ml-2" type="text" bind:value={installment.dd_cheque_number} />
                    {:else}
                    <input disabled class="border-2  ml-2" type="text" bind:value={installment.dd_cheque_number} />
                     {/if}
                     -->
                    <input
                      disabled={condition}
                      class="border-2 ml-2"
                      type="text"
                      bind:value={installment.installment_status.payment_reference_number}
                    />
                  </div>
                </div>

                <div class="mx-3 flex flex-row space-x-3 mt-2">
                  <div class="mx-3 flex flex-col ">
                    <label for="dd_cheque_number">Receipt Number</label>
                  </div>

                  <div class="flex flex-row ">
                    <input
                      disabled={condition}
                      class="border-2 ml-2"
                      type="text"
                      bind:value={installment.installment_status.receipt_number}
                    />
                  </div>
                </div>
                <div class=" mt-2 mb-12">
                  <button
                    class="btn float-right mr-2"
                    on:click={() => deleteInstallment(index + 1)}
                    >Remove Installment</button
                  >

                  {#if !condition}
                    <button
                      class="btn float-right mr-2"
                      on:click={() => saveInstallment(index + 1)}>Save</button
                    >
                  {:else}
                    <button
                      class="btn float-right mr-2"
                      on:click={() => editInstallment(index + 1)}>Edit</button
                    >
                  {/if}
                  <button
                    class="btn float-right mr-2"
                    on:click|preventDefault={() =>
                      installment_received(index + 1)}>Received</button
                  >
                </div>

                <br />
                <hr />
              {/each}
              <!-- <button class="btn" on:click={handleSubmit}>Submit</button> -->
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-end">
        <!-- <button
          class="shadow mr-28 mt-2 bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded object-right"
          on:click|preventDefault={handleSubmit}
          type="button"
        >
          Submit
        </button> -->
      </div>
    </form>
  </div>
{/if}
