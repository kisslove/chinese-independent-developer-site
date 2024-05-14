import { Footer } from '@/components';
import { userRegister } from '@/services/user/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, useIntl, useModel } from '@umijs/max';
import { Alert, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Register: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<{ status?: string }>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: User.Item) => {
    try {
      // 注册
      const msg = await userRegister({ ...values });
      if (msg?.token) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        history.push('/user/login');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState({ status: 'error' });
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status = {} } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>注册页 - {Settings.title}</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
          paddingTop: '8%',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          // logo={<img alt="logo" src="/logo.svg" />}
          title="中国独立开发者项目(网页版)"
          subTitle="-- 分享大家都在做什么"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as User.Item);
          }}
        >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <ProFormText
              name="nickName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />

            <ProFormText.Password
              name="password2"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder="重复"
              rules={[
                {
                  required: true,
                  message: '请再次输入密码！',
                },
              ]}
            />
          </>

          {status === 'error' && <LoginMessage content="注册失败" />}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <a
              style={{
                float: 'right',
              }}
              onClick={() => {
                history.push('/user/login');
              }}
            >
              有账号，去登录
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
