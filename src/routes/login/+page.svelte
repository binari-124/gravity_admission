<script context="module">
	// var user={};
	import { ApiUrl } from "../_utils/static_store.js";
	var loginPath = get(ApiUrl);
	import { Token } from "../_utils/dynamic_store.js";
	console.log("hello");
	import { get } from "svelte/store";
	export const preload = async function (page, session) {};
</script>

<script>
	export let email, password;
	import { onMount } from "svelte";

	onMount(async () => {
		var token = localStorage.getItem("token");
		if (token && token != "null") {
			location.href = "/dashboard";
		}
	});
	export async function handleSubmit() {
		if (email && password) {
			// const res= await fetch('login.json',{method:'get'});
			const res = await fetch(loginPath + "/panel/authentication/login", {
				mode: "cors",
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (res.status == 200) {
				var response = await res.text();
				let data = await JSON.parse(response);
				if (data.status == "success") {
					let user = data.user;
					let token = user.token;
					console.log(token);
					localStorage.setItem("token", token);
					location.href = "/admission";
				} else {
					console.log(data.message);
					alert(data.message);
				}
			} else {
				alert("Login Failed");
				console.log(res.text());
			}
		}
	}
</script>

<svelte:head>
	<title>Gravity Admin Panel</title>
</svelte:head>
<div class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
	<main
		class="bg-gray-50 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl"
	>
		<section>
			<h3 class="font-bold text-2xl">Welcome to Gravity</h3>
			<p class="text-gray-600 pt-2">Sign in to your account.</p>
		</section>

		<section class="mt-10">
			<form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
				<div class="mb-6 pt-3 rounded bg-gray-200">
					<label
						class="block text-gray-700 text-sm font-bold mb-2 ml-3"
						for="email">Email</label
					>
					<input
						type="text"
						id="email"
						class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
						name="email"
						bind:value={email}
					/>
				</div>

				<div class="mb-6 pt-3 rounded bg-gray-200">
					<label
						class="block text-gray-700 text-sm font-bold mb-2 ml-3"
						for="password">Password</label
					>
					<input
						type="password"
						id="password"
						class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
						name="password"
						bind:value={password}
					/>
				</div>

				<!-- <input
					class="w3-button w3-round w3-border w3-card"
					type="submit"
					value="Login"
				/> -->

				<div class="flex justify-end">
					<a
						href="#"
						class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6"
						>Forgot your password?</a
					>
				</div>
				<button
					class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
					type="submit">Sign In</button
				>
			</form>
		</section>
	</main>
</div>

<!-- <a href="/register">Register new user</a> -->

<!-- <p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.{username} {password}</strong></p> -->
<!-- <p>saasdad</p> -->

<p>created by: <a href="https://neoned71.com">neoned71</a></p>

<style>
	h1,
	figure,
	p {
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

	input {
		width: 50%;
	}

	.main {
		background: white;
		padding: 20;
	}

	.body-bg {
		background-color: #9921e8;
		background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
	}
</style>
