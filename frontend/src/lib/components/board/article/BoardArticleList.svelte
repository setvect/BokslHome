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
  let selectedOption = 'title'; // 기본값 설정

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
  const editArticle = () => {
    alert('Edit article');
  };

  const deleteArticle = () => {
    alert('Delete article');
  };
</script>

<div>
  <Toolbar embedded class="w-full pb-4 text-gray-500 dark:text-gray-400">
    <Select bind:value={selectedOption} class="me-4 w-32">
      <option value="title">제목</option>
      <option value="content">내용</option>
    </Select>
    <Input placeholder="" class="me-4 w-52 border" />
    <Button on:click={handleSearch} class="w-18" color="alternative">검색</Button>
    <Button href="./article/write" class="w-18 ml-5" color="light">만들기</Button>
  </Toolbar>
  <Table class="border border-gray-200 dark:border-gray-700">
    <TableHead class="text-base">
      <TableHeadCell class="w-48 responsive-hide">#</TableHeadCell>
      <TableHeadCell>제목</TableHeadCell>
      <TableHeadCell class="w-48">날짜</TableHeadCell>
      <TableHeadCell class="w-48 responsive-hide">기능</TableHeadCell>
    </TableHead>
    <TableBody>
      <TableBodyRow class="text-base">
        <TableBodyCell class="p-4 whitespace-normal break-all responsive-hide">100</TableBodyCell>
        <TableBodyCell class="p-4 whitespace-normal break-all"><a href="./manager/read">ㅋㅋㅋㅋ</a></TableBodyCell>
        <TableBodyCell class="p-4 whitespace-normal break-all">2024.10.05</TableBodyCell>
        <TableBodyCell class="p-4 whitespace-normal break-all responsive-hide">
          <button on:click={editArticle} class="text-blue-300 hover:underline">수정</button> |
          <button on:click={deleteArticle} class="text-red-300 hover:underline">삭제</button>
        </TableBodyCell>
      </TableBodyRow>
    </TableBody>
  </Table>
  <div class="flex justify-center mt-4">
    <Pagination {pages} large on:previous={previous} on:next={next} />
  </div>
</div>

<style>
  @media (max-width: 800px) {
    :global(.responsive-hide) {
      display: none;
    }
  }
</style>
