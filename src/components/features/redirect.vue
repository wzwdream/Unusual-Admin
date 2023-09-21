<script setup lang="ts" name="Redirect">
const route = useRoute()
const router = useRouter()
const { params, query } = route
const { path } = params
router.replace({ path: '/' + path, query })
</script>