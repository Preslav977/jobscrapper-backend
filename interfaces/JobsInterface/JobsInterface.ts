export interface JobsInterface {
  id?: string;
  hybridOrRemote: string;
  fullTimeOrNot: string;
  location: string;
  datePosted: Date;
  jobTitle: string;
  jobDescription: string;
  companyID: number;
}
