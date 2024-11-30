<script>
	let message = '';
	let response = '';

	async function fetchMessage() {
		try {
			const res = await fetch(`http://localhost:8080/hello/echo?message=${message}`);
			response = await res.text();
		} catch (error) {
			console.error('에러 발생:', error);
			response = '에러가 발생했습니다.';
		}
	}
</script>

<h1>Welcome to SvelteKit</h1>

<div>
	<input type="text" bind:value={message} placeholder="메시지를 입력하세요" />
	<button on:click={fetchMessage}>전송</button>
</div>

{#if response}
	<p>서버 응답: {response}</p>
{/if}

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<style>
	div {
		margin: 20px 0;
	}
	input {
		margin-right: 10px;
		padding: 5px;
	}
	button {
		padding: 5px 10px;
	}
</style>
