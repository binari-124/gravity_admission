<!-- <script context="module">
	export async function preload(p,session) {
		let params = p.params;
		return {moduleId:params.slug};
	}
</script> -->
<script>
	/** @type {import('./$types').PageData} */
export let data;
export let moduleId = data.moduleId;
console.log("moduleID from slug:" + moduleId); 

	import {onMount} from 'svelte';
	import {Token} from '../../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../../_utils/static_store.js';
	import { get } from 'svelte/store';

	// import YouTubePlayer from 'youtube-player';

	

	let subjects=[];
	// let player1;
	var body;
	
	var loginPath=get(ApiUrl);
	onMount(async ()=>{
		
		var loginPath=get(ApiUrl);
		
		console.log("mounted");
		var token = localStorage.getItem("token");
		if(!token)
		{
			console.log("yes");
			location.href="/login";
		}
		Token.set(token);

		await getBody();

		await getSubjects();
	});

	async function getBody(){
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res = await fetch(loginPath+'/panel/modules/single/'+moduleId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});
		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						body = response.data;
						body.subject = body.subject._id;

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
			finally{
				
			}	
		}
		else{
					console.log(await res.text());
					// user.email="no logged";
					
				}
	}

	async function handleSubmit(){
		// body.content= btoa(tinymce.get('content').getContent());

		var token = localStorage.getItem("token");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/modules/module_edit/'+moduleId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)});

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
			finally{
				
			}	
		}
		else{
					console.log(await res.text());
				}
	}

	async function getSubjects(){
		// console.log(body);
		console.log("getting subjects");
		var token = localStorage.getItem("token");
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/subjects',{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						subjects=response.data;
						
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
			finally{
				
			}	
		}
		else{
					console.log(await res.text());
					//user.email="no logged";
					
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
	<title>Module</title>
</svelte:head>


<h4 class=" w3-round w3-margin w3-xlarge"> Edit Module</h4>
<!-- <h4 class=" w3-margin w3-text-grey"> Lectures are later can be added into respective batches</h4> -->

<!-- name: {
	type: String,
	required:true
},
class_number:{
	type:String, 
},
subject:{
	type:ObjectId,
	ref:"subjects",
},
enabled_online -->


<hr>
{#if body}
<form on:submit|preventDefault={handleSubmit} >
	<label>Name</label>
	<input class="w3-input w3-border w3-round w3-margin w3-padding" type="text" bind:value={body.name} placeholder="Name(*)" required/>
	<!-- <input class="w3-input w3-border w3-round" type="text" bind:value={body.s} placeholder="Address" required/>
	<input class="w3-input w3-border w3-round" type="text" bind:value={body.contact} placeholder="Contact us" required/> -->
	<!-- <label>Class</label> -->
	<label>Select a Class</label>
	<select class="w3-input" bind:value={body.class_number} >
		<option value="" >Select a Class</option>
		<option value="7">7th Class</option>
		<option  value="8">8th Class</option>
		<option value="9">9th Class</option>
		<option value="10">10th Class</option>
		<option  value="11">11th Class</option>
		<option value="12">12th Class</option>
		<option value="13">Passout</option>
	</select>

	<label>Subject</label>
	{#if subjects}
	<label>Select a Subject</label>
	<select class="w3-input w3-margin w3-padding w3-white w3-round" bind:value={body.subject} >
		<option value="" >Select a Subject</option>
		{#each subjects as subject}
			<option value={subject._id}>
				{subject.name}
			</option>
		{/each}
	</select>
	{/if}

	<br>
	<label>Enabled For Online Selling?</label>
	<input type="checkbox" bind:checked={body.enabled_online} />

	{#if body.enabled_online }
	<label>Price (including Taxes)</label>
	<input class="w3-input w3-border w3-round w3-margin w3-padding" type="text" bind:value={body.price} placeholder="Price" required/>

	{/if}

	<input class="w3-button w3-right w3-border w3-round w3-green w3-card w3-border" type="submit" value="Done">
</form>
{/if}
