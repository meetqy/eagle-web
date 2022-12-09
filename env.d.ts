namespace EagleWeb {
  interface Image {
    id: string;
    name: string;
    size: number;
    btime: number;
    mtime: number;
    ext: string;
    tags: any[];
    folders: any[];
    isDeleted: boolean;
    url: string;
    annotation: string;
    modificationTime: number;
    noThumbnail: boolean;
    width: number;
    height: number;
    lastModified: number;
    palettes: ImagePalette[];
    star: number;
  }

  interface ImagePalette {
    color: number[];
    ratio: number;
  }

  interface Env {
    host: string;
    limit: number;
    images_protocol: string;
    images_hostname: string;
    images_port: string;
  }

  interface Tags {
    historyTags: string[];
    // 常用
    starredTags: string[];
  }

  interface MenuItem {
    key: string;
    name: string;
    route: string;
    icon: JSX.Element;
    count: number;
    // 基础信息 collapsed 状态
    basic: boolean;
  }
}
