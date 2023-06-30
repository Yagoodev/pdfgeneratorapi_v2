export interface TextInterface {
  value?: string;
  size?: number;
  color?: string;
  bold?: boolean;
  position?: [number, number];
  options?: PDFKit.Mixins.TextOptions
}

export interface ImageInterface {
  imagePath?: any;
  position?: [number, number];
  options?: PDFKit.Mixins.ImageOption
}

export interface PathInterface {
  paths: Array<string>;
  pathsFill: Array<string>;
}

export interface PathTranslateInterface {
  path?: string;
  translate?: [number, number]
}