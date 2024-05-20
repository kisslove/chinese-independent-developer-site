import NavTabs from '@/components/NavTabs';
import { updateUser } from '@/services/user/api';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import type { FormProps } from 'antd';
import { Button, Card, Form, Input, Radio, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
type FieldType = {
  username?: string;
  nickName?: string;
  phone?: string;
  gender?: string;
  email?: string;
  description?: string;
};

const Center: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialState?.currentUser) {
      const user = initialState?.currentUser;
      form.setFieldsValue({
        username: user.username,
        nickName: user.nickName,
        phone: user.phone,
        email: user.email,
        gender: user.gender,
        description: user.description,
      });
    }
  }, [initialState?.currentUser]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true);
    const res = await updateUser(values);
    if (res.code === 200) {
      message.success('更新成功');
      flushSync(() => {
        setInitialState((s) => ({ ...s, currentUser: { ...s.currentUser, ...values } }));
      });
    }
    setLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <PageContainer title={false}>
      <div className="">
        <NavTabs />
      </div>
      <Card>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, paddingTop: 40 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="用户名" name="username">
            <Input disabled readOnly />
          </Form.Item>

          <Form.Item<FieldType> label="昵称" name="nickName">
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="gender">
            <Radio.Group>
              <Radio value="0"> 男 </Radio>
              <Radio value="1"> 女 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FieldType> label="手机号" name="phone">
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="邮箱" name="email">
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="描述" name="description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Center;
