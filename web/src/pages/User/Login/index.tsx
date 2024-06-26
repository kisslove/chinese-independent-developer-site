import { Footer } from '@/components';
import { userLogin } from '@/services/user/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, ConfigProvider, message } from 'antd';
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

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<{ msg?: string }>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();

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

  const handleSubmit = async (values: User.UserLogin) => {
    setUserLoginState({ msg: '' });
    try {
      // 登录
      const res = await userLogin({ ...values });
      if (res?.data?.token) {
        localStorage.setItem('token', res.data.token);
        message.success('登录成功！');
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(res);
      // 如果失败去设置用户错误信息
      setUserLoginState({ msg: '用户名或密码错误' });
    } catch (error) {
      setUserLoginState({ msg: '登录失败,请重试！' });
    }
  };
  const { msg } = userLoginState;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: Settings.colorPrimary,
          colorLink: Settings.colorPrimary,
        },
      }}
    >
      <div className={styles.container}>
        <Helmet>
          <title>登录页 - {Settings.title}</title>
        </Helmet>
        <a
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            color: Settings.colorPrimary,
            cursor: 'pointer',
          }}
          onClick={() => {
            history.push('/');
          }}
        >
          中国独立开发者项目(网页版)
        </a>
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
            title="享受别人不能享受的快乐"
            subTitle="-- 分享大家都在做什么"
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as User.UserLogin);
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
            </>

            {msg && <LoginMessage content={msg} />}
            <div
              style={{
                marginBottom: 8,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <a>&nbsp;</a>
              <a
                onClick={() => {
                  history.push('/user/register');
                }}
              >
                注册新账号
              </a>
            </div>
          </LoginForm>
        </div>
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default Login;
