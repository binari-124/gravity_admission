<script>
  let body = {};

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
</script>

<div>
  <p
    class="font-bold mt-8 mb-6 bg-green-700 text-white border-2 w-full p-2 justify-between text-center"
  >
    For Office use only
  </p>
  <!-- <p class="text-[.6em] mt-2 ml-6">
      Mandatory Fields are marked with asterick(*)
    </p> -->
</div>

<form action="">
  <div class="flex flex-row">
    <p>Fee Details:</p>

    <div class="flex flex-row space-x-3">
      <div class="mx-3 flex flex-col">
        <!-- <label for="final_fee">Final Fee</label> -->
        <p>Final Fee</p>
        <p class="mt-2">Installments Amount</p>
        <p class="mt-2">Payment Date</p>
        <p class="mt-2">Paid by</p>
        <p class="mt-10">Receipt Number</p>
      </div>

      <div class="mx-3 flex flex-col">
        <div class="flex flex-row">
          <input class="border-2" type="number" bind:value={body.final_fee} />
        </div>

        <div class="flex flex-row mt-1 space-x-1">
          <input
            class="border-2"
            type="number"
            placeholder="1st installment"
            bind:value={body.installment1}
          />
          <input
            class="border-2"
            type="number"
            placeholder="2nd Installment"
            bind:value={body.installment2}
          />
          <input
            class="border-2"
            type="number"
            placeholder="3rd Installment"
            bind:value={body.installment3}
          />
        </div>

        <div class="flex flex-row mt-2 space-x-4">
          <input
            class="border-2"
            type="date"
            placeholder="date"
            bind:value={body.installment1_date}
          />
          <input
            class="border-2"
            type="date"
            placeholder="date"
            bind:value={body.installment2_date}
          />
          <input
            class="border-2"
            type="date"
            placeholder="date"
            bind:value={body.installment3_date}
          />
        </div>
        <!-- <p class="mt-1 text-sm">(Cash / Cheque /Demand Draft /NEFT / RTGS)</p> -->
        <div>
          <label>
            <input
              type="radio"
              bind:group={body.paid_by}
              name="location"
              value="Cash"
            />
            Cash
          </label>

          <label>
            <input
              type="radio"
              bind:group={body.paid_by}
              name="location"
              value="Cheque"
            />
            Cheque
          </label>

          <label>
            <input
              type="radio"
              bind:group={body.paid_by}
              name="location"
              value="Demand Draft"
            />
            Demand Draft
          </label>

          <label>
            <input
              type="radio"
              bind:group={body.paid_by}
              name="location"
              value="NEFT"
            />
            NEFT
          </label>

          <label>
            <input
              type="radio"
              bind:group={body.paid_by}
              name="location"
              value="RTGS"
            />
            RTGS
          </label><br />
        </div>
        <div class="flex flex-row mt-1">
          <label for="dd_cheque_number">DD / Cheque Number</label>
          <input
            class="border-2 ml-2"
            type="number"
            id="dd_cheque_number"
            bind:value={body.dd_cheque_number}
          />
        </div>
        <div class="flex flex-row mt-3">
          <input
            class="border-2 ml-2 w-full"
            type="text"
            id="dd_cheque_number"
            bind:value={body.receipt_number}
          />
        </div>
      </div>
    </div>
  </div>

  <div class="w-full flex justify-end ">
    <button
      class="shadow mr-28 mt-2 bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded object-right"
      on:click|preventDefault={handleSubmit}
      type="button"
    >
      Submit
    </button>
  </div>
</form>
