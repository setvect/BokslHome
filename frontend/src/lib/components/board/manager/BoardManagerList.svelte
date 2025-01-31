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
    alert('이전');
  };
  const next = () => {
    alert('다음');
  };
  const handleSearch = () => {
    alert('검색');
  };
</script>

<div>
  <Toolbar embedded class="w-full pb-4 text-gray-500 dark:text-gray-400">
    <Select bind:value={selectedOption} class="me-4 w-40">
      <option value="name">이름</option>
      <option value="code">코드</option>
    </Select>
    <Input placeholder="" class="me-4 w-60 border xl:w-72" />
    <Button on:click={handleSearch} class="w-18" color="alternative">검색</Button>
    <Button href="./manager/write" class="w-18 ml-5" color="light">만들기</Button>
  </Toolbar>
  <Table class="border border-gray-200 dark:border-gray-700">
    <TableHead class="text-base">
      <TableHeadCell class="w-48">코드</TableHeadCell>
      <TableHeadCell>바로가기</TableHeadCell>
      <TableHeadCell>게시판 이름</TableHeadCell>
      <TableHeadCell class="w-64">기능</TableHeadCell>
    </TableHead>
    <TableBody>
      <TableBodyRow class="text-base">
        <TableBodyCell class="p-4 whitespace-normal break-all w-48">abcde</TableBodyCell>
        <TableBodyCell class="p-4 whitespace-normal break-all"><a href="./manager/read">a11aaa</a></TableBodyCell>
        <TableBodyCell class="p-4 whitespace-normal break-all">aaas</TableBodyCell>
        <TableBodyCell class="p-4 whitespace-normal break-all">
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
