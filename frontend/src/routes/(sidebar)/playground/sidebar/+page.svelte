<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, Heading } from 'flowbite-svelte';
	import { Card } from 'flowbite-svelte';
	import MetaTag from '../../../utils/MetaTag.svelte';
	import Footer from '../../Footer.svelte';

	const path: string = '/playground/sidebar';
	const description: string = 'Playground Sidebar example - Flowbite Svelte Admin Dashboard';
	const metaTitle: string = 'Flowbite Svelte Admin Dashboard - Playground Sidebar';
	const subtitle: string = 'Playground Sidebar';
</script>

<MetaTag {path} {description} title={metaTitle} {subtitle} />

<div
	id="main-content"
	class="relative mx-auto h-full w-full overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900"
>
	<main>
		<div class="grid grid-cols-1 pt-2 xl:grid-cols-3 xl:gap-4 xl:px-0 dark:bg-gray-900">
			<div class="col-span-full mb-4 xl:mb-2">
				<Breadcrumb class="mb-5">
					<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
					<BreadcrumbItem href="/">Pages</BreadcrumbItem>
					<BreadcrumbItem>Playground</BreadcrumbItem>
				</Breadcrumb>
				<Heading tag="h1" class="text-xl font-semibold sm:text-2xl">
					Create something awesome here 1111111111111
				</Heading>
			</div>
		</div>
		<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
			<Card size="xl" class="h-60 w-full space-y-6 sm:p-6">
				<div class="rounded">
					<h3>Card 222222222222222222</h3>
				</div>
			</Card>
		</div>
	</main>
</div>
<Footer />
