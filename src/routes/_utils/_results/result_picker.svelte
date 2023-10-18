<script>
    import { onMount } from "svelte";
    import { Token } from "$lib/dynamic_store.js";
    import { ApiUrl } from "$lib/static_store.js";
    import { get } from "svelte/store";
    import ResultsList from "$lib/components/lists/results.svelte";

    var results = null;
    var tests = null;

    var 
    // streams = [],
        branches = [],
        batches = [];
        // tests = null;


    export let picker = true;

    let fresh = true;

    let body = {};
    var loginPath = get(ApiUrl);

    function next() {
        body.skip += body.limit;
        getStudents();
    }

    function previous() {
        body.skip -= body.limit;
        if (body.skip < 0) body.skip = 0;
        getStudents();
    }

    onMount(async () => {
        console.log("mounted");
        // localStorage.setItem("token","some value");

        var token = localStorage.getItem("token");
        if (!token) {
            console.log("yes");
            // location.href="/login";
        }
        Token.set(token);

        body.batch = "-";
        body.branch = "-";
        // body.stream = "-";
        body.skip = 0;
        body.limit = 50;

        // await getStreams();
        await getBatches();
        await getBranches();

        await getResults();
        await getTest();
    });

    // const forceUpdate = async (_) => {};
    // ``;

    async function getResults(fresh = false) {
        var res;
        var token = localStorage.getItem("token");

        // console.log("fresh: " + fresh);
        // if (fresh) {
        //     body.skip = 0;
        // }
        
        // res = await fetch(loginPath + "/panel/students?" + serialize(body), {
        //     mode: "cors",
        //     method: "get",
        //     headers: { Authorization: "Bearer " + token },
        // });

        // if (res.status == 200) {
        //     try {
        //         let response = await res.text();
        //         console.log(response);
        //         response = await JSON.parse(response);
        //         if (response.status == "success") {
        //             console.log("successfully grabbed students");
        //             students = response.data;
        //             students = students;
        //             console.log(students);
        //             // students=questions;
        //         }
        //     } catch (e) {
        //         console.log("caught");

        //         console.log(e);
        //     }
        // } else {
        //     console.log(await res.text());
        // }
         res = await fetch(loginPath + "/panel/results/results_filter", {
            mode: "cors",
            method: "get",
            headers: { Authorization: "Bearer " + token },
        });
        if (res.status == 200) {
            try {
                let response = await res.text();
                console.log(response);
                response = await JSON.parse(response);
                results = response.data;
            } catch (e) {
                console.log("caught");

                console.log(e);
            }

            // let data = JSON.parse(text);
        } else {
            console.log(await res.text());
            user.email = "no logged";
        }
    }

    // function serialize(obj) {
    //     var str = [];
    //     for (var p in obj)
    //         if (obj.hasOwnProperty(p)) {
    //             if (obj[p] != "-") {
    //                 str.push(
    //                     encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
    //                 );
    //             }
    //         }
    //     return str.join("&");
    // }

    async function getStreams() {
        // console.log(body);
        var token = localStorage.getItem("token");
        var loginPath = get(ApiUrl);
        let res;
        res = await fetch(loginPath + "/panel/streams", {
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
                    streams = response.data;
                    console.log(streams);
                } else {
                    console.log(response.message);
                    alert(response.message);
                }
            } catch (e) {
                console.log("caught");
                console.log(e);
            } finally {
            }
        } else {
            console.log(await res.text());
            // user.email = "no logged";
        }
    }

    async function getTest() {
        // console.log(body);
        var token = localStorage.getItem("token");
        var loginPath = get(ApiUrl);
        let res;
         res = await fetch(loginPath+'/panel/tests',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					tests = response.data;	
			}
			catch(e){
				console.log("caught");
				console.log(e);
			}
		}
		else{
				console.log(await res.text());
				user.email="no logged";
					
			}
    }

    async function getBatches() {
        // console.log(body);
        var token = localStorage.getItem("token");
        var loginPath = get(ApiUrl);
        let res;
        res = await fetch(loginPath + "/panel/batches/", {
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
                    batches = response.data;
                    console.log(batches);
                } else {
                    console.log(response.message);
                    alert(response.message);
                }
            } catch (e) {
                console.log("caught");
                console.log(e);
            } finally {
            }
        } else {
            console.log(await res.text());
            // user.email = "no logged";
        }
    }

    async function getBranches() {
        // console.log(body);
        var token = localStorage.getItem("token");
        var loginPath = get(ApiUrl);
        let res;
        res = await fetch(loginPath + "/panel/branches/", {
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
                    branches = response.data;
                    console.log(branches);
                } else {
                    console.log(response.message);
                    alert(response.message);
                }
            } catch (e) {
                console.log("caught");
                console.log(e);
            } finally {
            }
        } else {
            console.log(await res.text());
            // user.email = "no logged";
        }
    }

    
</script>

<svelte:head>
    <title>Chapter</title>
</svelte:head>

<div class="container w3-border w3-padding" style="--template-color:red">
    {#if picker}
        Picker
    {/if}
    <h4>Filters</h4>
    <form on:submit|preventDefault={getResults}>
        <div class="flex flex-row space-x-6">
            <div class="w-1/4">
                <label for="question_difficulty">Result Type</label>
                <select
                    id="question_difficulty"
                    class="w3-input w3-border w3-round "
                    bind:value={body.result_type}
                >
                    <option value="-">Select Result Type</option>
                    <option value="jee_main">JEE Main</option>
                    <option value="neet">NEET</option>
                    <option value="general">General</option>
                    
                </select>
            </div>
            <!-- <div class="w-1/4">
                <label for="question_difficulty"> Difficulty</label>
                <select
                    id="question_difficulty"
                    class="w3-input w3-border w3-round mt-1"
                    bind:value={body.difficulty}
                >
                    <option value="-">Select Difficulty</option>
                    <option value="very-easy">Very Easy</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="vary-hard">Very-Hard</option>
                </select>
            </div> -->
            <!-- <div
                class=" border-[1px] p-2 rounded-sm mx-1 my-2 w-1/4 h-10 mt-7 bg-gray-200 border-gray-300"
            >
                <span>For Advanced?</span>
                <input
                    type="radio"
                    checked={body.for_advanced}
                    on:click={toggleAdvanced}
                />
            </div> -->
            
            <div class="w-1/4">
                {#if branches && branches.length > 0}
                <label for="question_topic">Branch</label>
                <select
                    id="question_topic"
                    class="w3-input w3-border w3-round"
                    bind:value={body.branch}
                >
                    <option value="-">Select Branch</option>

                    {#each branches as branch}
                        <option value={branch._id}
                            >{branch.name.toUpperCase()}</option
                        >
                    {/each}
                </select>
                {/if}
            </div>

            <div class="w-1/4">
                {#if batches && batches.length > 0}
                <label for="question_topic">Batch</label>
                <select
                    id="question_topic"
                    class="w3-input w3-border w3-round"
                    bind:value={body.batch}
                >
                    <option value="-">Select Batch</option>

                    {#each batches as batch}
                        <option value={batch._id}
                            >{batch.name.toUpperCase()}</option
                        >
                    {/each}
                </select>
                {/if}
            </div>

            <div class="w-1/4 ">
                <label for="exam_date">Exam Date</label><br>
                <input class="mt-2" type="date" name="exam date" id="exam_date" bind:value={body.exam_date}>
            </div>


            
        </div>

        <div class="flex flex-row space-x-6 mb-12">
            <div class="w-1/2 ">
                    
                <input
                    class="mt-7 border-[1px] w-full p-2"
                    placeholder="Search by Exam Name or Exam ID"
                    bind:value={body.exam_id}
                />
            </div>
            <div class="w-1/2 ">
                    
                <input
                    class="mt-7 border-[1px] w-full p-2"
                    placeholder="Search by Batch Name and Batch ID"
                    bind:value={body.batch_id}
                />
            </div>
        </div>

        <input
            class="w3-button w3-round w3-border"
            type="submit"
            value="Apply filters"
        />
    </form>

    {#if results}
        <h3>Results({body.skip}-{body.skip + body.limit})</h3>
        <div class="flex">
            <p
                class="w3-button w3-border w3-round w3-margin"
                on:click={previous}
            >
                Previous
            </p>
            <p class="w3-button w3-border w3-round w3-margin" on:click={next}>
                Next
            </p>
        </div>

        <div class="w3-padding w3-margin">
            <ResultsList {tests} />
        </div>
    {:else}
        <p>No results found!</p>
    {/if}
</div>

<style>
    * {
        color: rgb(51, 51, 51);
    }
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
        align-items: left;

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
        /* width:100%; */
        margin: 0;
        text-align: left;
    }
    h1 {
        margin: 00px;
    }
    div {
        align-self: left;
        justify-self: left;
    }
    .abs {
        position: absolute;
        top: 120px;
        right: 130px;
    }
    a {
        text-decoration: none;
    }

    h2,
    h3 {
        font-size: 250%;
    }

    button {
        display: inline;
        width: 200px;
    }
</style>
