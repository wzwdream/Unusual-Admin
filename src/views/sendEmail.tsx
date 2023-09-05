import { defineComponent, ref } from 'vue'
import { FormInst, FormItemInst, FormItemRule, useMessage, FormRules,NForm ,NFormItem ,NRow ,NCol,NButton,NInput} from 'naive-ui'
import { divide } from 'lodash-es'
interface ModelType {
    addressee: string | null
    subject: string | null
    content: string | null
}
export default defineComponent({
    name: 'sendEmail',
    setup() {
        const formRef = ref<FormInst | null>(null)
        const rPasswordFormItemRef = ref<FormItemInst | null>(null)
        const message = useMessage()
        // const splitter = new GraphemeSplitter()
        const emailData = ref<ModelType>({
            addressee: null,
            subject: null,
            content: null,
        })
        // function countGraphemes(value: string) {
        //     splitter.countGraphemes(value)
        // }
        const rules: FormRules = {
            addressee: [
                {
                    required: true,
                    trigger: ['input', 'blur'],
                },
            ],
            subject: [
                {
                    required: true,
                    message: '请输入密码',
                },
            ],
            content: [
                {
                    required: true,
                    message: '请再次输入密码',
                    trigger: ['input', 'blur'],
                },
            ],
        }
        return ()=> <div>
        <NForm ref='formRef' model={emailData} rules={rules}>
            <NFormItem path='age' label='收件人'>
                <NInput v-model:value={emailData.value.addressee}  maxlength='30' clearable show-count />
            </NFormItem>
            <NFormItem path='password' label='主题'>
                <NInput v-model={emailData.value.subject}  maxlength='30' clearable show-count />
            </NFormItem>
            <NFormItem label='内容'>
                <NInput
                    v-model={emailData.value.content}
                    // onKeyPress.enter={()=>{}}
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
                        <NButton disabled={emailData.value.addressee === null} round type='primary'>
                            发送
                        </NButton>
                    </div>
                </NCol>
            </NRow>
        </NForm>

    </div>


    }
})
