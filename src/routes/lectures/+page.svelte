

<script>
	import LecturesList from '../../lib/components/lists/lectures.svelte';
	import {onMount} from 'svelte';
	import {Token} from '../_utils/dynamic_store.js';
	import {ApiUrl} from '../_utils/static_store.js';
	import { get } from 'svelte/store';
// import { roomId } from '../room/[slug].svelte';
	// export var roomId;

	var lectures = [];
	 var loginPath=get(ApiUrl);
	 let body = {};

	 body.skip = 0;
	 body.limit = 50;

	 function next() {
		body.skip += body.limit;
		getQuestions(body);
	}

	function previous() {
		body.skip -= body.limit;
		if (body.skip < 0) body.skip = 0;
		getQuestions(body);
	}
	
	 onMount(async ()=>{
		const urlParams = new URLSearchParams(window.location.search);
    	//  urlParams.has('class_number');
		
		let classQuery="";
		
		if(urlParams.has('class_number'))
		{
			let classNumber =urlParams.get("class_number");
			classQuery="?class_number="+classNumber;
		}
		
		// localStorage.setItem("token","some value");
		
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);



		// const res = await fetch(loginPath+'/panel/batches/lectures'+classQuery,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		// if(res.status==200){
		// 	try{
		// 			let response= await res.text();
		// 			// console.log(response);
		// 			response= await JSON.parse(response);
		// 			lectures = response.data;
		// 			console.log(lectures);
		// 			console.log("batches are loaded");
		// 	}
		// 	catch(e){
		// 		console.log("caught");
		// 		console.log(e);
		// 	}
		// }
		// else{
		// 			console.log(await res.text());
		// 			// user.email="no logged";
					
		// 		}
		// 
		getLectures(body);
	})

	async function getLectures(body = null, fresh = false) {
		var res;
		var token = localStorage.getItem("token");

		if (body) {
			console.log("fresh: " + fresh);
			if (fresh) {
				body.skip = 0;
			}
			res = await fetch(
				loginPath + "/panel/batches/lectures?" + serialize(body),
				{
					mode: "cors",
					method: "get",
					headers: { Authorization: "Bearer " + token },
				}
			);
		} else {
			res = await fetch(loginPath + "/panel/batches/lectures", {
				mode: "cors",
				method: "get",
				headers: { Authorization: "Bearer " + token },
			});
		}

		if (res.status == 200) {
			try {
				let response = await res.text();
				console.log(response);
				response = await JSON.parse(response);
				if (response.status == "success") {
					console.log("successfully grabbed lectures");
					lectures = response.data;
					lectures = lectures;
					console.log("This is lectures data");
					console.log(lectures);
					console.log("This is lectures data");
				}
			} catch (e) {
				console.log("caught");

				console.log(e);
			} finally {
			}
		} else {
			console.log(await res.text());
		}
	}

	function serialize(obj) {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p)) {
				if (obj[p] != "-") {
					str.push(
						encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
					);
				}
			}
		return str.join("&");
	}

</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0;
	}

	h1 {
		/* font-size: 2.8em; */
		text-transform: uppercase;
		font-weight: 700;
		margin:5px;
		/* font-family: 'MonteCarlo', cursive; */
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	.item{
		padding:10px;
		display:block;
		width:100%;
		text-decoration: none;
		margin:1px;
		background-color: rgb(255, 255, 255);
	}
	.item:hover{
		/* background-color: rgb(191, 201, 255); */
		cursor:pointer;
	}
	p{
		text-align: left;
		/* font-family: 'Merriweather', serif; */
	}

	.grid-container {
	display: grid;
	grid-template-columns: auto auto auto;
	grid-gap: 10px;
	background-color: rgb(255, 255, 255);
	/* padding: 10px; */
	}

	.grid-container > div {
	/* background-color: rgba(255, 255, 255, 0.8); */
	/* border: 1px solid black; */
	text-align: center;
	/* font-size: 30px; */
	}
	a{
		text-decoration: none;
	}

	img{
		width:100px;
	}

	h2,h3{
		font-size:300%;
	}
</style>

{#if lectures}
<h3>Lectures({body.skip}-{body.skip + body.limit})</h3>
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

<!-- <div class="w3-padding w3-margin"> -->
	<!-- {console.log(selectedOptions)} -->
	<!-- {#await forceUpdate(questions) then _}
		<Questions {picker} bind:selectedQuestions {questions} />
	{/await}
</div> -->

<!-- <h3>Chapters</h3> -->
<!-- <h3>Lectures</h3> -->
<a href="/lectures/create/">
	<button class="w3-button w3-border w3-round">Add new <i class="w3-text-grey fas fa-plus"></i></button>
</a>


<hr>
<div class="w3-round">
	{#if lectures}
		<!-- <p>sad</p> -->
		<LecturesList {lectures} />
	{:else}
		<p class="w3-center	">Loading</p>
	{/if}
</div>


{:else}
<p>No lecture found!</p>
{/if}


