declare namespace User {
  interface Item extends Common.Item {
    id?: string;
    userId: string;
    username: string;
    avatarPath?: string;
    createBy: string;
    updateBy: string;
    createTime: Date;
    updateTime: Date;
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
}
