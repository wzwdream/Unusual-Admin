import { usePermission } from '@/hooks/usePermission';
import { DirectiveBinding } from 'vue';


/**
 * 根据用户权限控制元素的显示与隐藏。
 * @param el - 需要进行权限控制的元素。
 * @param binding - 绑定到元素上的指令对象，包含权限检查所需的信息。
 */
const permission = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 使用usePermission钩子获取权限检查功能
    const { hasPermission } = usePermission();
    console.log(binding.value);
    // 如果当前用户没有权限，则尝试移除元素或将其隐藏
    if (!hasPermission(binding.value)) {
      try {
        // 尝试将元素从其父节点中移除
        el.parentNode && el.parentNode.removeChild(el);
      } catch (error) {
        // 如果移除操作失败，则将元素样式设置为隐藏
        el.style.display = 'none';
      }
    }
  },
};

export default permission