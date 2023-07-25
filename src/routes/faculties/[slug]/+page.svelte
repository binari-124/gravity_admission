<!-- <script context="module">
	export async function preload(p,session) {
		
		let params = p.params;
		return {facultyId:params.slug};
	}
</script> -->
<script>
	/** @type {import('./$types').PageData} */
export let data;
export let facultyId = data.facultyId;
console.log("facultyID from slug:" + facultyId);

// import { userInfo } from "os";
	import {onMount} from 'svelte';
	import {Token} from '../../_utils/dynamic_store.js';
	import {ApiUrl} from '../../_utils/static_store.js';
	import { get } from 'svelte/store';
	

	let fileId;


	let tab = "files";
	
	let faculty;
	// let topics;

	
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
		var loginPath=get(ApiUrl);
		const res = await fetch(loginPath+'/panel/faculties/single/'+facultyId,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						console.log("successfully grabbed faculty");
						faculty = response.data;
						

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
	});

	async function handleDelete(){
		// body.content= btoa(tinymce.get('content').getContent());

		var token = localStorage.getItem("token");
		console.log("inside batch delete");
		// body.topic = topic;
		var loginPath=get(ApiUrl);
		let res;
		res = await fetch(loginPath+'/panel/faculties/delete/'+facultyId,{mode:'cors',method:'post',headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json'}});

		if(res.status==200){
			try{
					let response= await res.text();
					response= await JSON.parse(response);
					if(response.status == "success")
					{
						window.history.back();
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
	</script>

<style>
	*{
		color:rgb(51, 51, 51);
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

	.container{
		
		width:100%;
		/* border:1px solid rgb(140, 140, 140); */
		border-radius: 5px;
		margin:10px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: left;

		/* background: linear-gradient(45deg,rgb(134, 60, 253),var(--template-color)); */

	}
	img{
		display:block;
		width:150px;
	}
	.certificate{
		font-size: 120px;
		font-family: 'MonteCarlo', cursive;
	}
	.organization{
		color:black;
		font-size: 80px;
		font-family: 'MonteCarlo', cursive;
	}
	.cont{
		font-family: 'MonteCarlo', cursive;
		font-size: 30px;
	}
	.straight{
		font-family: 'Merriweather', serif;

		/* font-family: 'MonteCarlo', cursive; */
	}
	.flex{
		margin-top: 30px;
		display:flex;
		align-items: stretch;
	}
	.flexit{
		flex:1;
		padding:20px;
	}
	p{
		/* width:100%; */
		margin:0;
		text-align: left;
	}
	h1{
		margin:00px;
	}
	div{
		align-self: left;
		justify-self: left;
	}
	.abs{
		position:absolute;
		top:120px;
		right:130px;
	}
	a{
		text-decoration: none;;
	}
	label{
		color:#777777;
	}
</style>

<svelte:head>
	<title>Faculties</title>
</svelte:head>


<div class="container w3-card " style="--template-color:red">
	{#if faculty}
	<h1 class="w3-xxlarge w3-round w3-padding w3-margin ">Faculty: {faculty.name}</h1>
	<table class="w3-table-all w3-hoverable"  width="100%">
		<thead>
		  <tr class="w3-light-grey">
			<!-- <th>#</th> -->
			<th>Name</th>
			<th>Faculty Id</th>
			<th>Description</th>
			<th>Stream</th>
			<th>Subject</th>
			
			<th>Edit</th>
			<th>Delete</th>
			
			
		  </tr>
		</thead>
		<!-- {#each batches as batch,ind} -->
		<tr class="w3-hover-shadow">
			<!-- <td>{ind+1}</td> -->
			<td>{faculty.name}</td>
			<td><a class="w3-text-blue">{faculty._id}</a></td>

			<td>{faculty.description}</td>
			<td>{faculty.stream?faculty.stream.name:"-"}</td>
			<td>{faculty.subject?faculty.subject.name:"-"}</td>
			<td><a href="/faculties/edit/{faculty._id}"><button class="w3-button w3-card w3-round"><i class="w3-text-grey fas fa-edit"></i> Edit</button></a></td>
			<!-- <td><button class="w3-text-blue w3-center" on:click={()=>{handleDelete(batch._id)}} >Edit</button></td> -->
			<td> <button on:click={()=>{handleDelete(faculty._id)}} class="w3-button w3-red w3-card w3-round"><i class="w3-text-white fas fa-trash"></i> Delete</button></td>

		</tr>
		<!-- {/each} -->
	  </table>

	{:else}
	<p class="w3-center">Loading</p>
	{/if}



</div>

