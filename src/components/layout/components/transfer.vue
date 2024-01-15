<!--
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2023-12-26 10:56:27
 * @LastEditors: lc
 * @LastEditTime: 2023-12-28 10:49:15
-->
<script>
import { useRouter } from "vue-router";
import { h } from "vue";
export default {
  setup() {
    const router = useRouter();
    let { params, query } = router.currentRoute.value;
    let { path } = params;
    if (params.afterUser) {
      path += "/" + params.afterUser;
    }
    router.replace({
      path: "/" + path,
      query,
    });
    const renderComponent = () => h("div", {});
    return { renderComponent };
  },
};
</script>