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

  export interface Metadata {
    folders: MetadataFolder[];
    smartFolders: any[];
    quickAccess: any[];
    tagsGroups: MetadataTagsGroup[];
    modificationTime: number;
    applicationVersion: string;
  }

  export interface MetadataFolder {
    id: string;
    name: string;
    description: string;
    children: any[];
    modificationTime: number;
    tags: any[];
    iconColor: string;
    password: string;
    passwordTips: string;
  }

  export interface MetadataTagsGroup {
    id: string;
    name: string;
    tags: string[];
    color: string;
  }
}
