<script lang="ts">
  import {
    Button,
    Heading,
    Input,
    Select,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Toolbar,
    type LinkType
  } from 'flowbite-svelte';
  import { EditOutline, TrashBinSolid } from 'flowbite-svelte-icons';
  import { Pagination, PaginationItem } from 'flowbite-svelte';
  let selectedOption = 'code'; // 기본값 설정

  let pages: LinkType[] = [
    { name: '1', href: '', active: false },
    { name: '2', href: '', active: false }
  ];

  $: {
    pages.forEach((page) => {
      let splitUrl = page.href!.split('?');
      let queryString = splitUrl.slice(1).join('?');
      const hrefParams = new URLSearchParams(queryString);
    });
    pages = pages;
  }

  const previous = () => {
    alert('Previous btn clicked. Make a call to your server to fetch data.');
  };
  const next = () => {
    alert('Next btn clicked. Make a call to your server to fetch data.');
  };
</script>

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
  <div class="pt-4 px-4">
    <Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">게시판 관리</Heading>
  </div>
  <div class="px-4 mb-4">
    <Toolbar embedded class="w-full py-4 text-gray-500  dark:text-gray-400">
      <Select bind:value={selectedOption} class="me-4 w-40">
        <option value="code">코드</option>
        <option value="name">게시판 이름</option>
      </Select>
      <Input placeholder="" class="me-4 w-60 border xl:w-72" />
      <Button class="w-18" color="alternative">검색</Button>
    </Toolbar>
    <Table class="border border-gray-200 dark:border-gray-700">
      <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
        {#each ['코드', '바로가기', '게시판 이름', '기능'] as title}
          <TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
        {/each}
      </TableHead>
      <TableBody>
        <TableBodyRow class="text-base">
          <TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">ㅇㅇㅇㅇ</TableBodyCell>
          <TableBodyCell class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs">
            aaaa
          </TableBodyCell>
          <TableBodyCell class="p-4">aaas</TableBodyCell>
          <TableBodyCell class="space-x-2 p-4">
            <Button size="sm" class="gap-2 px-3">
              <EditOutline size="sm" /> Edit user
            </Button>
            <Button color="red" size="sm" class="gap-2 px-3">
              <TrashBinSolid size="sm" /> Delete user
            </Button>
          </TableBodyCell>
        </TableBodyRow>
        <TableBodyRow class="text-base">
          <TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">ㅇㅇㅇㅇ</TableBodyCell>
          <TableBodyCell class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs">
            aaaa
          </TableBodyCell>
          <TableBodyCell class="p-4">aaas</TableBodyCell>
          <TableBodyCell class="space-x-2 p-4">
            <Button size="sm" class="gap-2 px-3">
              <EditOutline size="sm" /> Edit user
            </Button>
            <Button color="red" size="sm" class="gap-2 px-3">
              <TrashBinSolid size="sm" /> Delete user
            </Button>
          </TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
    <div class="flex justify-center mt-4">
      <Pagination {pages} large on:previous={previous} on:next={next} />
    </div>
  </div>
</main>
