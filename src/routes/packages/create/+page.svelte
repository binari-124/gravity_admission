<script>
	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	export var body = {stream:""};

	// let stream="";

	let streams=[];
	let branches=[];

	 var loginPath=get(ApiUrl);
	 onMount(async ()=>{
		
		
		console.log("mounted");
		// localStorage.setItem("token","some value");
		
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);
		getStreamsAndBranches();
		
	});

	

	async function handleSubmit(){
		console.log(body);
		if(body.paid==""){
			body.paid = false;
		}
		else
		{
			body.paid = true;
		}
		console.log(body);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/package_create',{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

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


	async function getStreamsAndBranches(){
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/streams_and_branches',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						streams=response.data.streams;
						branches=response.data.branches;
						console.log(streams);
						console.log(branches);
					}
					else{
						console.log(response.message);
						alert("Server Error:"+response.message);
					}	
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
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	input[type=checkbox]{
		display:inline;
		width:50px;
	}
</style>

<svelte:head>
	<title>Package</title>
</svelte:head>


<h4 class="w3-black w3-round w3-card w3-padding"> Add A Package </h4>
<form on:submit|preventDefault={handleSubmit} >
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.name} placeholder="Name(*)" required/>
	<!-- <input class="w3-input w3-border w3-round" type="text" bind:value={body.s} placeholder="Address" required/>
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.contact} placeholder="Contact us" required/> -->
	<label>Select a stream</label>
	<select class="w3-input" bind:value={body.stream} >
		<option value="">Select a Stream</option>
		{#each streams as stream}
			<option value={stream._id}>
				{stream.name}
			</option>
		{/each}
		
	</select>
	<div class="w3-block">
		Is Package Paid? <input type="checkbox" bind:value={body.paid} class="w3-input" />
	</div>

	<input class="w3-button w3-border w3-round w3-black w3-card" type="submit" value="Create">
</form>
