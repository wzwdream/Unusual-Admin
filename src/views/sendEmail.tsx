import { defineComponent, ref } from 'vue'
import { FormInst, FormItemInst, FormItemRule, useMessage, FormRules, NForm, NFormItem, NRow, NCol, NButton, NInput } from 'naive-ui'
// import { domToPng, domToWebp } from 'modern-screenshot'
import ScreenShot from 'js-web-screen-shot'
interface ModelType {
    addressee: string | null
    subject: string | null
    content: string | null
}
export default defineComponent({
    name: 'sendEmail',
    setup() {
        const formRef = ref<FormInst | null>(null)
        const message = useMessage()
        // const splitter = new GraphemeSplitter()
        const emailData = ref<ModelType>({
            addressee: null,
            subject: null,
            content: null,
        })
        function handleValidateButtonClick(e: MouseEvent) {
            e.preventDefault()
            console.log(formRef.value, 'form')
            console.log(emailData.value, 'data')
            formRef.value?.validate((errors) => {
                if (!errors) {
                    message.success('验证成功')
                } else {
                    console.log(errors)
                    message.error('验证失败')
                }
            })
        }
        const ruleForm: FormRules = {
            addressee: {
                required: true,
                trigger: ['input', 'blur'],
                message: '请输入收件人邮箱',
            },

            subject: {
                required: true,
                trigger: ['input', 'blur'],
                message: '请输入主题',
            },

            content: {
                required: true,
                message: '请输入内容',
                trigger: ['input', 'blur'],
            },
        }
        const small = 'medium'
        const shotCut = function () {
            // domToWebp(document.getElementsByTagName('form')[0], { quality: 1,timeout:30000}).then(dataUrl => {
            //     const link = document.createElement('a')
            //     link.download = 'screenshot.webp'
            //     link.href = dataUrl
            //     link.click()
            //   })
            const shot = new ScreenShot({
                clickCutFullScreen: true,
                enableWebRtc: false,
                clickCutFullScreen:true,
                completeCallback: ({base64, cutInfo}) => {
                    console.log(base64, cutInfo);
                    const link = document.createElement('a')
                        link.download = 'screenshot.png'
                        link.href = base64
                        link.click()
                },
                triggerCallback:() => {
                  // 截图组件加载完毕调用此方法来完成框选区域的截图
                  shot.completeScreenshot()
                }})
        }

        return () => (
            <div class='w-full min-h-[calc(100vh-138px)] bg-[#fff]'>
                <div class='w-1/3 m-auto p-10 '>
                    <NForm ref={formRef} model={emailData.value} rules={ruleForm} size={small}>
                        <NFormItem path='addressee' label='收件人'>
                            <NInput v-model:value={emailData.value.addressee} maxlength='30' clearable />
                        </NFormItem>
                        <NFormItem path='subject' label='主题'>
                            <NInput v-model:value={emailData.value.subject} maxlength='30' clearable />
                        </NFormItem>
                        <NFormItem label='内容' path='content'>
                            <NInput
                                v-model:value={emailData.value.content}
                                type='textarea'
                                placeholder='请输入'
                                maxlength='1000'
                                clearable
                                show-count
                            />
                        </NFormItem>
                        <NRow gutter={[0, 24]}>
                            <NCol span={'24'}>
                                <div style='display: flex; justify-content: flex-end'>
                                    <NButton
                                        disabled={emailData.value.addressee === null}
                                        round
                                        type='primary'
                                        onClick={handleValidateButtonClick}
                                    >
                                        发送
                                    </NButton>
                                </div>
                                <div style='display: flex; justify-content: flex-end' class='mt-10px'>
                                    <NButton round type='primary' onClick={shotCut}>
                                        截图
                                    </NButton>
                                </div>
                            </NCol>
                        </NRow>
                    </NForm>
                </div>
            </div>
        )
    },
})
