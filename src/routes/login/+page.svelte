<script context="module">
	// var user={};
	 import {ApiUrl} from '../_utils/static_store.js';
	 var loginPath=get(ApiUrl);
	 import {Token} from '../_utils/dynamic_store.js';
	 console.log("hello");
	 import { get } from 'svelte/store';
	export const preload = async function( page, session) {

	}	
</script>

<script>
	export let email,password;
	import {onMount} from 'svelte';

	onMount(async ()=>{
		var token = localStorage.getItem("token");
		if(token && token!= 'null')
		{
			location.href="/dashboard";
		}
	});
export async function handleSubmit(){
	if(email && password)
	{
		// const res= await fetch('login.json',{method:'get'});
		const res = await fetch(loginPath+'/panel/authentication/login',{mode:'cors',method:'post',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
		if(res.status==200)
		{
			var response = await res.text();
			let data = await JSON.parse(response);
			if(data.status=="success")
			{
				let user = data.user;
				let token =user.token;
				console.log(token);
				localStorage.setItem("token",token);
				location.href = "/admission";

			}
			else
			{
				console.log(data.message);
				alert(data.message);

			}
			
		}
		else{
			alert("Login Failed");
			console.log(res.text());
		}
		
	}
}
</script>

<style>
	h1, figure, p {
		text-align: left;
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
		margin: 0em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	input{
		width:50%;
	}

	.main{
		background: white;
		padding:20;

	}
	
</style>

<svelte:head>
	<title>Gravity Admin Panel</title>
</svelte:head>
<div class="main">
	<h2>Gravity</h2>
<h4>Admin panel Authentication</h4>
<p>Login</p>

<form on:submit|preventDefault={handleSubmit} >

	<input class="w3-input w3-round w3-border w3-card" type="text" bind:value={email} name="email" placeholder="email" />
	<input class="w3-input w3-round w3-border w3-card" type="password" bind:value={password} name="password" placeholder="password" />

	<input class="w3-button w3-round w3-border w3-card" type="submit" value="Login" >

</form>
</div>

<!-- <a href="/register">Register new user</a> -->

<!-- <p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.{username} {password}</strong></p> -->
<!-- <p>saasdad</p> -->


<p>created by: <a href="https://neoned71.com">neoned71</a></p>	
