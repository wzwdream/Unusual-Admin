/** 存储一些常见的表单校验规则  */

import type { FormItemRule } from 'naive-ui'

// 手机号校验
export const checkPhone = (rule: FormItemRule, value: string): boolean => {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(value)
}

// 密码校验
export const checkPassword = (rule: FormItemRule, value: string): boolean => {
  // 密码必须包含大小写字母和数字，不能包含特殊字符，长度在8-20之间
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/
  return reg.test(value)
}

// 邮箱校验
export const checkEmail = (rule: FormItemRule, value: string): boolean => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(value)
}

// 身份证校验
export const checkIdCard = (rule: FormItemRule, value: string): boolean => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(value)
}
