<script lang="ts">
  import {
    Button,
    Input,
    Pagination,
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
  let selectedOption = 'name'; // 기본값 설정

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

<div>
  <Toolbar embedded class="w-full pb-4 text-gray-500 dark:text-gray-400">
    <Select bind:value={selectedOption} class="me-4 w-40">
      <option value="name">이름</option>
      <option value="code">코드</option>
    </Select>
    <Input placeholder="" class="me-4 w-60 border xl:w-72" />
    <Button class="w-18" color="alternative">검색</Button>
    <Button class="w-18 ml-5" color="light">만들기</Button>
  </Toolbar>
  <Table class="border border-gray-200 dark:border-gray-700">
    <TableHead class="text-base">
      <TableHeadCell class="table-cell w-48">코드</TableHeadCell>
      <TableHeadCell class="table-cell">바로가기</TableHeadCell>
      <TableHeadCell class="table-cell">게시판 이름</TableHeadCell>
      <TableHeadCell class="table-cell w-64">기능</TableHeadCell>
    </TableHead>
    <TableBody>
      <TableBodyRow class="table-row">
        <TableBodyCell class="table-cell">11111</TableBodyCell>
        <TableBodyCell class="table-cell">aaaa</TableBodyCell>
        <TableBodyCell class="table-cell">aaas</TableBodyCell>
        <TableBodyCell class="table-cell">
          <Button size="xs" class="gap-1">
            <EditOutline size="xs" /> Edit user
          </Button>
          <Button color="red" size="xs" class="gap-1">
            <TrashBinSolid size="xs" /> Delete user
          </Button>
        </TableBodyCell>
      </TableBodyRow>
      <TableBodyRow class="table-row">
        <TableBodyCell class="table-cell"></TableBodyCell>
        <TableBodyCell class="table-cell">aaaa</TableBodyCell>
        <TableBodyCell class="table-cell">aaas</TableBodyCell>
        <TableBodyCell class="table-cell">
          <Button size="xs" class="gap-1">
            <EditOutline size="xs" /> Edit user
          </Button>
          <Button color="red" size="xs" class="gap-1">
            <TrashBinSolid size="xs" /> Delete user
          </Button>
        </TableBodyCell>
      </TableBodyRow>
    </TableBody>
  </Table>
  <div class="flex justify-center mt-4">
    <Pagination {pages} large on:previous={previous} on:next={next} />
  </div>
</div>

<style>
  :global(.table-cell) {
    @apply p-4 whitespace-normal break-all;
  }

  :global(.table-row) {
    @apply text-base;
  }
</style>
