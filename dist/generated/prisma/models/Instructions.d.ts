import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Instructions
 *
 */
export type InstructionsModel = runtime.Types.Result.DefaultSelection<Prisma.$InstructionsPayload>;
export type AggregateInstructions = {
    _count: InstructionsCountAggregateOutputType | null;
    _avg: InstructionsAvgAggregateOutputType | null;
    _sum: InstructionsSumAggregateOutputType | null;
    _min: InstructionsMinAggregateOutputType | null;
    _max: InstructionsMaxAggregateOutputType | null;
};
export type InstructionsAvgAggregateOutputType = {
    id: number | null;
    companyID: number | null;
};
export type InstructionsSumAggregateOutputType = {
    id: number | null;
    companyID: number | null;
};
export type InstructionsMinAggregateOutputType = {
    id: number | null;
    careersButton: string | null;
    careersHoverButton: string | null;
    joinUsButton: string | null;
    joinUsHoverButton: string | null;
    loadMoreButton: string | null;
    locationSelect: string | null;
    locationClickSelect: string | null;
    categorySelect: string | null;
    categoryClickSelect: string | null;
    typingInput: string | null;
    submitFormButton: string | null;
    scrollToContainer: string | null;
    nextPageButton: string | null;
    showMoreJobsOnPage: string | null;
    jobContainer: string | null;
    jobTitle: string | null;
    jobLocation: string | null;
    jobRemoteOrHybrid: string | null;
    jobDatePosted: string | null;
    jobDescription: string | null;
    jobDetailsAnchorHref: string | null;
    companyID: number | null;
};
export type InstructionsMaxAggregateOutputType = {
    id: number | null;
    careersButton: string | null;
    careersHoverButton: string | null;
    joinUsButton: string | null;
    joinUsHoverButton: string | null;
    loadMoreButton: string | null;
    locationSelect: string | null;
    locationClickSelect: string | null;
    categorySelect: string | null;
    categoryClickSelect: string | null;
    typingInput: string | null;
    submitFormButton: string | null;
    scrollToContainer: string | null;
    nextPageButton: string | null;
    showMoreJobsOnPage: string | null;
    jobContainer: string | null;
    jobTitle: string | null;
    jobLocation: string | null;
    jobRemoteOrHybrid: string | null;
    jobDatePosted: string | null;
    jobDescription: string | null;
    jobDetailsAnchorHref: string | null;
    companyID: number | null;
};
export type InstructionsCountAggregateOutputType = {
    id: number;
    careersButton: number;
    careersHoverButton: number;
    joinUsButton: number;
    joinUsHoverButton: number;
    loadMoreButton: number;
    locationSelect: number;
    locationClickSelect: number;
    categorySelect: number;
    categoryClickSelect: number;
    typingInput: number;
    submitFormButton: number;
    scrollToContainer: number;
    nextPageButton: number;
    showMoreJobsOnPage: number;
    jobContainer: number;
    jobTitle: number;
    jobLocation: number;
    jobRemoteOrHybrid: number;
    jobDatePosted: number;
    jobDescription: number;
    jobDetailsAnchorHref: number;
    companyID: number;
    _all: number;
};
export type InstructionsAvgAggregateInputType = {
    id?: true;
    companyID?: true;
};
export type InstructionsSumAggregateInputType = {
    id?: true;
    companyID?: true;
};
export type InstructionsMinAggregateInputType = {
    id?: true;
    careersButton?: true;
    careersHoverButton?: true;
    joinUsButton?: true;
    joinUsHoverButton?: true;
    loadMoreButton?: true;
    locationSelect?: true;
    locationClickSelect?: true;
    categorySelect?: true;
    categoryClickSelect?: true;
    typingInput?: true;
    submitFormButton?: true;
    scrollToContainer?: true;
    nextPageButton?: true;
    showMoreJobsOnPage?: true;
    jobContainer?: true;
    jobTitle?: true;
    jobLocation?: true;
    jobRemoteOrHybrid?: true;
    jobDatePosted?: true;
    jobDescription?: true;
    jobDetailsAnchorHref?: true;
    companyID?: true;
};
export type InstructionsMaxAggregateInputType = {
    id?: true;
    careersButton?: true;
    careersHoverButton?: true;
    joinUsButton?: true;
    joinUsHoverButton?: true;
    loadMoreButton?: true;
    locationSelect?: true;
    locationClickSelect?: true;
    categorySelect?: true;
    categoryClickSelect?: true;
    typingInput?: true;
    submitFormButton?: true;
    scrollToContainer?: true;
    nextPageButton?: true;
    showMoreJobsOnPage?: true;
    jobContainer?: true;
    jobTitle?: true;
    jobLocation?: true;
    jobRemoteOrHybrid?: true;
    jobDatePosted?: true;
    jobDescription?: true;
    jobDetailsAnchorHref?: true;
    companyID?: true;
};
export type InstructionsCountAggregateInputType = {
    id?: true;
    careersButton?: true;
    careersHoverButton?: true;
    joinUsButton?: true;
    joinUsHoverButton?: true;
    loadMoreButton?: true;
    locationSelect?: true;
    locationClickSelect?: true;
    categorySelect?: true;
    categoryClickSelect?: true;
    typingInput?: true;
    submitFormButton?: true;
    scrollToContainer?: true;
    nextPageButton?: true;
    showMoreJobsOnPage?: true;
    jobContainer?: true;
    jobTitle?: true;
    jobLocation?: true;
    jobRemoteOrHybrid?: true;
    jobDatePosted?: true;
    jobDescription?: true;
    jobDetailsAnchorHref?: true;
    companyID?: true;
    _all?: true;
};
export type InstructionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Instructions to aggregate.
     */
    where?: Prisma.InstructionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Instructions to fetch.
     */
    orderBy?: Prisma.InstructionsOrderByWithRelationInput | Prisma.InstructionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.InstructionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Instructions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Instructions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Instructions
    **/
    _count?: true | InstructionsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: InstructionsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: InstructionsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: InstructionsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: InstructionsMaxAggregateInputType;
};
export type GetInstructionsAggregateType<T extends InstructionsAggregateArgs> = {
    [P in keyof T & keyof AggregateInstructions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInstructions[P]> : Prisma.GetScalarType<T[P], AggregateInstructions[P]>;
};
export type InstructionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstructionsWhereInput;
    orderBy?: Prisma.InstructionsOrderByWithAggregationInput | Prisma.InstructionsOrderByWithAggregationInput[];
    by: Prisma.InstructionsScalarFieldEnum[] | Prisma.InstructionsScalarFieldEnum;
    having?: Prisma.InstructionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstructionsCountAggregateInputType | true;
    _avg?: InstructionsAvgAggregateInputType;
    _sum?: InstructionsSumAggregateInputType;
    _min?: InstructionsMinAggregateInputType;
    _max?: InstructionsMaxAggregateInputType;
};
export type InstructionsGroupByOutputType = {
    id: number;
    careersButton: string | null;
    careersHoverButton: string | null;
    joinUsButton: string | null;
    joinUsHoverButton: string | null;
    loadMoreButton: string | null;
    locationSelect: string | null;
    locationClickSelect: string | null;
    categorySelect: string | null;
    categoryClickSelect: string | null;
    typingInput: string | null;
    submitFormButton: string | null;
    scrollToContainer: string | null;
    nextPageButton: string | null;
    showMoreJobsOnPage: string | null;
    jobContainer: string | null;
    jobTitle: string | null;
    jobLocation: string | null;
    jobRemoteOrHybrid: string | null;
    jobDatePosted: string | null;
    jobDescription: string | null;
    jobDetailsAnchorHref: string | null;
    companyID: number;
    _count: InstructionsCountAggregateOutputType | null;
    _avg: InstructionsAvgAggregateOutputType | null;
    _sum: InstructionsSumAggregateOutputType | null;
    _min: InstructionsMinAggregateOutputType | null;
    _max: InstructionsMaxAggregateOutputType | null;
};
type GetInstructionsGroupByPayload<T extends InstructionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InstructionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InstructionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InstructionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InstructionsGroupByOutputType[P]>;
}>>;
export type InstructionsWhereInput = {
    AND?: Prisma.InstructionsWhereInput | Prisma.InstructionsWhereInput[];
    OR?: Prisma.InstructionsWhereInput[];
    NOT?: Prisma.InstructionsWhereInput | Prisma.InstructionsWhereInput[];
    id?: Prisma.IntFilter<"Instructions"> | number;
    careersButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    careersHoverButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    joinUsButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    joinUsHoverButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    loadMoreButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    locationSelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    locationClickSelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    categorySelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    categoryClickSelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    typingInput?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    submitFormButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    scrollToContainer?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    nextPageButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    showMoreJobsOnPage?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobContainer?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobTitle?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobLocation?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobRemoteOrHybrid?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobDatePosted?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobDescription?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobDetailsAnchorHref?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    companyID?: Prisma.IntFilter<"Instructions"> | number;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
};
export type InstructionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    careersButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    careersHoverButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    joinUsButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    joinUsHoverButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    loadMoreButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    locationSelect?: Prisma.SortOrderInput | Prisma.SortOrder;
    locationClickSelect?: Prisma.SortOrderInput | Prisma.SortOrder;
    categorySelect?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryClickSelect?: Prisma.SortOrderInput | Prisma.SortOrder;
    typingInput?: Prisma.SortOrderInput | Prisma.SortOrder;
    submitFormButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    scrollToContainer?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextPageButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    showMoreJobsOnPage?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobContainer?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobTitle?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobRemoteOrHybrid?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobDatePosted?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobDetailsAnchorHref?: Prisma.SortOrderInput | Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
    company?: Prisma.CompanyOrderByWithRelationInput;
};
export type InstructionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.InstructionsWhereInput | Prisma.InstructionsWhereInput[];
    OR?: Prisma.InstructionsWhereInput[];
    NOT?: Prisma.InstructionsWhereInput | Prisma.InstructionsWhereInput[];
    careersButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    careersHoverButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    joinUsButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    joinUsHoverButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    loadMoreButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    locationSelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    locationClickSelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    categorySelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    categoryClickSelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    typingInput?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    submitFormButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    scrollToContainer?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    nextPageButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    showMoreJobsOnPage?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobContainer?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobTitle?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobLocation?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobRemoteOrHybrid?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobDatePosted?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobDescription?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobDetailsAnchorHref?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    companyID?: Prisma.IntFilter<"Instructions"> | number;
    company?: Prisma.XOR<Prisma.CompanyScalarRelationFilter, Prisma.CompanyWhereInput>;
}, "id">;
export type InstructionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    careersButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    careersHoverButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    joinUsButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    joinUsHoverButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    loadMoreButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    locationSelect?: Prisma.SortOrderInput | Prisma.SortOrder;
    locationClickSelect?: Prisma.SortOrderInput | Prisma.SortOrder;
    categorySelect?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryClickSelect?: Prisma.SortOrderInput | Prisma.SortOrder;
    typingInput?: Prisma.SortOrderInput | Prisma.SortOrder;
    submitFormButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    scrollToContainer?: Prisma.SortOrderInput | Prisma.SortOrder;
    nextPageButton?: Prisma.SortOrderInput | Prisma.SortOrder;
    showMoreJobsOnPage?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobContainer?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobTitle?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobRemoteOrHybrid?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobDatePosted?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    jobDetailsAnchorHref?: Prisma.SortOrderInput | Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
    _count?: Prisma.InstructionsCountOrderByAggregateInput;
    _avg?: Prisma.InstructionsAvgOrderByAggregateInput;
    _max?: Prisma.InstructionsMaxOrderByAggregateInput;
    _min?: Prisma.InstructionsMinOrderByAggregateInput;
    _sum?: Prisma.InstructionsSumOrderByAggregateInput;
};
export type InstructionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.InstructionsScalarWhereWithAggregatesInput | Prisma.InstructionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.InstructionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InstructionsScalarWhereWithAggregatesInput | Prisma.InstructionsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Instructions"> | number;
    careersButton?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    careersHoverButton?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    joinUsButton?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    joinUsHoverButton?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    loadMoreButton?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    locationSelect?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    locationClickSelect?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    categorySelect?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    categoryClickSelect?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    typingInput?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    submitFormButton?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    scrollToContainer?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    nextPageButton?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    showMoreJobsOnPage?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    jobContainer?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    jobTitle?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    jobLocation?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    jobRemoteOrHybrid?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    jobDatePosted?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    jobDescription?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    jobDetailsAnchorHref?: Prisma.StringNullableWithAggregatesFilter<"Instructions"> | string | null;
    companyID?: Prisma.IntWithAggregatesFilter<"Instructions"> | number;
};
export type InstructionsCreateInput = {
    careersButton?: string | null;
    careersHoverButton?: string | null;
    joinUsButton?: string | null;
    joinUsHoverButton?: string | null;
    loadMoreButton?: string | null;
    locationSelect?: string | null;
    locationClickSelect?: string | null;
    categorySelect?: string | null;
    categoryClickSelect?: string | null;
    typingInput?: string | null;
    submitFormButton?: string | null;
    scrollToContainer?: string | null;
    nextPageButton?: string | null;
    showMoreJobsOnPage?: string | null;
    jobContainer?: string | null;
    jobTitle?: string | null;
    jobLocation?: string | null;
    jobRemoteOrHybrid?: string | null;
    jobDatePosted?: string | null;
    jobDescription?: string | null;
    jobDetailsAnchorHref?: string | null;
    company: Prisma.CompanyCreateNestedOneWithoutInstructionsInput;
};
export type InstructionsUncheckedCreateInput = {
    id?: number;
    careersButton?: string | null;
    careersHoverButton?: string | null;
    joinUsButton?: string | null;
    joinUsHoverButton?: string | null;
    loadMoreButton?: string | null;
    locationSelect?: string | null;
    locationClickSelect?: string | null;
    categorySelect?: string | null;
    categoryClickSelect?: string | null;
    typingInput?: string | null;
    submitFormButton?: string | null;
    scrollToContainer?: string | null;
    nextPageButton?: string | null;
    showMoreJobsOnPage?: string | null;
    jobContainer?: string | null;
    jobTitle?: string | null;
    jobLocation?: string | null;
    jobRemoteOrHybrid?: string | null;
    jobDatePosted?: string | null;
    jobDescription?: string | null;
    jobDetailsAnchorHref?: string | null;
    companyID: number;
};
export type InstructionsUpdateInput = {
    careersButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    careersHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loadMoreButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorySelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    typingInput?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitFormButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scrollToContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextPageButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    showMoreJobsOnPage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobTitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobRemoteOrHybrid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDatePosted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDetailsAnchorHref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    company?: Prisma.CompanyUpdateOneRequiredWithoutInstructionsNestedInput;
};
export type InstructionsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    careersButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    careersHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loadMoreButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorySelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    typingInput?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitFormButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scrollToContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextPageButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    showMoreJobsOnPage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobTitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobRemoteOrHybrid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDatePosted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDetailsAnchorHref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    companyID?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type InstructionsCreateManyInput = {
    id?: number;
    careersButton?: string | null;
    careersHoverButton?: string | null;
    joinUsButton?: string | null;
    joinUsHoverButton?: string | null;
    loadMoreButton?: string | null;
    locationSelect?: string | null;
    locationClickSelect?: string | null;
    categorySelect?: string | null;
    categoryClickSelect?: string | null;
    typingInput?: string | null;
    submitFormButton?: string | null;
    scrollToContainer?: string | null;
    nextPageButton?: string | null;
    showMoreJobsOnPage?: string | null;
    jobContainer?: string | null;
    jobTitle?: string | null;
    jobLocation?: string | null;
    jobRemoteOrHybrid?: string | null;
    jobDatePosted?: string | null;
    jobDescription?: string | null;
    jobDetailsAnchorHref?: string | null;
    companyID: number;
};
export type InstructionsUpdateManyMutationInput = {
    careersButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    careersHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loadMoreButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorySelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    typingInput?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitFormButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scrollToContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextPageButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    showMoreJobsOnPage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobTitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobRemoteOrHybrid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDatePosted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDetailsAnchorHref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type InstructionsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    careersButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    careersHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loadMoreButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorySelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    typingInput?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitFormButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scrollToContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextPageButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    showMoreJobsOnPage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobTitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobRemoteOrHybrid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDatePosted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDetailsAnchorHref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    companyID?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type InstructionsListRelationFilter = {
    every?: Prisma.InstructionsWhereInput;
    some?: Prisma.InstructionsWhereInput;
    none?: Prisma.InstructionsWhereInput;
};
export type InstructionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InstructionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    careersButton?: Prisma.SortOrder;
    careersHoverButton?: Prisma.SortOrder;
    joinUsButton?: Prisma.SortOrder;
    joinUsHoverButton?: Prisma.SortOrder;
    loadMoreButton?: Prisma.SortOrder;
    locationSelect?: Prisma.SortOrder;
    locationClickSelect?: Prisma.SortOrder;
    categorySelect?: Prisma.SortOrder;
    categoryClickSelect?: Prisma.SortOrder;
    typingInput?: Prisma.SortOrder;
    submitFormButton?: Prisma.SortOrder;
    scrollToContainer?: Prisma.SortOrder;
    nextPageButton?: Prisma.SortOrder;
    showMoreJobsOnPage?: Prisma.SortOrder;
    jobContainer?: Prisma.SortOrder;
    jobTitle?: Prisma.SortOrder;
    jobLocation?: Prisma.SortOrder;
    jobRemoteOrHybrid?: Prisma.SortOrder;
    jobDatePosted?: Prisma.SortOrder;
    jobDescription?: Prisma.SortOrder;
    jobDetailsAnchorHref?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type InstructionsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type InstructionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    careersButton?: Prisma.SortOrder;
    careersHoverButton?: Prisma.SortOrder;
    joinUsButton?: Prisma.SortOrder;
    joinUsHoverButton?: Prisma.SortOrder;
    loadMoreButton?: Prisma.SortOrder;
    locationSelect?: Prisma.SortOrder;
    locationClickSelect?: Prisma.SortOrder;
    categorySelect?: Prisma.SortOrder;
    categoryClickSelect?: Prisma.SortOrder;
    typingInput?: Prisma.SortOrder;
    submitFormButton?: Prisma.SortOrder;
    scrollToContainer?: Prisma.SortOrder;
    nextPageButton?: Prisma.SortOrder;
    showMoreJobsOnPage?: Prisma.SortOrder;
    jobContainer?: Prisma.SortOrder;
    jobTitle?: Prisma.SortOrder;
    jobLocation?: Prisma.SortOrder;
    jobRemoteOrHybrid?: Prisma.SortOrder;
    jobDatePosted?: Prisma.SortOrder;
    jobDescription?: Prisma.SortOrder;
    jobDetailsAnchorHref?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type InstructionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    careersButton?: Prisma.SortOrder;
    careersHoverButton?: Prisma.SortOrder;
    joinUsButton?: Prisma.SortOrder;
    joinUsHoverButton?: Prisma.SortOrder;
    loadMoreButton?: Prisma.SortOrder;
    locationSelect?: Prisma.SortOrder;
    locationClickSelect?: Prisma.SortOrder;
    categorySelect?: Prisma.SortOrder;
    categoryClickSelect?: Prisma.SortOrder;
    typingInput?: Prisma.SortOrder;
    submitFormButton?: Prisma.SortOrder;
    scrollToContainer?: Prisma.SortOrder;
    nextPageButton?: Prisma.SortOrder;
    showMoreJobsOnPage?: Prisma.SortOrder;
    jobContainer?: Prisma.SortOrder;
    jobTitle?: Prisma.SortOrder;
    jobLocation?: Prisma.SortOrder;
    jobRemoteOrHybrid?: Prisma.SortOrder;
    jobDatePosted?: Prisma.SortOrder;
    jobDescription?: Prisma.SortOrder;
    jobDetailsAnchorHref?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type InstructionsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type InstructionsCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.InstructionsCreateWithoutCompanyInput, Prisma.InstructionsUncheckedCreateWithoutCompanyInput> | Prisma.InstructionsCreateWithoutCompanyInput[] | Prisma.InstructionsUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.InstructionsCreateOrConnectWithoutCompanyInput | Prisma.InstructionsCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.InstructionsCreateManyCompanyInputEnvelope;
    connect?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
};
export type InstructionsUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.InstructionsCreateWithoutCompanyInput, Prisma.InstructionsUncheckedCreateWithoutCompanyInput> | Prisma.InstructionsCreateWithoutCompanyInput[] | Prisma.InstructionsUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.InstructionsCreateOrConnectWithoutCompanyInput | Prisma.InstructionsCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.InstructionsCreateManyCompanyInputEnvelope;
    connect?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
};
export type InstructionsUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.InstructionsCreateWithoutCompanyInput, Prisma.InstructionsUncheckedCreateWithoutCompanyInput> | Prisma.InstructionsCreateWithoutCompanyInput[] | Prisma.InstructionsUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.InstructionsCreateOrConnectWithoutCompanyInput | Prisma.InstructionsCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.InstructionsUpsertWithWhereUniqueWithoutCompanyInput | Prisma.InstructionsUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.InstructionsCreateManyCompanyInputEnvelope;
    set?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
    disconnect?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
    delete?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
    connect?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
    update?: Prisma.InstructionsUpdateWithWhereUniqueWithoutCompanyInput | Prisma.InstructionsUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.InstructionsUpdateManyWithWhereWithoutCompanyInput | Prisma.InstructionsUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.InstructionsScalarWhereInput | Prisma.InstructionsScalarWhereInput[];
};
export type InstructionsUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.InstructionsCreateWithoutCompanyInput, Prisma.InstructionsUncheckedCreateWithoutCompanyInput> | Prisma.InstructionsCreateWithoutCompanyInput[] | Prisma.InstructionsUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.InstructionsCreateOrConnectWithoutCompanyInput | Prisma.InstructionsCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.InstructionsUpsertWithWhereUniqueWithoutCompanyInput | Prisma.InstructionsUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.InstructionsCreateManyCompanyInputEnvelope;
    set?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
    disconnect?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
    delete?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
    connect?: Prisma.InstructionsWhereUniqueInput | Prisma.InstructionsWhereUniqueInput[];
    update?: Prisma.InstructionsUpdateWithWhereUniqueWithoutCompanyInput | Prisma.InstructionsUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.InstructionsUpdateManyWithWhereWithoutCompanyInput | Prisma.InstructionsUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.InstructionsScalarWhereInput | Prisma.InstructionsScalarWhereInput[];
};
export type InstructionsCreateWithoutCompanyInput = {
    careersButton?: string | null;
    careersHoverButton?: string | null;
    joinUsButton?: string | null;
    joinUsHoverButton?: string | null;
    loadMoreButton?: string | null;
    locationSelect?: string | null;
    locationClickSelect?: string | null;
    categorySelect?: string | null;
    categoryClickSelect?: string | null;
    typingInput?: string | null;
    submitFormButton?: string | null;
    scrollToContainer?: string | null;
    nextPageButton?: string | null;
    showMoreJobsOnPage?: string | null;
    jobContainer?: string | null;
    jobTitle?: string | null;
    jobLocation?: string | null;
    jobRemoteOrHybrid?: string | null;
    jobDatePosted?: string | null;
    jobDescription?: string | null;
    jobDetailsAnchorHref?: string | null;
};
export type InstructionsUncheckedCreateWithoutCompanyInput = {
    id?: number;
    careersButton?: string | null;
    careersHoverButton?: string | null;
    joinUsButton?: string | null;
    joinUsHoverButton?: string | null;
    loadMoreButton?: string | null;
    locationSelect?: string | null;
    locationClickSelect?: string | null;
    categorySelect?: string | null;
    categoryClickSelect?: string | null;
    typingInput?: string | null;
    submitFormButton?: string | null;
    scrollToContainer?: string | null;
    nextPageButton?: string | null;
    showMoreJobsOnPage?: string | null;
    jobContainer?: string | null;
    jobTitle?: string | null;
    jobLocation?: string | null;
    jobRemoteOrHybrid?: string | null;
    jobDatePosted?: string | null;
    jobDescription?: string | null;
    jobDetailsAnchorHref?: string | null;
};
export type InstructionsCreateOrConnectWithoutCompanyInput = {
    where: Prisma.InstructionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstructionsCreateWithoutCompanyInput, Prisma.InstructionsUncheckedCreateWithoutCompanyInput>;
};
export type InstructionsCreateManyCompanyInputEnvelope = {
    data: Prisma.InstructionsCreateManyCompanyInput | Prisma.InstructionsCreateManyCompanyInput[];
    skipDuplicates?: boolean;
};
export type InstructionsUpsertWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.InstructionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.InstructionsUpdateWithoutCompanyInput, Prisma.InstructionsUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.InstructionsCreateWithoutCompanyInput, Prisma.InstructionsUncheckedCreateWithoutCompanyInput>;
};
export type InstructionsUpdateWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.InstructionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.InstructionsUpdateWithoutCompanyInput, Prisma.InstructionsUncheckedUpdateWithoutCompanyInput>;
};
export type InstructionsUpdateManyWithWhereWithoutCompanyInput = {
    where: Prisma.InstructionsScalarWhereInput;
    data: Prisma.XOR<Prisma.InstructionsUpdateManyMutationInput, Prisma.InstructionsUncheckedUpdateManyWithoutCompanyInput>;
};
export type InstructionsScalarWhereInput = {
    AND?: Prisma.InstructionsScalarWhereInput | Prisma.InstructionsScalarWhereInput[];
    OR?: Prisma.InstructionsScalarWhereInput[];
    NOT?: Prisma.InstructionsScalarWhereInput | Prisma.InstructionsScalarWhereInput[];
    id?: Prisma.IntFilter<"Instructions"> | number;
    careersButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    careersHoverButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    joinUsButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    joinUsHoverButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    loadMoreButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    locationSelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    locationClickSelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    categorySelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    categoryClickSelect?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    typingInput?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    submitFormButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    scrollToContainer?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    nextPageButton?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    showMoreJobsOnPage?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobContainer?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobTitle?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobLocation?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobRemoteOrHybrid?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobDatePosted?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobDescription?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    jobDetailsAnchorHref?: Prisma.StringNullableFilter<"Instructions"> | string | null;
    companyID?: Prisma.IntFilter<"Instructions"> | number;
};
export type InstructionsCreateManyCompanyInput = {
    id?: number;
    careersButton?: string | null;
    careersHoverButton?: string | null;
    joinUsButton?: string | null;
    joinUsHoverButton?: string | null;
    loadMoreButton?: string | null;
    locationSelect?: string | null;
    locationClickSelect?: string | null;
    categorySelect?: string | null;
    categoryClickSelect?: string | null;
    typingInput?: string | null;
    submitFormButton?: string | null;
    scrollToContainer?: string | null;
    nextPageButton?: string | null;
    showMoreJobsOnPage?: string | null;
    jobContainer?: string | null;
    jobTitle?: string | null;
    jobLocation?: string | null;
    jobRemoteOrHybrid?: string | null;
    jobDatePosted?: string | null;
    jobDescription?: string | null;
    jobDetailsAnchorHref?: string | null;
};
export type InstructionsUpdateWithoutCompanyInput = {
    careersButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    careersHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loadMoreButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorySelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    typingInput?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitFormButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scrollToContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextPageButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    showMoreJobsOnPage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobTitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobRemoteOrHybrid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDatePosted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDetailsAnchorHref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type InstructionsUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    careersButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    careersHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loadMoreButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorySelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    typingInput?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitFormButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scrollToContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextPageButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    showMoreJobsOnPage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobTitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobRemoteOrHybrid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDatePosted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDetailsAnchorHref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type InstructionsUncheckedUpdateManyWithoutCompanyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    careersButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    careersHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    joinUsHoverButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loadMoreButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    locationClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categorySelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryClickSelect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    typingInput?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submitFormButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scrollToContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    nextPageButton?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    showMoreJobsOnPage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobContainer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobTitle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobRemoteOrHybrid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDatePosted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    jobDetailsAnchorHref?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type InstructionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    careersButton?: boolean;
    careersHoverButton?: boolean;
    joinUsButton?: boolean;
    joinUsHoverButton?: boolean;
    loadMoreButton?: boolean;
    locationSelect?: boolean;
    locationClickSelect?: boolean;
    categorySelect?: boolean;
    categoryClickSelect?: boolean;
    typingInput?: boolean;
    submitFormButton?: boolean;
    scrollToContainer?: boolean;
    nextPageButton?: boolean;
    showMoreJobsOnPage?: boolean;
    jobContainer?: boolean;
    jobTitle?: boolean;
    jobLocation?: boolean;
    jobRemoteOrHybrid?: boolean;
    jobDatePosted?: boolean;
    jobDescription?: boolean;
    jobDetailsAnchorHref?: boolean;
    companyID?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["instructions"]>;
export type InstructionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    careersButton?: boolean;
    careersHoverButton?: boolean;
    joinUsButton?: boolean;
    joinUsHoverButton?: boolean;
    loadMoreButton?: boolean;
    locationSelect?: boolean;
    locationClickSelect?: boolean;
    categorySelect?: boolean;
    categoryClickSelect?: boolean;
    typingInput?: boolean;
    submitFormButton?: boolean;
    scrollToContainer?: boolean;
    nextPageButton?: boolean;
    showMoreJobsOnPage?: boolean;
    jobContainer?: boolean;
    jobTitle?: boolean;
    jobLocation?: boolean;
    jobRemoteOrHybrid?: boolean;
    jobDatePosted?: boolean;
    jobDescription?: boolean;
    jobDetailsAnchorHref?: boolean;
    companyID?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["instructions"]>;
export type InstructionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    careersButton?: boolean;
    careersHoverButton?: boolean;
    joinUsButton?: boolean;
    joinUsHoverButton?: boolean;
    loadMoreButton?: boolean;
    locationSelect?: boolean;
    locationClickSelect?: boolean;
    categorySelect?: boolean;
    categoryClickSelect?: boolean;
    typingInput?: boolean;
    submitFormButton?: boolean;
    scrollToContainer?: boolean;
    nextPageButton?: boolean;
    showMoreJobsOnPage?: boolean;
    jobContainer?: boolean;
    jobTitle?: boolean;
    jobLocation?: boolean;
    jobRemoteOrHybrid?: boolean;
    jobDatePosted?: boolean;
    jobDescription?: boolean;
    jobDetailsAnchorHref?: boolean;
    companyID?: boolean;
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["instructions"]>;
export type InstructionsSelectScalar = {
    id?: boolean;
    careersButton?: boolean;
    careersHoverButton?: boolean;
    joinUsButton?: boolean;
    joinUsHoverButton?: boolean;
    loadMoreButton?: boolean;
    locationSelect?: boolean;
    locationClickSelect?: boolean;
    categorySelect?: boolean;
    categoryClickSelect?: boolean;
    typingInput?: boolean;
    submitFormButton?: boolean;
    scrollToContainer?: boolean;
    nextPageButton?: boolean;
    showMoreJobsOnPage?: boolean;
    jobContainer?: boolean;
    jobTitle?: boolean;
    jobLocation?: boolean;
    jobRemoteOrHybrid?: boolean;
    jobDatePosted?: boolean;
    jobDescription?: boolean;
    jobDetailsAnchorHref?: boolean;
    companyID?: boolean;
};
export type InstructionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "careersButton" | "careersHoverButton" | "joinUsButton" | "joinUsHoverButton" | "loadMoreButton" | "locationSelect" | "locationClickSelect" | "categorySelect" | "categoryClickSelect" | "typingInput" | "submitFormButton" | "scrollToContainer" | "nextPageButton" | "showMoreJobsOnPage" | "jobContainer" | "jobTitle" | "jobLocation" | "jobRemoteOrHybrid" | "jobDatePosted" | "jobDescription" | "jobDetailsAnchorHref" | "companyID", ExtArgs["result"]["instructions"]>;
export type InstructionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type InstructionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type InstructionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    company?: boolean | Prisma.CompanyDefaultArgs<ExtArgs>;
};
export type $InstructionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Instructions";
    objects: {
        company: Prisma.$CompanyPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        careersButton: string | null;
        careersHoverButton: string | null;
        joinUsButton: string | null;
        joinUsHoverButton: string | null;
        loadMoreButton: string | null;
        locationSelect: string | null;
        locationClickSelect: string | null;
        categorySelect: string | null;
        categoryClickSelect: string | null;
        typingInput: string | null;
        submitFormButton: string | null;
        scrollToContainer: string | null;
        nextPageButton: string | null;
        showMoreJobsOnPage: string | null;
        jobContainer: string | null;
        jobTitle: string | null;
        jobLocation: string | null;
        jobRemoteOrHybrid: string | null;
        jobDatePosted: string | null;
        jobDescription: string | null;
        jobDetailsAnchorHref: string | null;
        companyID: number;
    }, ExtArgs["result"]["instructions"]>;
    composites: {};
};
export type InstructionsGetPayload<S extends boolean | null | undefined | InstructionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InstructionsPayload, S>;
export type InstructionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InstructionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InstructionsCountAggregateInputType | true;
};
export interface InstructionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Instructions'];
        meta: {
            name: 'Instructions';
        };
    };
    /**
     * Find zero or one Instructions that matches the filter.
     * @param {InstructionsFindUniqueArgs} args - Arguments to find a Instructions
     * @example
     * // Get one Instructions
     * const instructions = await prisma.instructions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstructionsFindUniqueArgs>(args: Prisma.SelectSubset<T, InstructionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InstructionsClient<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Instructions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InstructionsFindUniqueOrThrowArgs} args - Arguments to find a Instructions
     * @example
     * // Get one Instructions
     * const instructions = await prisma.instructions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstructionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InstructionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstructionsClient<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Instructions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsFindFirstArgs} args - Arguments to find a Instructions
     * @example
     * // Get one Instructions
     * const instructions = await prisma.instructions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstructionsFindFirstArgs>(args?: Prisma.SelectSubset<T, InstructionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__InstructionsClient<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Instructions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsFindFirstOrThrowArgs} args - Arguments to find a Instructions
     * @example
     * // Get one Instructions
     * const instructions = await prisma.instructions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstructionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InstructionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstructionsClient<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Instructions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Instructions
     * const instructions = await prisma.instructions.findMany()
     *
     * // Get first 10 Instructions
     * const instructions = await prisma.instructions.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const instructionsWithIdOnly = await prisma.instructions.findMany({ select: { id: true } })
     *
     */
    findMany<T extends InstructionsFindManyArgs>(args?: Prisma.SelectSubset<T, InstructionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Instructions.
     * @param {InstructionsCreateArgs} args - Arguments to create a Instructions.
     * @example
     * // Create one Instructions
     * const Instructions = await prisma.instructions.create({
     *   data: {
     *     // ... data to create a Instructions
     *   }
     * })
     *
     */
    create<T extends InstructionsCreateArgs>(args: Prisma.SelectSubset<T, InstructionsCreateArgs<ExtArgs>>): Prisma.Prisma__InstructionsClient<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Instructions.
     * @param {InstructionsCreateManyArgs} args - Arguments to create many Instructions.
     * @example
     * // Create many Instructions
     * const instructions = await prisma.instructions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends InstructionsCreateManyArgs>(args?: Prisma.SelectSubset<T, InstructionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Instructions and returns the data saved in the database.
     * @param {InstructionsCreateManyAndReturnArgs} args - Arguments to create many Instructions.
     * @example
     * // Create many Instructions
     * const instructions = await prisma.instructions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Instructions and only return the `id`
     * const instructionsWithIdOnly = await prisma.instructions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends InstructionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InstructionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Instructions.
     * @param {InstructionsDeleteArgs} args - Arguments to delete one Instructions.
     * @example
     * // Delete one Instructions
     * const Instructions = await prisma.instructions.delete({
     *   where: {
     *     // ... filter to delete one Instructions
     *   }
     * })
     *
     */
    delete<T extends InstructionsDeleteArgs>(args: Prisma.SelectSubset<T, InstructionsDeleteArgs<ExtArgs>>): Prisma.Prisma__InstructionsClient<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Instructions.
     * @param {InstructionsUpdateArgs} args - Arguments to update one Instructions.
     * @example
     * // Update one Instructions
     * const instructions = await prisma.instructions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends InstructionsUpdateArgs>(args: Prisma.SelectSubset<T, InstructionsUpdateArgs<ExtArgs>>): Prisma.Prisma__InstructionsClient<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Instructions.
     * @param {InstructionsDeleteManyArgs} args - Arguments to filter Instructions to delete.
     * @example
     * // Delete a few Instructions
     * const { count } = await prisma.instructions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends InstructionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, InstructionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Instructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Instructions
     * const instructions = await prisma.instructions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends InstructionsUpdateManyArgs>(args: Prisma.SelectSubset<T, InstructionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Instructions and returns the data updated in the database.
     * @param {InstructionsUpdateManyAndReturnArgs} args - Arguments to update many Instructions.
     * @example
     * // Update many Instructions
     * const instructions = await prisma.instructions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Instructions and only return the `id`
     * const instructionsWithIdOnly = await prisma.instructions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends InstructionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InstructionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Instructions.
     * @param {InstructionsUpsertArgs} args - Arguments to update or create a Instructions.
     * @example
     * // Update or create a Instructions
     * const instructions = await prisma.instructions.upsert({
     *   create: {
     *     // ... data to create a Instructions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Instructions we want to update
     *   }
     * })
     */
    upsert<T extends InstructionsUpsertArgs>(args: Prisma.SelectSubset<T, InstructionsUpsertArgs<ExtArgs>>): Prisma.Prisma__InstructionsClient<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Instructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsCountArgs} args - Arguments to filter Instructions to count.
     * @example
     * // Count the number of Instructions
     * const count = await prisma.instructions.count({
     *   where: {
     *     // ... the filter for the Instructions we want to count
     *   }
     * })
    **/
    count<T extends InstructionsCountArgs>(args?: Prisma.Subset<T, InstructionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InstructionsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Instructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstructionsAggregateArgs>(args: Prisma.Subset<T, InstructionsAggregateArgs>): Prisma.PrismaPromise<GetInstructionsAggregateType<T>>;
    /**
     * Group by Instructions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends InstructionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InstructionsGroupByArgs['orderBy'];
    } : {
        orderBy?: InstructionsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InstructionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstructionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Instructions model
     */
    readonly fields: InstructionsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Instructions.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__InstructionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    company<T extends Prisma.CompanyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CompanyDefaultArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Instructions model
 */
export interface InstructionsFieldRefs {
    readonly id: Prisma.FieldRef<"Instructions", 'Int'>;
    readonly careersButton: Prisma.FieldRef<"Instructions", 'String'>;
    readonly careersHoverButton: Prisma.FieldRef<"Instructions", 'String'>;
    readonly joinUsButton: Prisma.FieldRef<"Instructions", 'String'>;
    readonly joinUsHoverButton: Prisma.FieldRef<"Instructions", 'String'>;
    readonly loadMoreButton: Prisma.FieldRef<"Instructions", 'String'>;
    readonly locationSelect: Prisma.FieldRef<"Instructions", 'String'>;
    readonly locationClickSelect: Prisma.FieldRef<"Instructions", 'String'>;
    readonly categorySelect: Prisma.FieldRef<"Instructions", 'String'>;
    readonly categoryClickSelect: Prisma.FieldRef<"Instructions", 'String'>;
    readonly typingInput: Prisma.FieldRef<"Instructions", 'String'>;
    readonly submitFormButton: Prisma.FieldRef<"Instructions", 'String'>;
    readonly scrollToContainer: Prisma.FieldRef<"Instructions", 'String'>;
    readonly nextPageButton: Prisma.FieldRef<"Instructions", 'String'>;
    readonly showMoreJobsOnPage: Prisma.FieldRef<"Instructions", 'String'>;
    readonly jobContainer: Prisma.FieldRef<"Instructions", 'String'>;
    readonly jobTitle: Prisma.FieldRef<"Instructions", 'String'>;
    readonly jobLocation: Prisma.FieldRef<"Instructions", 'String'>;
    readonly jobRemoteOrHybrid: Prisma.FieldRef<"Instructions", 'String'>;
    readonly jobDatePosted: Prisma.FieldRef<"Instructions", 'String'>;
    readonly jobDescription: Prisma.FieldRef<"Instructions", 'String'>;
    readonly jobDetailsAnchorHref: Prisma.FieldRef<"Instructions", 'String'>;
    readonly companyID: Prisma.FieldRef<"Instructions", 'Int'>;
}
/**
 * Instructions findUnique
 */
export type InstructionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where: Prisma.InstructionsWhereUniqueInput;
};
/**
 * Instructions findUniqueOrThrow
 */
export type InstructionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where: Prisma.InstructionsWhereUniqueInput;
};
/**
 * Instructions findFirst
 */
export type InstructionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where?: Prisma.InstructionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Instructions to fetch.
     */
    orderBy?: Prisma.InstructionsOrderByWithRelationInput | Prisma.InstructionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Instructions.
     */
    cursor?: Prisma.InstructionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Instructions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Instructions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Instructions.
     */
    distinct?: Prisma.InstructionsScalarFieldEnum | Prisma.InstructionsScalarFieldEnum[];
};
/**
 * Instructions findFirstOrThrow
 */
export type InstructionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where?: Prisma.InstructionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Instructions to fetch.
     */
    orderBy?: Prisma.InstructionsOrderByWithRelationInput | Prisma.InstructionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Instructions.
     */
    cursor?: Prisma.InstructionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Instructions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Instructions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Instructions.
     */
    distinct?: Prisma.InstructionsScalarFieldEnum | Prisma.InstructionsScalarFieldEnum[];
};
/**
 * Instructions findMany
 */
export type InstructionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
    /**
     * Filter, which Instructions to fetch.
     */
    where?: Prisma.InstructionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Instructions to fetch.
     */
    orderBy?: Prisma.InstructionsOrderByWithRelationInput | Prisma.InstructionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Instructions.
     */
    cursor?: Prisma.InstructionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Instructions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Instructions.
     */
    skip?: number;
    distinct?: Prisma.InstructionsScalarFieldEnum | Prisma.InstructionsScalarFieldEnum[];
};
/**
 * Instructions create
 */
export type InstructionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
    /**
     * The data needed to create a Instructions.
     */
    data: Prisma.XOR<Prisma.InstructionsCreateInput, Prisma.InstructionsUncheckedCreateInput>;
};
/**
 * Instructions createMany
 */
export type InstructionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Instructions.
     */
    data: Prisma.InstructionsCreateManyInput | Prisma.InstructionsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Instructions createManyAndReturn
 */
export type InstructionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * The data used to create many Instructions.
     */
    data: Prisma.InstructionsCreateManyInput | Prisma.InstructionsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Instructions update
 */
export type InstructionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
    /**
     * The data needed to update a Instructions.
     */
    data: Prisma.XOR<Prisma.InstructionsUpdateInput, Prisma.InstructionsUncheckedUpdateInput>;
    /**
     * Choose, which Instructions to update.
     */
    where: Prisma.InstructionsWhereUniqueInput;
};
/**
 * Instructions updateMany
 */
export type InstructionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Instructions.
     */
    data: Prisma.XOR<Prisma.InstructionsUpdateManyMutationInput, Prisma.InstructionsUncheckedUpdateManyInput>;
    /**
     * Filter which Instructions to update
     */
    where?: Prisma.InstructionsWhereInput;
    /**
     * Limit how many Instructions to update.
     */
    limit?: number;
};
/**
 * Instructions updateManyAndReturn
 */
export type InstructionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * The data used to update Instructions.
     */
    data: Prisma.XOR<Prisma.InstructionsUpdateManyMutationInput, Prisma.InstructionsUncheckedUpdateManyInput>;
    /**
     * Filter which Instructions to update
     */
    where?: Prisma.InstructionsWhereInput;
    /**
     * Limit how many Instructions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Instructions upsert
 */
export type InstructionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
    /**
     * The filter to search for the Instructions to update in case it exists.
     */
    where: Prisma.InstructionsWhereUniqueInput;
    /**
     * In case the Instructions found by the `where` argument doesn't exist, create a new Instructions with this data.
     */
    create: Prisma.XOR<Prisma.InstructionsCreateInput, Prisma.InstructionsUncheckedCreateInput>;
    /**
     * In case the Instructions was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.InstructionsUpdateInput, Prisma.InstructionsUncheckedUpdateInput>;
};
/**
 * Instructions delete
 */
export type InstructionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
    /**
     * Filter which Instructions to delete.
     */
    where: Prisma.InstructionsWhereUniqueInput;
};
/**
 * Instructions deleteMany
 */
export type InstructionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Instructions to delete
     */
    where?: Prisma.InstructionsWhereInput;
    /**
     * Limit how many Instructions to delete.
     */
    limit?: number;
};
/**
 * Instructions without action
 */
export type InstructionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructions
     */
    select?: Prisma.InstructionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Instructions
     */
    omit?: Prisma.InstructionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InstructionsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Instructions.d.ts.map