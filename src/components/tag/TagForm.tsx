import { defineComponent, onMounted, PropType, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button } from '../../shared/Button';
import { Form, FormItem } from '../../shared/Form';
import { http } from '../../shared/Http';
import { onFormError } from '../../shared/onFormError';
import { Rules, validate, hasError } from '../../shared/validate';
import s from './Tag.module.scss';
export const TagForm = defineComponent({
  props: {
    id: Number,
  },
  setup: (props, context) => {
    const route = useRoute();
    const router = useRouter();
    const formData = reactive<Partial<Tag>>({
      id: undefined,
      name: '',
      sign: '😀',
      kind: route.query.kind!.toString() as 'expenses' | 'income',
    });
    const errors = reactive<FormErrors<typeof formData>>({});

    onMounted(async () => {
      if (!props.id) {
        return;
      }
      const response = await http.get<Resource<Tag>>(
        `/tags/${props.id}`,
        {},
        {
          _mock: 'tagShow',
        }
      );
      Object.assign(formData, response.data.resource);
    });

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        {
          key: 'name',
          type: 'pattern',
          regex: /^.{1,4}$/,
          message: '只能填 1 到 4 个字符',
        },
        { key: 'sign', type: 'required', message: '必填' },
      ];
      Object.assign(errors, {
        name: [],
        sign: [],
      });
      Object.assign(errors, validate(formData, rules));
      if (!hasError(errors)) {
        const promise = (await formData.id)
          ? http.patch(`/tags${formData.id}`, formData, {
              _mock: 'tagEdit',
              _autoLoading: true,
            })
          : http.post('/tags', formData, {
              _mock: 'tagCreate',
              _autoLoading: true,
            });

        await promise.catch((error) =>
          onFormError(error, (data) => Object.assign(errors, data.errors))
        );
        router.back();
      }
    };
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label="标签名 (最多 4 个字符)"
          type="text"
          v-model={formData.name}
          error={errors['name']?.[0]}
        />
        <FormItem
          label={'符号:' + formData.sign}
          type="emojiSelect"
          v-model={formData.sign}
          error={errors['sign']?.[0]}
        />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button type="submit" class={[s.button]}>
            确定
          </Button>
        </FormItem>
      </Form>
    );
  },
});
