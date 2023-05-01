<script>
  import { onMount } from "svelte";
  import { Token } from "../../../../../src/routes/_utils/dynamic_store.js";
  import { ApiUrl } from "../../../../../src/routes/_utils/static_store.js";
  import { get } from "svelte/store";
  import ImageUpload from "../../../../../src/routes/_utils/imageUpload.svelte";

  let date = new Date();

  let streams = [],
    batches = [],
    branches = [],
    form_data = [];

  let myURL = "";

  let cor_address = false;

  let permanent_address = "",
    permanent_city = "",
    permanent_state = "",
    permanent_pin = "";

  // let correspondence_address = "", correspondence_city = "",
  // correspondence_state = "", correspondence_pin = "";

  // var url = null;

  // let centre_scoops = 1;
  // let stream_scoops = 1;
  // let course_scoops = 1;

  // let course_opted = 1;

  let src = "../images/";

  let body = {
    // centre: [],
    // stream: [],
    // course_opted: [],
    // course_opted_class: [],
    how_came_to_know: [],
  };

  onMount(async () => {
    console.log("mounted");

    // let token = localStorage.getItem("token");
    // if(!token)
    // {
    // 	console.log("yes");
    // 	centre.href="/login";
    // }
    // Token.set(token);
    let loginPath = get(ApiUrl);

    await getformdata();
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

  async function getformdata() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    var res = await fetch(loginPath + "/panel/branches/", {
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
          form_data = response.data;
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

  async function getstreamsBatches() {
    var token = localStorage.getItem("token");
    var res;
    var loginPath = get(ApiUrl);
    var res = await fetch(
      loginPath + "/panel/streams_batches_subjects_schemes/",
      {
        mode: "cors",
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status == 200) {
      try {
        let response = await res.text();
        response = await JSON.parse(response);
        if (response.status == "success") {
          streams = response.data.streams;
          batches = response.data.batches;
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
</script>

<div class="">
  <!-- <h3 class=" text-5xl">Students</h3> -->
  <div class="container" style="--template-color:red">
    <a
      class="w3-button w3-round w3-card w3-hover-green w3-margin"
      href="/admission/create/student_onboarding/fee_management"
      >Fee Management</a
    >
    <a
      class="w3-button w3-round w3-card w3-hover-green w3-margin"
      href="/admission/create/student_onboarding/edit_student">Edit</a
    >
  </div>

  {#if body}
    <div class="mt-6">
      <p class="text-center text-xl">ADMISSION FORM</p>
      <form id="registration" class="w-full mx-auto p-6">
        <ImageUpload
          bind:url={body.profilePicture}
          avatar={body.profilePicture}
        />
        <div class=" flex flex-col">
          <p class="w3-left">Select Branch</p>

          <p class="w3-input w3-border w3-round w3-margin">
            {form_data.branch}
          </p>

          <p class="w3-left">Select Stream</p>

          <p class="w3-input w3-border w3-round w3-margin">
            {form_data.stream}
          </p>
          <p class="w3-left">Select Batch</p>

          <p class="w3-input w3-border w3-round w3-margin">{form_data.batch}</p>

          <p>Class</p>
          <p class="w3-input w3-border w3-round w3-margin">{form_data.class_number}</p>

          <div class="mx-5 my-6">
            <div class="flex flex-row">
              <p class="font-bold">Personal Details</p>
              <!-- <p class="text-[.6em] mt-2 ml-6">
                Mandatory Fields are marked with asterick(*)
              </p> -->
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="student_name">Student Name:</p>
              <p class="flex-1 border-2 rounded-md p-1">
                {form_data.student_name}
              </p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="father_name">
                Father's/Guardian's name:
              </p>
              <p class="flex-1 border-2 rounded-md p-1">
                {form_data.father_name}
              </p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="mother_name">Mother's Name:</p>
              <p class="flex-1 border-2 rounded-md p-1">
                {form_data.mother_name}
              </p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="occupation_of_father">
                Occupation of Father/Guardian:
              </p>
              <p class="flex-1 border-2 rounded-md p-1">
                {form_data.occupation_of_father}
              </p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="occupation_of_mother">
                Occupation of Mother:
              </p>
              <p class="flex-1 border-2 rounded-md p-1" type="text">
                {form_data.occupation_of_mother}
              </p>
            </div>

            <div class="flex flex-row">
              <div class=" my-1 mt-2">
                <p class="mt-1 mr-1" for="date_of_birth">Date of Birth:</p>
                <p class=" border-2 rounded-md p-1">
                  {form_data.date_of_birth}
                </p>
              </div>

              <div class=" ml-20 mt-4">
                <p class="mt-1 mr-1">Gender:</p>
                <p id="gender">{form_data.gender}</p>
              </div>

              <div class=" ml-20 mt-4">
                <p class="mt-1 mr-1">Blood Group:</p>
                <p>{form_data.blood_group}</p>
              </div>

              <div class=" ml-20 mt-4">
                <p class="mt-1 mr-1">Category:</p>
                <p>{form_data.category}</p>
              </div>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" > Nationality </p>
              <p
                class="flex-1 border-2 rounded-md p-1"
                
               
                
              >{form_data.nationality}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="mobile_parents"
                >Mobile Parents:</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{form_data.mobile_parents}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="mobile_students"
                >Mobile Students:</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
               
              >{form_data.mobile_students}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="e_mail_id">E-Mail ID:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
               
              >{form_data.e_mail_id}</p>
            </div>

            <div class="flex flex-row">
              <p class="font-bold mt-8">Permanent Address</p>
              <!-- <p class="text-[.6em] mt-2 ml-6">
            Mandatory Fields are marked with asterick(*)
          </p> -->
              <hr />
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" >Address:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
               
              >{form_data.permanent_address}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="permanent_city"> City:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{form_data.permanent_city}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" for="permanent_state"> State:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{form_data.permanent_state}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" >PIN:</p>
              <p
                class="flex-1 border-2 rounded-md p-1"
               
              >{form_data.permanent_pin}</p>
            </div>

            <div class="flex flex-row mt-8">
              <p class="font-bold">Correspondence Address</p>
              <!-- <input class="ml-2 mt-1" type="checkbox" bind:checked={cor_address}> -->
              <p class="text-[.6em] mt-2 ml-6">(same as permanent Address)</p>
            </div>

            
              <div class=" my-1 flex mt-2">
                <p class="mt-1 mr-2" 
                  >Address:</p
                >
                <p>{form_data.correspondence_address}</p>
              </div>

              <div class=" my-1 flex mt-2">
                <p class="mt-1 mr-2" >
                  City:</p
                >
                <p>{form_data.correspondence_city}</p>
              </div>

              <div class=" my-1 flex mt-2">
                <p class="mt-1 mr-2" >
                  State:</p
                >
                <p>{form_data.correspondence_state}</p>
              </div>

              <div class=" my-1 flex mt-2">
                <p class="mt-1 mr-2" >PIN:</p>
                <p>{form_data.correspondence_pin}</p>
              </div>
            

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" 
                >Phone (Residence):</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
               >{form_data.phone_residence}</p> 
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" >Phone (office):</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{form_data.phone_office}</p>
            </div>

            <div class="flex flex-row">
              <p class="font-bold mt-8">Last Class Detail</p>
              <!-- <p class="text-[.6em] mt-2 ml-6">
            Mandatory Fields are marked with asterick(*)
          </p> -->
              <hr />
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" 
                >Schools/College Name:</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{form_data.school_college_name}</p>
            </div>

            <div class=" my-1 flex mt-2">
              <p class="mt-1 mr-2" >
                Address:</p
              >
              <p
                class="flex-1 border-2 rounded-md p-1"
                
              >{form_data.address_school_college}</p>
            </div>

            <div class="flex flex-row mt-8">
              <p>Marks Obtained</p>

              <p
                class="text-xs mt-1 ml-4 mr-2"
                
                >Percentage of Class VII/VIII/IX/X</p
              >
              <p
                class="border-2 w-16"
                
              >{form_data.percentage_of_secondary}</p>

              <p class="text-xs mt-1 ml-4 mr-2" 
                >%(X/XII Board, PCM-Aggregate)</p
              >
              <p
                class="border-2 w-16"
                
              >{form_data.senior_secondary_pcm}</p>

              <p class="text-xs mt-1 ml-4 mr-2" 
                >%(X/XII Board, PCB-Aggregate)</p
              >
              <p
                class="border-2 w-16"
                
              >{form_data.senior_secondary_pcb}</p>
            </div>

            <div class="flex flex-row mt-8">
              <p>Grades Obtained</p>

              <p class="text-xs mt-1 ml-4 mr-2" 
                >In Science</p
              >
              <p
                class="border-2 w-16 h-7"
                
              >{form_data.science_grades}</p>

              <p class="text-xs mt-1 ml-4 mr-2" 
                >In Math</p
              >
              <p
                class="border-2 w-16 h-7"
                
              >{form_data.math_grades}</p>

              <p class=" mt-1 justify-end ml-24 mr-2 h-7" 
                >Exam Board</p
              >
              <p
                class="border-2 justify-end h-7"
                
              >{form_data.board}</p>
              <p class=" mt-1 justify-end ml-4 mr-2" 
                >(CBSE/ICSE/ISC/UP/Others)</p
              ><br /><br /><br />
            </div>

            <div
              class="flex flex-row p-1 bg-green-700 text-white border-2 w-full"
            >
              <p>How did you come to know about Gravity ?</p>

              <p class="mx-3 mt-1" for="promotion_team">
                Promotion Team
              </p>
              <p
                
              >{form_data.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="newspaper"> Newspaper </p>
              <p
                
              >{form_data.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="teacher"> Teacher </p>
              <p
                
              >{form_data.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="friend_relatives">
                Friend/Relatives
              </p>
              <p
                
              >{form_data.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="website"> Website </p>
              <p
                
                required
              >{form_data.how_came_to_know}</p>

              <p class="mx-3 mt-1" for="radio_tv"> Radio/Tv </p>

              <p
                
              >{form_data.how_came_to_know}</p>
            </div>
          </div>
        </div>
        <div class="md:flex md:items-center mt-8">
          <div class="md:w-1/3 flex">
            <button
              class="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded object-right"
              on:click|preventDefault={handleSubmit}
              type="button"
            >
              Submit
            </button>
          </div>
          <div class="md:w-2/3" />
        </div>
      </form>
    </div>
  {/if}
</div>
