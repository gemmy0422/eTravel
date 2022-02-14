<template>
	<div>
		<historyHeader></historyHeader>
		<historyContent></historyContent>
	</div>
</template>

<script>
import historyHeader from "../components/history/history_header";
import historyContent from "../components/history/history_content";

export default {
	components: {
		historyHeader,
		historyContent
	}
};
</script>