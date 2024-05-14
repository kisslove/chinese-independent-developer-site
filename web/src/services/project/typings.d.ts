declare namespace Project {
  interface Item extends Common.Item {
    id?: string;
    userId: string;
    username: string;
    name: string;
    url: string;
    avatarPath?: string;
    status: string;
    type: string;
    description: string;
    addTime: string;
    createBy: string;
    updateBy: string;
    createTime: Date;
    updateTime: Date;
    itemViews?: number;
  }
  interface Res extends Common.Results {
    data: {
      result: Item[];
      total: number;
    };
  }

  interface PageParams extends API.PageParams {
    label?: string;
  }

  interface ItemOtherDetails extends Common.Results {
    data: {
      like?: number;
      collects?: number;
      views?: number;
    };
  }
}
