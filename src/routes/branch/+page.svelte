<script>
	import BranchesList from "../../lib/components/lists/branches.svelte";
	import { onMount } from "svelte";
	import { Token } from "../_utils/dynamic_store.js";
	import { ApiUrl } from "../_utils/static_store.js";
	import { get } from "svelte/store";
	// import { roomId } from '../room/[slug].svelte';
	// export var roomId;

	var branches = null;
	var loginPath = get(ApiUrl);

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		//  urlParams.has('class_number');

		let classQuery = "";

		if (urlParams.has("class_number")) {
			let classNumber = urlParams.get("class_number");
			classQuery = "?class_number=" + classNumber;
		}

		// localStorage.setItem("token","some value");

		var token = localStorage.getItem("token");
		if (!token) {
			console.log("yes");
			location.href = "/login";
		}
		Token.set(token);

		// console.log(loginPath+'/auth/whoami');
		const res = await fetch(loginPath + "/panel/branches" + classQuery, {
			mode: "cors",
			method: "get",
			headers: { Authorization: "Bearer " + token },
		});
		if (res.status == 200) {
			try {
				let response = await res.text();
				// console.log(response);
				response = await JSON.parse(response);
				branches = response.data;
				console.log(branches);
				console.log("branches are loaded");
			} catch (e) {
				console.log("caught");
				console.log(e);
			}
		} else {
			console.log(await res.text());
			user.email = "no logged";
		}
		//
	});
</script>

<h3>Branches</h3>
<a href="/branch/create/">
	<button class="w3-button w3-border w3-round"
		>Add new <i class="w3-text-grey fas fa-plus" /></button
	>
</a>

<hr />
<div class="w3-round">
	{#if branches}
		<!-- <p>sad</p> -->
		<BranchesList {branches} />
	{:else}
		<p>No Branch Present</p>
	{/if}
</div>

<style>
	h1,
	figure,
	p {
		text-align: center;
		margin: 0;
	}

	h1 {
		/* font-size: 2.8em; */
		text-transform: uppercase;
		font-weight: 700;
		margin: 5px;
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

	.item {
		padding: 10px;
		display: block;
		width: 100%;
		text-decoration: none;
		margin: 1px;
		background-color: rgb(255, 255, 255);
	}
	.item:hover {
		/* background-color: rgb(191, 201, 255); */
		cursor: pointer;
	}
	p {
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
	a {
		text-decoration: none;
	}

	img {
		width: 100px;
	}

	h2,
	h3 {
		font-size: 300%;
	}
</style>
