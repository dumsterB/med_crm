<template>
  <div>Login</div>
</template>

<script>
import { getParentFolderNameByMetaUrl } from '@/utils/vite.util.js';

export default {
  name: getParentFolderNameByMetaUrl(import.meta.url),
};
</script>
