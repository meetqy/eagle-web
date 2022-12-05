namespace API {
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
  }

  interface Tags {
    historyTags: string[];
    // 常用
    starredTags: string[];
  }
}
