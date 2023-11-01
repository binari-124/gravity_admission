

<script>
	import ImageUpload from '../_utils/imageUpload.svelte';
	import DataUpload from '../_utils/dataUpload.svelte';
	import PickUpQuestions from '../_utils/_questions/question_picker.svelte';
	import {onMount} from 'svelte';
	import QuestionsList from '../../lib/components/lists/questions.svelte';
	import {Token} from '../_utils/dynamic_store.js';
	import {ApiUrl} from '../_utils/static_store.js';
	import { get } from 'svelte/store';
	// import File_Upload from '../../lib/components/file_uploader.svelte'; 
// import { roomId } from '../room/[slug].svelte';
	// export var roomId;

	var questions = null;
	let skip=0,limit=50;
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
		// getQuestions();
		// console.log(loginPath+'/auth/whoami');
		

				
		// 
	});
    
    let file_data;

	 async function getQuestions(){
	 	var token = localStorage.getItem("token");
	 	const res = await fetch(loginPath+'/panel/questions?limit='+limit+'&skip='+skip,{mode:'cors',method:'get',headers:{'Authorization':'Bearer '+token}});
		if(res.status==200){
			try{
					let response= await res.text();
					console.log(response);
					response= await JSON.parse(response);
					questions = response.data;
					console.log("Theese are questions");
					console.log(questions);
					console.log("Theese are questions");
					
					
					
			}
			catch(e){
				console.log("caught");
				
				console.log(e);
			}
			finally{
				
			}
			
			// let data = JSON.parse(text);
			
		}
		else{
					console.log(await res.text());
					user.email="no logged";
					
				}
	 }


	function changeTypeSet(){
		
		console.log("changin type set for mathjax");
		setTimeout(() => {
			window.MathJax.typeset();
			console.log("changed type set for mathjax");
		}, 0);
		return "";
	}


	function next(){
		skip+=limit;
		getQuestions();

	}

	function previous(){
		skip-=limit;
		if(skip<0)
				skip=0;
		getQuestions();

	}

	
  let wordDocument;

  async function uploadWordDocument() {
    if (wordDocument) {
      // You can handle the uploaded Word document here
      // You can make a fetch request to send the file to the server for processing, for example.
      const formData = new FormData();
      formData.append('wordDocument', wordDocument);

      try {
        const response = await fetch('/api/upload-word-document', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // The document was successfully uploaded and processed
        } else {
          // Handle the case where the upload or processing failed
        }
      } catch (error) {
        // Handle network or other errors
      }
    }
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
	grid-template-columns:1fr 1fr 1fr;
	grid-gap: 10px;
	background-color: rgb(255, 255, 255);
	/* padding: 10px; */
	}

	.grid-container > a {
	/* background-color: rgba(255, 255, 255, 0.8); */
	/* border: 1px solid black; */
	text-align: center;
	height:100px;
	overflow: scroll;
	/* font-size: 30px; */
	}
	a{
		text-decoration: none;
		/* overflow: scroll; */
	}
	h3{
		font-size:300%;
	}
	
</style>
<form on:submit|preventDefault={saveQuestion}>



	<input
			class="w3-button w3-round w3-border bg-gray-300 w-48 my-10"
			type="submit"
			value="Done"
		/>
</form>

<input type="file" accept=".doc, .docx" bind:files={wordDocument} />

<button on:click={uploadWordDocument}>Upload and Process</button>

<!-- <h4>Upload a Word Document</h4>
<label for="">Choose a file</label>
<input type="file" bind:files={file_data}> -->

<!-- <button on:click={}>Read</button> -->

<!-- <svelte:head>
	<title>Gravity</title>
</svelte:head>

<h3>Questions!</h3>


<h4>Create a new Question</h4>
<div class="container " style="--template-color:red">
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/scq">Single Choice Question</a>
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/mcq">Multiple Choice Question</a>
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/int">Integer Question</a>
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/comprehension">Comprehension Question</a>
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/matrix">Matrix Question</a>
		
		<a class="w3-button w3-round w3-card w3-hover-green w3-margin" href="/questions/create/fib">Fill in the blanks</a>
</div>


<hr>
<div class=" w3-round w3-padding w3-margin">
	<PickUpQuestions picker={false} />
</div> -->