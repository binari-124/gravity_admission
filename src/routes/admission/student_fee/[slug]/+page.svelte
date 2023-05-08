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
    { installment: "50000 ", timestamp: " " , arr_paid_by:"", dd_cheque_number:" ", receipt_number:" " },
    { installment: "50000 ", timestamp: " " , arr_paid_by:"", dd_cheque_number:" ", receipt_number:" " }
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
    console.log(installments);
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
    installments.push( { installment: "50000 ", timestamp: " " , arr_paid_by:"", dd_cheque_number:" ", receipt_number:" " });
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

{#if body}
  <div class="">
    <div>
      <p
        class="font-bold mt-8 mb-6 bg-green-700 text-white border-2 w-full p-2 justify-between text-center"
      >
        For Office use only
      </p>
    </div>

    <form action="">
      <div class="flex flex-row">
        <p>Fee Details:</p>

        <div class="flex flex-col">
          <div class="mx-3 flex flex-row">
            <p>Final Fee</p>

            <input class="border-2" type="number" bind:value={body.final_fee} />
          </div>

          <div class="mx-3 flex flex-col">
            <div class="shadow-md bg-slate-200 p-4 my-2">
              <button class="btn my-2 mr-4" on:click={handlePlus}>+</button>

              {#each installments as installment, index}
                <span>Installment {index + 1}</span>
                <input
                  class="border-2"
                  type="text"
                  bind:value={installments.installment}
                />
                <span>Payment Date</span>
                <input
                  class="border-2"
                  type="date"
                  bind:value={installments.timestamp}
                />

                <div class="mx-3 flex flex-row space-x-3 mt-2">
                  <p class="mr-3">Paid by</p>

                  <label>
                    <input
                      type="radio"
                      bind:group={installments.arr_paid_by}
                      name="location"
                      value="Cash"
                    />
                    Cash
                  </label>

                  <label>
                    <input
                      type="radio"
                      bind:group={installments.arr_paid_by}
                      name="location"
                      value="Cheque"
                    />
                    Cheque
                  </label>

                  <label>
                    <input
                      type="radio"
                      bind:group={installments.arr_paid_by}
                      name="location"
                      value="Demand Draft"
                    />
                    Demand Draft
                  </label>

                  <label>
                    <input
                      type="radio"
                      bind:group={installments.arr_paid_by}
                      name="location"
                      value="NEFT"
                    />
                    NEFT
                  </label>

                  <label>
                    <input
                      type="radio"
                      bind:group={installments.arr_paid_by}
                      name="location"
                      value="RTGS"
                    />
                    RTGS
                  </label>

                  <label>
                    <input
                      type="radio"
                      bind:group={installments.arr_paid_by}
                      name="location"
                      value="ECS"
                    />
                    ECS
                  </label>

                  <br />
                </div>

                <div class="mx-3 flex flex-row space-x-3 mt-2">
                  <div class="flex flex-row mt-1">
                    <label for="dd_cheque_number">DD / Cheque Number</label>
                    <input
                      class="border-2 ml-2"
                      type="number"
                      id="dd_cheque_number"
                      bind:value={installments.dd_cheque_number}
                    />
                  </div>
                </div>

                <div class="mx-3 flex flex-row space-x-3 mt-2">
                  <div class="mx-3 flex flex-col">
                    <p class="mt-10">Receipt Number</p>
                  </div>

                  <div class="flex flex-row mt-3">
                    <input
                      class="border-2 ml-2"
                      type="text"
                      id="dd_cheque_number"
                      bind:value={installments.receipt_number}
                    />
                  </div>
                  <button class="btn" on:click={() => deleteInstallment(index)}>-</button><br>
                  <button class="btn" on:click={() => editInstallment(index)}>-</button>
                </div>

                <br />
                <hr class="w-4" />
              {/each}
              <!-- <button class="btn" on:click={handleSubmit}>Submit</button> -->
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-end">
        <button
          class="shadow mr-28 mt-2 bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded object-right"
          on:click|preventDefault={handleSubmit}
          type="button"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
{/if}
