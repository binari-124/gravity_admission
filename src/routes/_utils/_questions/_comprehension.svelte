<script>
	import { onMount } from "svelte";
	import { Token } from "../dynamic_store.js";
	import { ApiUrl } from "../static_store.js";
	import { get } from "svelte/store";
	import ImageUpload from "../imageUpload.svelte";

	import cloneDeep from "lodash.clonedeep";
	// import _ from 'lodash';

	import { bind, prevent_default } from "svelte/internal";

	// export var question;
	var loginPath = get(ApiUrl);
	var chapters = null;
	var topics = null;
	var subtopics = null;
	var subjects = [];
	var streams = [];
	var exams = [];
	var comprehensionContent = "";
	export var bodyJson;
	export var body = {};
	export var edit = false;
	// let edit = false;

	function initializeTinyMice() {
		tinymce.init({
			selector: "textarea", // change this value according to your HTML
			plugins: "advlist link image lists table",
			table_appearcance_options: false,
			content_css:
				"/home/vikas/gits/gravity_admission/src/routes/_utils/content.css",
		});
	}

	onMount(async () => {
		setTimeout(() => {
			initializeTinyMice();
		}, 2000);
		//  console.log(bodyJson);
		//  console.log(body);
		console.log(edit);
		var token = localStorage.getItem("token");
		if (!token) {
			console.log("yes");
			location.href = "/login";
		}
		Token.set(token);

		if (edit) {
			console.log("editing mode for a question");
			console.log(body.question);

			// getChapters(body.subject,false);
			await getStreams();
			await getSubjects();
			await getChapters(body.subject);
			await getTopics(body.chapter);
			// getTopics(body.chapter, false);
			getsubTopics(body.topic, false);

			body.question = atob(body.question);
			if (body.comprehension) {
				comprehensionContent = body.comprehension.content;
				body.comprehension = body.comprehension._id;
			}
			body.solution = atob(body.solution);

			for (var i = 0; i < body.options.length; i++) {
				body.options[i].option_value = atob(
					body.options[i].option_value
				);
			}

			return;
		}

		body.for_advanced = false;
		body.subject = "-";

		body.chapter = "-";
		body.topic = "-";
		body.subtopic = "-";
		console.log("creation mode for a question");
		//  body.class_number="13";
		body.stream = "-";
		body.subjects = [];
		body.streams = [];
		body.exam = null;

		await getStreams();
		// await getChapters(null, false);
		await getSubjects();
		await getExams();

		body.options = [];
		body.options.push({ option_type: "text", option_value: "" });
		body.options.push({ option_type: "text", option_value: "" });
		body.options.push({ option_type: "text", option_value: "" });
		body.options.push({ option_type: "text", option_value: "" });

		console.log("mounted");
	});

	async function saveQuestion() {
		let data = cloneDeep(body);
		data.question_type = "comprehension";
		data.question_subtype = "simple";
		data.question = btoa(tinymce.get("question").getContent());
		data.solution = btoa(tinymce.get("solution").getContent());
		for (var i = 0; i < data.options.length; i++) {
			data.options[i].option_value = btoa(
				tinymce.get("option" + i).getContent()
			);
		}

		//checks for the question value!
		var keys = Object.keys(data);

		for (var key of keys) {
			if (data[key] == "-") {
				console.log("deleting: " + key);
				delete data[key];
			}
		}

		//checks end
		console.log(data);

		let token = localStorage.getItem("token");
		var res;
		if (edit) {
			res = await fetch(loginPath + "/panel/question_edit/", {
				mode: "cors",
				method: "post",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
		} else {
			res = await fetch(loginPath + "/panel/question_create/", {
				mode: "cors",
				method: "post",
				headers: {
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
		}

		if (res.status == 200) {
			try {
				let response = await res.text();
				//console.log(response);
				response = await JSON.parse(response);
				if (response.status == "success") {
					alert("saved successfully");
					location.reload();
					// location.href="/questions";
				} else {
					// console.log(response.message);
					alert(response.message);
				}
			} catch (e) {
				console.log("caught");
				alert("Some problem has occured, see console for more info.");
				console.log(e);
			} finally {
			}
		} else {
			console.log(await res.text());
		}
	}

	// async function getChapters(subject, writeBody = true) {
	// 	// if(!subject || subject=="")
	// 	// {
	// 	// 	console.log("no subject chosen");
	// 	// 	return ;
	// 	// }
	// 	if (writeBody) {
	// 		chapters = null;
	// 		topics = null;
	// 		subtopics = null;
	// 		body.topic = "-";

	// 		body.subtopic = "-";
	// 		body.chapter = "-";
	// 	}

	// 	var token = localStorage.getItem("token");
	// 	var res;

	// 	if (subject)
	// 		res = await fetch(
	// 			loginPath + "/panel/chapters/?subject=" + subject,
	// 			{
	// 				mode: "cors",
	// 				method: "get",
	// 				headers: { Authorization: "Bearer " + token },
	// 			}
	// 		);
	// 	else
	// 		res = await fetch(loginPath + "/panel/chapters", {
	// 			mode: "cors",
	// 			method: "get",
	// 			headers: { Authorization: "Bearer " + token },
	// 		});
	// 	if (res.status == 200) {
	// 		try {
	// 			let response = await res.text();
	// 			response = await JSON.parse(response);
	// 			chapters = response.data;
	// 		} catch (e) {
	// 			console.log("caught");

	// 			console.log(e);
	// 		}
	// 	} else {
	// 		console.log(await res.text());
	// 		//user.email="no logged";
	// 	}
	// }

	// async function getTopics(chapterId, writeBody = true) {
	// 	if (!chapterId || chapterId == "") {
	// 		console.log("no chapters chosen");
	// 		return;
	// 	}
	// 	if (writeBody) {
	// 		topics = null;
	// 		subtopics = null;
	// 		body.topic = "-";
	// 		body.subtopic = "-";
	// 	}

	// 	var token = localStorage.getItem("token");
	// 	const res = await fetch(loginPath + "/panel/topics/" + chapterId, {
	// 		mode: "cors",
	// 		method: "get",
	// 		headers: { Authorization: "Bearer " + token },
	// 	});
	// 	if (res.status == 200) {
	// 		try {
	// 			let response = await res.text();
	// 			// console.log(response);
	// 			response = await JSON.parse(response);
	// 			topics = response.data;
	// 		} catch (e) {
	// 			console.log("caught");

	// 			console.log(e);
	// 		} finally {
	// 		}

	// 		// let data = JSON.parse(text);
	// 	} else {
	// 		console.log(await res.text());
	// 		//user.email="no logged";
	// 	}
	// }

	async function getsubTopics(topicId, writeBody = true) {
		if (!topicId || topicId == "") {
			console.log("no topic chosen");
			return;
		}

		if (writeBody) {
			subtopics = null;
			body.subtopic = "-";
		}
		var token = localStorage.getItem("token");
		const res = await fetch(loginPath + "/panel/subtopics/" + topicId, {
			mode: "cors",
			method: "get",
			headers: { Authorization: "Bearer " + token },
		});
		if (res.status == 200) {
			try {
				let response = await res.text();
				// console.log(response);
				response = await JSON.parse(response);
				subtopics = response.data;
			} catch (e) {
				console.log("caught");

				console.log(e);
			} finally {
			}

			// let data = JSON.parse(text);
		} else {
			console.log(await res.text());
			//user.email="no logged";
		}
	}

	function toggleAdvanced() {
		// console.log("switching");
		body.for_advanced = !body.for_advanced;
		// console.log(body.for_advanced);
	}

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
			user.email = "no logged";
		}
	}

	async function getSubjects() {
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath = get(ApiUrl);
		let res;
		res = await fetch(loginPath + "/panel/subjects", {
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
					subjects = response.data;
					console.log(subjects);
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
			user.email = "no logged";
		}
	}

	async function getChapters(subject_id) {
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath = get(ApiUrl);
		let res;
		res = await fetch(loginPath + "/panel/chapters/" + subject_id, {
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
					chapters = response.data;
					console.log("This is topics data");
					console.log(topics);
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
			user.email = "no logged";
		}
	}

	async function getTopics(chapter_id) {
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath = get(ApiUrl);
		let res;
		res = await fetch(loginPath + "/panel/topics/" + chapter_id, {
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
					topics = response.data;
					console.log(subjects);
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
			user.email = "no logged";
		}
	}

	async function getExams() {
		// console.log(body);
		var token = localStorage.getItem("token");
		var loginPath = get(ApiUrl);
		let res;
		res = await fetch(loginPath + "/panel/exams", {
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
					console.log("exams acquired");
					exams = response.data;
					// console.log(exams);
					console.log(exams);
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
			// user.email="no logged";
		}
	}

	async function handleDelete() {
		let confirmm = confirm("Really want to delete permanently?");
		if (!confirmm) {
			return;
		}
		var token = localStorage.getItem("token");
		var loginPath = get(ApiUrl);
		let res;
		res = await fetch(loginPath + "/panel/question_delete/" + body._id, {
			mode: "cors",
			method: "post",
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
					location.href = "/questions";
				} else {
					console.log(response.message);
					alert(response.message);
				}
			} catch (e) {
				console.log("caught");

				console.log(e);
			}
		} else {
			console.log(await res.text());
		}
	}

	function clearExam() {
		console.log("clearing");
		if (body) {
			body.exam = null;
		}
	}

	console.log("this is body");
	console.log(body);
	console.log(body.options);
	console.log("this is body");
</script>

<h3 class="w3-black w3-round w3-padding width">
	{edit ? "Edit a" : "Create a"}
	<span class="w3-text-grey"> Comprehension Question</span>
</h3>
<div class="w-full float-left">
	<div
		class="shadow-2xl border-[1px] p-2 rounded-md mx-1 my-2 w-48 bg-gray-200 border-gray-300"
	>
		<span>For Advanced?</span>
		<!-- <label>For Advanced?</label> -->
		<input
			type="radio"
			checked={body.for_advanced}
			on:click={toggleAdvanced}
		/>
	</div>
</div>
<div class="width">
	{#if edit}
		<button
			class="w3-red w3-text-white w3-padding w3-margin w3-center"
			on:click={handleDelete}>Delete?</button
		>
	{/if}
	<form on:submit|preventDefault={saveQuestion}>
		<section class=" shadow-2xl border-[1px] p-3 rounded-sm mx-1">
			<div class="mt-4">
				<div class="flex flex-row space-x-8">
					<div class="w-1/2">
						{#if streams}
							<p>Select Streams</p>
							<select
								class="w3-input w3-border w3-round mt-1"
								bind:value={body.stream}
							>
								<option value="-">Select Stream</option>
								{#each streams as stream}
									<!-- <label>{}</label> -->
									<option value={stream._id}
										>{stream.name.toUpperCase()}</option
									>
									<!-- <input class="w3-checkbox w3-input" type="checkbox"  bind:group={body.streams} /> -->
								{/each}
							</select>
						{/if}
					</div>
					<div class="w-1/2">
						{#if subjects}
							<p>Select Subjects</p>

							<select
								class="w3-input w3-border w3-round mt-1"
								bind:value={body.subject}
								on:change={getChapters(body.subject)}
							>
								<option value="-">Select Subject</option>
								{#each subjects as subject}
									<!-- <label>{}</label> -->
									<option value={subject._id}
										>{subject.name.toUpperCase()}</option
									>
									<!-- <input class="w3-checkbox w3-input" type="checkbox"  bind:group={body.streams} /> -->
								{/each}
							</select>
						{/if}
					</div>
				</div>

				<div class="flex flex-row space-x-8">
					{#if chapters && chapters.length > 0}
						<div class="w-1/2 mt-6">
							<label for="question_topic">Chapter</label>
							<select
								id="question_topic"
								class="w3-input w3-border w3-round"
								bind:value={body.chapter}
								on:change={getTopics(body.chapter)}
							>
								<option value="-">Chapter(*)</option>

								{#each chapters as chapter}
									<option value={chapter._id}
										>{chapter.name.toUpperCase()}</option
									>
								{/each}
							</select>
						</div>
					{/if}
					{#if topics && topics.length > 0}
						<div class="w-1/2 mt-6">
							<label for="question_topic">Topic</label>
							<select
								id="question_topic"
								class="w3-input w3-border w3-round"
								bind:value={body.topic}
							>
								<option value="-">Topic(*)</option>

								{#each topics as topic}
									<option value={topic._id}
										>{topic.name.toUpperCase()}</option
									>
								{/each}
							</select>
						</div>
					{/if}
				</div>

				<!-- {#if chapters && chapters.length > 0}
					<label for="question_topic">Chapter</label>
					<select
						id="question_topic"
						class="w3-input w3-border w3-round"
						bind:value={body.chapter}
						on:change={getTopics(body.chapter)}
					>
						<option value="-">Select Chapter</option>

						{#each chapters as chapter}
							<option class="" value={chapter._id}
								>{chapter.name}</option
							>
						{/each}
					</select>
					{#if topics && topics.length > 0}
						<label for="question_topic">Topic</label>
						<select
							id="question_topic"
							class="w3-input w3-border w3-round"
							bind:value={body.topic}
							on:change={getsubTopics(body.topic)}
						>
							<option value="-">Topic</option>

							{#each topics as topic}
								<option value={topic._id}>{topic.name}</option>
							{/each}
						</select>
						{#if subtopics && subtopics.length > 0}
							<label for="question_topic">SubTopic</label>
							<select
								id="question_topic"
								class="w3-input w3-border w3-round"
								bind:value={body.subtopic}
							>
								<option value="-">Subtopic</option>

								{#each subtopics as subtopic}
									<option value={subtopic._id}
										>{subtopic.name}</option
									>
								{/each}
							</select>
						{/if}
					{/if}
				{/if} -->
			</div>

			<div class="flex flex-row space-x-6 mt-6">
				<div class="w-1/2">
					<label for="question_difficulty">Question Type</label>
					<select
						id="question_difficulty"
						class="w3-input w3-border w3-round mt-1"
						bind:value={body.question_type}
					>
						<option value="-">Select Question Type</option>
						<option value="scq">Single Choice Question</option>
						<option value="mcq">Multiple Choice Question</option>
						<option value="integer">Integer</option>
						<option value="comprehension">Comprehension </option>
						<option value="matrix">Matrix</option>
						<option value="fill_in_blanks"
							>Fill in the blanks</option
						>
					</select>
				</div>
				<div class="w-1/2">
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
				</div>
			</div>

			<div class="flex flex-row space-x-6 mt-6">
				<div class="w-1/2">
					<label for="question_difficulty">Question SubType</label>
					<select
						id="question_difficulty"
						class="w3-input w3-border w3-round mt-1"
						bind:value={body.question_subtype}
					>
						<option value="-">Select Question Type</option>
						<option value="scq">Single Choice Question</option>
						<option value="mcq">Multiple Choice Question</option>
						<option value="integer">Integer</option>
						<option value="matrix">Matrix</option>
						<option value="fill_in_blanks"
							>Fill in the blanks</option
						>
					</select>
				</div>
				<div class="w-1/2">
					
				</div>
				
			</div>

			<!-- <div class="mt-4">
				<label for="question_difficulty"> Difficulty</label>
				<select
					id="question_difficulty"
					class="w3-input w3-border w3-round"
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

			<!-- <label for="question_difficulty"> Stream</label>
		<select id="question_difficulty" class="w3-input w3-border w3-round w3-margin" bind:value={body.stream}>
			<option  value="-">Stream(*)</option>
			<option  value="engineering">engineering</option>
			<option value="medical">Medical</option>
			<option value="school">School</option>

		</select> -->

			<!-- {#if streams && body.streams}
		<p>Select Streams</p><br>
            {#each streams as stream}
            <label>{stream.name.toUpperCase()}</label>
                <input class="w3-checkbox w3-input" type="checkbox" value={stream._id} bind:group={body.streams} />
            {/each}
		{/if}

		{#if subjects && body.subjects}
		<p>Select Subjects</p><br>
            {#each subjects as subject}
            <label>{subject.name.toUpperCase()}</label>
                <input class="w3-checkbox w3-input" type="checkbox" value={subject._id} bind:group={body.subjects} />
            {/each}
		{/if}  -->

			<!-- {#if streams && body.streams}
		<p>Select Streams</p><br>
		<select class="w3-input w3-border w3-round w3-margin" bind:value={body.stream}>
			<option value="-">Select Stream</option>
            {#each streams as stream}
				<option value={stream._id}>{stream.name.toUpperCase()}</option>
            {/each}

		</select>
		{/if} -->

			<!-- <div class="mt-4">
				{#if subjects}
					<label for="question_subject">Subject</label><br />
					<select
						id="question_subject"
						class="w3-input w3-border w3-round"
						bind:value={body.subject}
					>
						<option value="-">Select Subject</option>
						{#each subjects as subject}
							<option value={subject._id}
								>{subject.name.toUpperCase()}</option
							>
						{/each}
					</select>
				{/if}
			</div>

			<div class="mt-4">
				{#if exams}
					<label for="question_exam">Exams</label><br />
					<select
						id="question_exam"
						class="w3-input w3-border w3-round"
						bind:value={body.exams}
					>
						<option value="-">Select Exam</option>
						{#each exams as exam}
							<option value={exam._id}
								>{exam.name.toUpperCase()}</option
							>
						{/each}
					</select>

					
				{/if}
			</div> -->

			<input
				class="my-6 p-2 border-2 w-full "
				type="text"
				bind:value={body.media}
				placeholder="Media Link(Youtube)"
			/>
		</section>

		{#if edit == true}
			<section class=" shadow-2xl border-[1px] p-3 rounded-sm mt-10">
				<h4>Comprehension</h4>

				<br />
				<!-- <label for="question">Comprehension ID*</label> -->
				<!-- <textarea
				id="question"
				class="w3-input w3-round w3-border"
				placeholder="Comprehension Id"
				bind:value={body.comprehension}
			/> -->
				<!-- <input class="my-4 p-2 w3-border w-full " type="text" bind:value={body.comprehension} placeholder="Comprehension Id" /> -->
				<!-- <div class="my-4 p-2 w3-border w-full " type="text" bind:value={body.comprehension} placeholder="Comprehension Id" /> -->
				<p class="my-4 p-2 w3-border w-full">
					{@html atob(comprehensionContent)}
				</p>
				<br />
				<input
					class="my-4 p-2 w3-border w-full"
					type="text"
					bind:value={body.comprehension}
					placeholder="Comprehension Id"
				/>
			</section>
		{:else}
			<section class=" shadow-2xl border-[1px] p-3 rounded-sm mt-10">
				<h4>Comprehension</h4>

				<br />
				<!-- <label for="question">Comprehension ID*</label> -->
				<!-- <textarea
				id="question"
				class="w3-input w3-round w3-border"
				placeholder="Comprehension Id"
				bind:value={body.comprehension}
			/> -->
				<input
					class="my-4 p-2 w3-border w-full"
					type="text"
					bind:value={body.comprehension}
					placeholder="Comprehension Id"
				/>
			</section>
		{/if}

		<section class=" shadow-2xl border-[1px] p-3 rounded-sm mt-10">
			<h4>Question</h4>

			<br />
			<label for="question">Question Body*</label>
			<textarea
				id="question"
				class="w3-input w3-round w3-border"
				placeholder="Question Body"
				bind:value={body.question}
			/>
		</section>

		<!-- <label for="marks">Marks*</label>
		<input type="number" pattern="[0-9]{2}" placeholder="example: 4 or 3" maxlength="2" class="w3-input w3-round w3-border" id="marks" bind:value={body.positive_marks} required /> -->

		<!-- <label for="question_correct"> Class </label>
		<select id="question_correct" class="w3-input w3-border w3-round w3-margin" bind:value={body.class_number}>
			<option value="7">7th Class</option>
			<option  value="8">8th Class</option>
			<option value="9">9th Class</option>
			<option value="10">10th Class</option>
			<option  value="11">11th Class</option>
			<option value="12">12th Class</option>
			<option value="13">Passout</option>

		
		</select> -->

		<!-- <label for="question_subject"> Subject</label>
		<select id="question_subject" class="w3-input w3-border w3-round w3-margin" bind:value={body.subject} on:change={getChapters(body.subject)}>
			<option  value="-">Subject(*)</option>
			<option  value="physics">Physics</option>
			<option value="chemistry">Chemistry</option>
			<option value="mathematics">Mathematics</option>
			
			<option value="botany">Botany</option>
			<option value="zoology">Zoology</option>
		</select> -->

		{#if body.exam}
			<div class="w3-border w3-margin">
				<p>Select Exam Shift</p>
				<label>Morning</label>
				<input
					class="w3-radio w3-input w3-bar-item w3-button"
					type="radio"
					value="morning"
					bind:group={body.exam_shift}
				/>

				<label>Evening</label>
				<input
					class="w3-radio w3-input w3-bar-item w3-button"
					type="radio"
					value="evening"
					bind:group={body.exam_shift}
				/>

				<!-- <label>{exam.name.toUpperCase()}</label> -->
			</div>
		{/if}

		<hr />

		<section class=" shadow-2xl border-[1px] p-3 rounded-sm mt-10">
			{#if body.options}
				<h4>Options</h4>
				<br />
				{#each body.options as option, i}
					<p>Option {String.fromCharCode(i + 65)}</p>

					<textarea
						id="option{i}"
						class="w3-input w3-margin w3-round w3-border"
						placeholder=" Option {String.fromCharCode(i + 65)}"
						bind:value={option.option_value}
					/>

					<hr />
				{/each}
			{/if}
		</section>
		<hr />
		<section class=" shadow-2xl border-[1px] p-3 rounded-sm mt-8">
			<!-- <h4>Solutions</h4> -->
			<!-- <label for="question_correct"> Correct Answer</label> -->
			<h4>Correct Answer</h4>
			<select
				id="question_correct"
				class="w3-input w3-border w3-round w3-margin"
				bind:value={body.correct_answer}
			>
				<option value="A">Option A</option>
				<option value="B">Option B</option>
				<option value="C">Option C</option>
				<option value="D">Option D</option>
			</select>
		</section>
		<section class=" shadow-2xl border-[1px] p-3 rounded-sm mt-8">
			<!-- <label for="solution">Solution </label> -->
			<h4>Solutions</h4>
			<textarea
				id="solution"
				class="w3-input w3-round w3-border"
				placeholder="Solution"
				bind:value={body.solution}
			/>
		</section>
		<hr />
		<input
			class="w3-button w3-round w3-border bg-gray-300 w-48 my-10"
			type="submit"
			value="Done"
		/>
	</form>
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

	a {
		text-decoration: none;
	}
	textarea {
		width: 80%;
	}
	select {
		width: 100%;
	}

	.width {
		width: 100%;
		/* background: red; */
	}
	.label {
		font-size: 50%;
		color: grey;
	}

	input[type="radio"] {
		display: inline;
		width: 50px;
	}

	h2,
	h3,
	h4 {
		font-size: 250%;
	}

	.ztop {
		z-index: 10;
	}
</style>
