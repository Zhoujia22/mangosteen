import axios from "axios";
import { defineComponent, PropType, reactive, ref } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { http } from "../shared/Http";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import s from "./SignInPage.module.scss";
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: "827160082@qq.com",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const refValidationCode = ref<any>();
    const onSubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });
      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /.+@.+/,
            message: "请输入正确的邮箱地址",
          },
          { key: "code", type: "required", message: "必填" },
        ])
      );
    };
    const onClickSendValidationCode = async () => {
      const response = await http
        .post("/validation_codes", {
          email: formData.email,
        })
        .catch(() => {});
      refValidationCode.value.startCount();
    };
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="left" />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen" />
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  placeholder="请输入邮箱号"
                  type="text"
                  v-model={formData.email}
                  error={errors.email?.[0]}
                />
                <FormItem
                  label="验证码"
                  placeholder="请输入验证码"
                  type="validationCode"
                  v-model={formData.code}
                  error={errors.code?.[0]}
                  onClick={onClickSendValidationCode}
                  countFrom={1}
                  ref={refValidationCode}
                />
                <FormItem style={{ paddingTop: "32px" }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
