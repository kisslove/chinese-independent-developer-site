declare namespace User {
  interface Item extends Common.Item {
    id?: string;
    userId: string;
    username: string;
    nickName?: string;
    token?: string;
    avatarPath?: string;
    createBy?: string;
    updateBy?: string;
    createTime?: Date;
    updateTime?: Date;
  }
  interface Res extends Common.Results {
    data: {
      result: Item[];
      total: number;
    };
  }

  interface ItemSocials extends Common.Results {
    data: {
      result: {
        id: string;
        socialType: string;
        socialUrl: string;
      }[]
    }
  }

  interface UserLogin {
    username: string;
    password: string;
  }

  interface UserRegister {
    username: string;
    password: string;
    nickName?: string;
  }

  interface UpdateUserInfo {
    phone?: string;
    gender?: string;
    nickName?: string;
    email?: string;
    description?: string;
  }

}
