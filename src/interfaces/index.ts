export interface UserInterface {
  browserInfo: string;
  createdAt: string;
  ipAddress: string;
  lastAccessAt: string;
  userId: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  selectedOption: string;
  selectedOptionId: string;
  grammarBlurb: any;
  result: boolean;
  responses: any;
  titleEnglish: string;
  publishedDate: string;
  options: any;
  titleFrench: string;
  phonetic: string;
  description: any;
}

interface SiteLink {
  URL: string;
  Label: string;
}

export interface siteSettingInterface {
  navLinks: SiteLink[];
  faqLinks: string;
  salesCopy: string;
  salesImage: any;
  salesUrl: string;
  keepLearningSectionCopy: string;
  keepLearningSectionImage1: any;
  keepLearningSectionUrl1: string;
  keepLearningSectionImage2: any;
  keepLearningSectionUrl2: any;
  seeAllProduct: string;
}

export interface UserReducerState {
  data: UserInterface | null;
}

export interface siteSettingReducerState {
  data: siteSettingInterface | null;
}
