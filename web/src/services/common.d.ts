
declare namespace Common {
  interface Results<T=any> {
    code: number;
    msg: string;
    data: T;
  }

  interface Item {
    createBy: string;
    updateBy: string;
    createTime: string;
    updateTime: string;
  }

  interface Query {
    blurry?: string;
    blurryFields?: string;
    pageSize: number;
    pageNum: number;
    [name: string]: any;
    sortOrder?: string;
    sortField?: string;
  }
}
