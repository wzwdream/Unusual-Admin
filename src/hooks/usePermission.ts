import { useUserStore } from '@/store/user'

export const usePermission = () => {
  const userStore = useUserStore()
  const roles = userStore.roles

  /**
   * 检查当前角色是否拥有指定的权限。
   *
   * @param permission 可以是单个权限字符串或多个权限字符串的数组。
   * @returns 如果当前角色拥有指定权限，返回true；否则返回false。
   */
  const hasPermission = (permission: string | string[]) => {
    // 如果没有指定权限，则直接返回
    if (!permission) return false

    // 如果权限是一个字符串数组，检查角色是否包含其中任意一个权限
    if (Array.isArray(permission)) return roles.some(value => permission.includes(value))

    // 如果权限是一个字符串，检查角色是否直接包含此权限
    return roles.includes(permission)
  }

  return {
    hasPermission
  }
}
