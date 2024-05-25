import { Footer } from '@/components';
import { userRegister } from '@/services/user/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import { Alert, ConfigProvider, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
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
  const [userLoginState, setUserLoginState] = useState<{ msg?: string }>({});
  const { styles } = useStyles();

  const handleSubmit = async (values: User.UserRegister) => {
    setUserLoginState({ msg: '' });
    try {
      if ((values as any).password2 !== values.password) {
        setUserLoginState({ msg: '两次输入的密码不一致' });
        return;
      }
      // 注册
      const res = await userRegister({ ...values });
      if (res?.data.userId) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        history.push('/user/login');
        return;
      }
      console.log(res);
      // 如果失败去设置用户错误信息
      setUserLoginState({ msg: (res as any).msg || '注册失败' });
    } catch (error) {
      setUserLoginState({ msg: '注册失败，请重试！' });
      console.log(error);
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
          <title>注册页 - {Settings.title}</title>
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
          <ProForm
            style={{
              minWidth: 280,
              maxWidth: '75vw',
              width: 400,
              margin: 'auto',
            }}
            onFinish={async (values) => {
              await handleSubmit(values as User.UserRegister);
            }}
            submitter={{
              searchConfig: { submitText: '注册', resetText: '重置' },
              submitButtonProps: {},
            }}
          >
            <>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <h2>注册新用户</h2>
              </div>
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
                  {
                    min: 4,
                    message: '至少4个字符',
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
                  {
                    min: 4,
                    message: '至少4个字符',
                  },
                ]}
              />

              <ProFormText.Password
                name="password2"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="重复密码"
                rules={[
                  {
                    required: true,
                    message: '请再次输入密码！',
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
                  history.push('/user/login');
                }}
              >
                有账号，去登录
              </a>
            </div>
          </ProForm>
        </div>
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default Register;
