import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Company: "Company";
    readonly Jobs: "Jobs";
    readonly Instructions: "Instructions";
    readonly Session: "Session";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly password: "password";
    readonly confirmPassword: "confirmPassword";
    readonly location: "location";
    readonly email: "email";
    readonly phoneNumber: "phoneNumber";
    readonly linkedInURL: "linkedInURL";
    readonly githubURL: "githubURL";
    readonly portfolioURL: "portfolioURL";
    readonly profilePicture: "profilePicture";
    readonly role: "role";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const CompanyScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly logo: "logo";
    readonly URL: "URL";
};
export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum];
export declare const JobsScalarFieldEnum: {
    readonly id: "id";
    readonly hybridOrRemote: "hybridOrRemote";
    readonly jobQualification: "jobQualification";
    readonly fullTimeOrNot: "fullTimeOrNot";
    readonly location: "location";
    readonly datePosted: "datePosted";
    readonly jobTitle: "jobTitle";
    readonly jobDescription: "jobDescription";
    readonly jobAnchor: "jobAnchor";
    readonly companyID: "companyID";
};
export type JobsScalarFieldEnum = (typeof JobsScalarFieldEnum)[keyof typeof JobsScalarFieldEnum];
export declare const InstructionsScalarFieldEnum: {
    readonly id: "id";
    readonly careersButton: "careersButton";
    readonly careersHoverButton: "careersHoverButton";
    readonly joinUsButton: "joinUsButton";
    readonly joinUsHoverButton: "joinUsHoverButton";
    readonly loadMoreButton: "loadMoreButton";
    readonly locationSelect: "locationSelect";
    readonly locationClickSelect: "locationClickSelect";
    readonly jobCategorySelect: "jobCategorySelect";
    readonly jobCategoryClickSelect: "jobCategoryClickSelect";
    readonly jobTypingInput: "jobTypingInput";
    readonly submitFormButton: "submitFormButton";
    readonly scrollToContainer: "scrollToContainer";
    readonly nextPageButton: "nextPageButton";
    readonly showMoreJobsOnPage: "showMoreJobsOnPage";
    readonly jobsContainer: "jobsContainer";
    readonly jobsContainerTitle: "jobsContainerTitle";
    readonly jobsContainerLocation: "jobsContainerLocation";
    readonly jobsWorkingDay: "jobsWorkingDay";
    readonly jobsWorkingType: "jobsWorkingType";
    readonly jobsDatePosted: "jobsDatePosted";
    readonly jobsContainerDesc: "jobsContainerDesc";
    readonly jobsContainerDetailsAnchor: "jobsContainerDetailsAnchor";
    readonly companyID: "companyID";
};
export type InstructionsScalarFieldEnum = (typeof InstructionsScalarFieldEnum)[keyof typeof InstructionsScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly sid: "sid";
    readonly data: "data";
    readonly expiresAt: "expiresAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map