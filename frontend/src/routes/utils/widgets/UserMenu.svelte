<svelte:options runes={true} />

<script lang="ts">
  import { imagesPath } from '../../utils/variables';
  import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-svelte';

  let {
    name = '', // "Neil Sims",
    avatar = '', // "neil-sims.png",
    email = '' // "neil.sims@flowbite.com",
  } = $props();
</script>

<button class="ms-3 rounded-full ring-gray-400 focus:ring-4 dark:ring-gray-600">
  <Avatar size="sm" src={imagesPath(avatar, 'users')} tabindex={0} />
</button>
<Dropdown placement="bottom-end">
  <DropdownHeader>
    <span class="block text-sm">{name}</span>
    <span class="block truncate text-sm font-medium">{email}</span>
  </DropdownHeader>
  <DropdownDivider />
  <DropdownItem>Sign out</DropdownItem>
</Dropdown>
