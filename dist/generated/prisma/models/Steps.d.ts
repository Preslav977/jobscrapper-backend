import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Steps
 *
 */
export type StepsModel = runtime.Types.Result.DefaultSelection<Prisma.$StepsPayload>;
export type AggregateSteps = {
    _count: StepsCountAggregateOutputType | null;
    _avg: StepsAvgAggregateOutputType | null;
    _sum: StepsSumAggregateOutputType | null;
    _min: StepsMinAggregateOutputType | null;
    _max: StepsMaxAggregateOutputType | null;
};
export type StepsAvgAggregateOutputType = {
    id: number | null;
    order: number | null;
    instructionsID: number | null;
    companyID: number | null;
};
export type StepsSumAggregateOutputType = {
    id: number | null;
    order: number | null;
    instructionsID: number | null;
    companyID: number | null;
};
export type StepsMinAggregateOutputType = {
    id: number | null;
    order: number | null;
    action: string | null;
    selector: string | null;
    instructionsID: number | null;
    companyID: number | null;
};
export type StepsMaxAggregateOutputType = {
    id: number | null;
    order: number | null;
    action: string | null;
    selector: string | null;
    instructionsID: number | null;
    companyID: number | null;
};
export type StepsCountAggregateOutputType = {
    id: number;
    order: number;
    action: number;
    selector: number;
    instructionsID: number;
    companyID: number;
    _all: number;
};
export type StepsAvgAggregateInputType = {
    id?: true;
    order?: true;
    instructionsID?: true;
    companyID?: true;
};
export type StepsSumAggregateInputType = {
    id?: true;
    order?: true;
    instructionsID?: true;
    companyID?: true;
};
export type StepsMinAggregateInputType = {
    id?: true;
    order?: true;
    action?: true;
    selector?: true;
    instructionsID?: true;
    companyID?: true;
};
export type StepsMaxAggregateInputType = {
    id?: true;
    order?: true;
    action?: true;
    selector?: true;
    instructionsID?: true;
    companyID?: true;
};
export type StepsCountAggregateInputType = {
    id?: true;
    order?: true;
    action?: true;
    selector?: true;
    instructionsID?: true;
    companyID?: true;
    _all?: true;
};
export type StepsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Steps to aggregate.
     */
    where?: Prisma.StepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Steps to fetch.
     */
    orderBy?: Prisma.StepsOrderByWithRelationInput | Prisma.StepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Steps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Steps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Steps
    **/
    _count?: true | StepsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: StepsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: StepsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StepsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StepsMaxAggregateInputType;
};
export type GetStepsAggregateType<T extends StepsAggregateArgs> = {
    [P in keyof T & keyof AggregateSteps]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSteps[P]> : Prisma.GetScalarType<T[P], AggregateSteps[P]>;
};
export type StepsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StepsWhereInput;
    orderBy?: Prisma.StepsOrderByWithAggregationInput | Prisma.StepsOrderByWithAggregationInput[];
    by: Prisma.StepsScalarFieldEnum[] | Prisma.StepsScalarFieldEnum;
    having?: Prisma.StepsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StepsCountAggregateInputType | true;
    _avg?: StepsAvgAggregateInputType;
    _sum?: StepsSumAggregateInputType;
    _min?: StepsMinAggregateInputType;
    _max?: StepsMaxAggregateInputType;
};
export type StepsGroupByOutputType = {
    id: number;
    order: number;
    action: string;
    selector: string;
    instructionsID: number;
    companyID: number | null;
    _count: StepsCountAggregateOutputType | null;
    _avg: StepsAvgAggregateOutputType | null;
    _sum: StepsSumAggregateOutputType | null;
    _min: StepsMinAggregateOutputType | null;
    _max: StepsMaxAggregateOutputType | null;
};
type GetStepsGroupByPayload<T extends StepsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StepsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StepsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StepsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StepsGroupByOutputType[P]>;
}>>;
export type StepsWhereInput = {
    AND?: Prisma.StepsWhereInput | Prisma.StepsWhereInput[];
    OR?: Prisma.StepsWhereInput[];
    NOT?: Prisma.StepsWhereInput | Prisma.StepsWhereInput[];
    id?: Prisma.IntFilter<"Steps"> | number;
    order?: Prisma.IntFilter<"Steps"> | number;
    action?: Prisma.StringFilter<"Steps"> | string;
    selector?: Prisma.StringFilter<"Steps"> | string;
    instructionsID?: Prisma.IntFilter<"Steps"> | number;
    companyID?: Prisma.IntNullableFilter<"Steps"> | number | null;
    instructions?: Prisma.XOR<Prisma.InstructionsScalarRelationFilter, Prisma.InstructionsWhereInput>;
    company?: Prisma.XOR<Prisma.CompanyNullableScalarRelationFilter, Prisma.CompanyWhereInput> | null;
};
export type StepsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    selector?: Prisma.SortOrder;
    instructionsID?: Prisma.SortOrder;
    companyID?: Prisma.SortOrderInput | Prisma.SortOrder;
    instructions?: Prisma.InstructionsOrderByWithRelationInput;
    company?: Prisma.CompanyOrderByWithRelationInput;
};
export type StepsWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.StepsWhereInput | Prisma.StepsWhereInput[];
    OR?: Prisma.StepsWhereInput[];
    NOT?: Prisma.StepsWhereInput | Prisma.StepsWhereInput[];
    order?: Prisma.IntFilter<"Steps"> | number;
    action?: Prisma.StringFilter<"Steps"> | string;
    selector?: Prisma.StringFilter<"Steps"> | string;
    instructionsID?: Prisma.IntFilter<"Steps"> | number;
    companyID?: Prisma.IntNullableFilter<"Steps"> | number | null;
    instructions?: Prisma.XOR<Prisma.InstructionsScalarRelationFilter, Prisma.InstructionsWhereInput>;
    company?: Prisma.XOR<Prisma.CompanyNullableScalarRelationFilter, Prisma.CompanyWhereInput> | null;
}, "id">;
export type StepsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    selector?: Prisma.SortOrder;
    instructionsID?: Prisma.SortOrder;
    companyID?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StepsCountOrderByAggregateInput;
    _avg?: Prisma.StepsAvgOrderByAggregateInput;
    _max?: Prisma.StepsMaxOrderByAggregateInput;
    _min?: Prisma.StepsMinOrderByAggregateInput;
    _sum?: Prisma.StepsSumOrderByAggregateInput;
};
export type StepsScalarWhereWithAggregatesInput = {
    AND?: Prisma.StepsScalarWhereWithAggregatesInput | Prisma.StepsScalarWhereWithAggregatesInput[];
    OR?: Prisma.StepsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StepsScalarWhereWithAggregatesInput | Prisma.StepsScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Steps"> | number;
    order?: Prisma.IntWithAggregatesFilter<"Steps"> | number;
    action?: Prisma.StringWithAggregatesFilter<"Steps"> | string;
    selector?: Prisma.StringWithAggregatesFilter<"Steps"> | string;
    instructionsID?: Prisma.IntWithAggregatesFilter<"Steps"> | number;
    companyID?: Prisma.IntNullableWithAggregatesFilter<"Steps"> | number | null;
};
export type StepsCreateInput = {
    order: number;
    action: string;
    selector: string;
    instructions: Prisma.InstructionsCreateNestedOneWithoutStepsInput;
    company?: Prisma.CompanyCreateNestedOneWithoutStepsInput;
};
export type StepsUncheckedCreateInput = {
    id?: number;
    order: number;
    action: string;
    selector: string;
    instructionsID: number;
    companyID?: number | null;
};
export type StepsUpdateInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.InstructionsUpdateOneRequiredWithoutStepsNestedInput;
    company?: Prisma.CompanyUpdateOneWithoutStepsNestedInput;
};
export type StepsUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
    instructionsID?: Prisma.IntFieldUpdateOperationsInput | number;
    companyID?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type StepsCreateManyInput = {
    id?: number;
    order: number;
    action: string;
    selector: string;
    instructionsID: number;
    companyID?: number | null;
};
export type StepsUpdateManyMutationInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StepsUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
    instructionsID?: Prisma.IntFieldUpdateOperationsInput | number;
    companyID?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type StepsListRelationFilter = {
    every?: Prisma.StepsWhereInput;
    some?: Prisma.StepsWhereInput;
    none?: Prisma.StepsWhereInput;
};
export type StepsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StepsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    selector?: Prisma.SortOrder;
    instructionsID?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type StepsAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    instructionsID?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type StepsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    selector?: Prisma.SortOrder;
    instructionsID?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type StepsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    selector?: Prisma.SortOrder;
    instructionsID?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type StepsSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    instructionsID?: Prisma.SortOrder;
    companyID?: Prisma.SortOrder;
};
export type StepsCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.StepsCreateWithoutCompanyInput, Prisma.StepsUncheckedCreateWithoutCompanyInput> | Prisma.StepsCreateWithoutCompanyInput[] | Prisma.StepsUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.StepsCreateOrConnectWithoutCompanyInput | Prisma.StepsCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.StepsCreateManyCompanyInputEnvelope;
    connect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
};
export type StepsUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: Prisma.XOR<Prisma.StepsCreateWithoutCompanyInput, Prisma.StepsUncheckedCreateWithoutCompanyInput> | Prisma.StepsCreateWithoutCompanyInput[] | Prisma.StepsUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.StepsCreateOrConnectWithoutCompanyInput | Prisma.StepsCreateOrConnectWithoutCompanyInput[];
    createMany?: Prisma.StepsCreateManyCompanyInputEnvelope;
    connect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
};
export type StepsUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.StepsCreateWithoutCompanyInput, Prisma.StepsUncheckedCreateWithoutCompanyInput> | Prisma.StepsCreateWithoutCompanyInput[] | Prisma.StepsUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.StepsCreateOrConnectWithoutCompanyInput | Prisma.StepsCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.StepsUpsertWithWhereUniqueWithoutCompanyInput | Prisma.StepsUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.StepsCreateManyCompanyInputEnvelope;
    set?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    disconnect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    delete?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    connect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    update?: Prisma.StepsUpdateWithWhereUniqueWithoutCompanyInput | Prisma.StepsUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.StepsUpdateManyWithWhereWithoutCompanyInput | Prisma.StepsUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.StepsScalarWhereInput | Prisma.StepsScalarWhereInput[];
};
export type StepsUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: Prisma.XOR<Prisma.StepsCreateWithoutCompanyInput, Prisma.StepsUncheckedCreateWithoutCompanyInput> | Prisma.StepsCreateWithoutCompanyInput[] | Prisma.StepsUncheckedCreateWithoutCompanyInput[];
    connectOrCreate?: Prisma.StepsCreateOrConnectWithoutCompanyInput | Prisma.StepsCreateOrConnectWithoutCompanyInput[];
    upsert?: Prisma.StepsUpsertWithWhereUniqueWithoutCompanyInput | Prisma.StepsUpsertWithWhereUniqueWithoutCompanyInput[];
    createMany?: Prisma.StepsCreateManyCompanyInputEnvelope;
    set?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    disconnect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    delete?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    connect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    update?: Prisma.StepsUpdateWithWhereUniqueWithoutCompanyInput | Prisma.StepsUpdateWithWhereUniqueWithoutCompanyInput[];
    updateMany?: Prisma.StepsUpdateManyWithWhereWithoutCompanyInput | Prisma.StepsUpdateManyWithWhereWithoutCompanyInput[];
    deleteMany?: Prisma.StepsScalarWhereInput | Prisma.StepsScalarWhereInput[];
};
export type StepsCreateNestedManyWithoutInstructionsInput = {
    create?: Prisma.XOR<Prisma.StepsCreateWithoutInstructionsInput, Prisma.StepsUncheckedCreateWithoutInstructionsInput> | Prisma.StepsCreateWithoutInstructionsInput[] | Prisma.StepsUncheckedCreateWithoutInstructionsInput[];
    connectOrCreate?: Prisma.StepsCreateOrConnectWithoutInstructionsInput | Prisma.StepsCreateOrConnectWithoutInstructionsInput[];
    createMany?: Prisma.StepsCreateManyInstructionsInputEnvelope;
    connect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
};
export type StepsUncheckedCreateNestedManyWithoutInstructionsInput = {
    create?: Prisma.XOR<Prisma.StepsCreateWithoutInstructionsInput, Prisma.StepsUncheckedCreateWithoutInstructionsInput> | Prisma.StepsCreateWithoutInstructionsInput[] | Prisma.StepsUncheckedCreateWithoutInstructionsInput[];
    connectOrCreate?: Prisma.StepsCreateOrConnectWithoutInstructionsInput | Prisma.StepsCreateOrConnectWithoutInstructionsInput[];
    createMany?: Prisma.StepsCreateManyInstructionsInputEnvelope;
    connect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
};
export type StepsUpdateManyWithoutInstructionsNestedInput = {
    create?: Prisma.XOR<Prisma.StepsCreateWithoutInstructionsInput, Prisma.StepsUncheckedCreateWithoutInstructionsInput> | Prisma.StepsCreateWithoutInstructionsInput[] | Prisma.StepsUncheckedCreateWithoutInstructionsInput[];
    connectOrCreate?: Prisma.StepsCreateOrConnectWithoutInstructionsInput | Prisma.StepsCreateOrConnectWithoutInstructionsInput[];
    upsert?: Prisma.StepsUpsertWithWhereUniqueWithoutInstructionsInput | Prisma.StepsUpsertWithWhereUniqueWithoutInstructionsInput[];
    createMany?: Prisma.StepsCreateManyInstructionsInputEnvelope;
    set?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    disconnect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    delete?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    connect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    update?: Prisma.StepsUpdateWithWhereUniqueWithoutInstructionsInput | Prisma.StepsUpdateWithWhereUniqueWithoutInstructionsInput[];
    updateMany?: Prisma.StepsUpdateManyWithWhereWithoutInstructionsInput | Prisma.StepsUpdateManyWithWhereWithoutInstructionsInput[];
    deleteMany?: Prisma.StepsScalarWhereInput | Prisma.StepsScalarWhereInput[];
};
export type StepsUncheckedUpdateManyWithoutInstructionsNestedInput = {
    create?: Prisma.XOR<Prisma.StepsCreateWithoutInstructionsInput, Prisma.StepsUncheckedCreateWithoutInstructionsInput> | Prisma.StepsCreateWithoutInstructionsInput[] | Prisma.StepsUncheckedCreateWithoutInstructionsInput[];
    connectOrCreate?: Prisma.StepsCreateOrConnectWithoutInstructionsInput | Prisma.StepsCreateOrConnectWithoutInstructionsInput[];
    upsert?: Prisma.StepsUpsertWithWhereUniqueWithoutInstructionsInput | Prisma.StepsUpsertWithWhereUniqueWithoutInstructionsInput[];
    createMany?: Prisma.StepsCreateManyInstructionsInputEnvelope;
    set?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    disconnect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    delete?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    connect?: Prisma.StepsWhereUniqueInput | Prisma.StepsWhereUniqueInput[];
    update?: Prisma.StepsUpdateWithWhereUniqueWithoutInstructionsInput | Prisma.StepsUpdateWithWhereUniqueWithoutInstructionsInput[];
    updateMany?: Prisma.StepsUpdateManyWithWhereWithoutInstructionsInput | Prisma.StepsUpdateManyWithWhereWithoutInstructionsInput[];
    deleteMany?: Prisma.StepsScalarWhereInput | Prisma.StepsScalarWhereInput[];
};
export type StepsCreateWithoutCompanyInput = {
    order: number;
    action: string;
    selector: string;
    instructions: Prisma.InstructionsCreateNestedOneWithoutStepsInput;
};
export type StepsUncheckedCreateWithoutCompanyInput = {
    id?: number;
    order: number;
    action: string;
    selector: string;
    instructionsID: number;
};
export type StepsCreateOrConnectWithoutCompanyInput = {
    where: Prisma.StepsWhereUniqueInput;
    create: Prisma.XOR<Prisma.StepsCreateWithoutCompanyInput, Prisma.StepsUncheckedCreateWithoutCompanyInput>;
};
export type StepsCreateManyCompanyInputEnvelope = {
    data: Prisma.StepsCreateManyCompanyInput | Prisma.StepsCreateManyCompanyInput[];
    skipDuplicates?: boolean;
};
export type StepsUpsertWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.StepsWhereUniqueInput;
    update: Prisma.XOR<Prisma.StepsUpdateWithoutCompanyInput, Prisma.StepsUncheckedUpdateWithoutCompanyInput>;
    create: Prisma.XOR<Prisma.StepsCreateWithoutCompanyInput, Prisma.StepsUncheckedCreateWithoutCompanyInput>;
};
export type StepsUpdateWithWhereUniqueWithoutCompanyInput = {
    where: Prisma.StepsWhereUniqueInput;
    data: Prisma.XOR<Prisma.StepsUpdateWithoutCompanyInput, Prisma.StepsUncheckedUpdateWithoutCompanyInput>;
};
export type StepsUpdateManyWithWhereWithoutCompanyInput = {
    where: Prisma.StepsScalarWhereInput;
    data: Prisma.XOR<Prisma.StepsUpdateManyMutationInput, Prisma.StepsUncheckedUpdateManyWithoutCompanyInput>;
};
export type StepsScalarWhereInput = {
    AND?: Prisma.StepsScalarWhereInput | Prisma.StepsScalarWhereInput[];
    OR?: Prisma.StepsScalarWhereInput[];
    NOT?: Prisma.StepsScalarWhereInput | Prisma.StepsScalarWhereInput[];
    id?: Prisma.IntFilter<"Steps"> | number;
    order?: Prisma.IntFilter<"Steps"> | number;
    action?: Prisma.StringFilter<"Steps"> | string;
    selector?: Prisma.StringFilter<"Steps"> | string;
    instructionsID?: Prisma.IntFilter<"Steps"> | number;
    companyID?: Prisma.IntNullableFilter<"Steps"> | number | null;
};
export type StepsCreateWithoutInstructionsInput = {
    order: number;
    action: string;
    selector: string;
    company?: Prisma.CompanyCreateNestedOneWithoutStepsInput;
};
export type StepsUncheckedCreateWithoutInstructionsInput = {
    id?: number;
    order: number;
    action: string;
    selector: string;
    companyID?: number | null;
};
export type StepsCreateOrConnectWithoutInstructionsInput = {
    where: Prisma.StepsWhereUniqueInput;
    create: Prisma.XOR<Prisma.StepsCreateWithoutInstructionsInput, Prisma.StepsUncheckedCreateWithoutInstructionsInput>;
};
export type StepsCreateManyInstructionsInputEnvelope = {
    data: Prisma.StepsCreateManyInstructionsInput | Prisma.StepsCreateManyInstructionsInput[];
    skipDuplicates?: boolean;
};
export type StepsUpsertWithWhereUniqueWithoutInstructionsInput = {
    where: Prisma.StepsWhereUniqueInput;
    update: Prisma.XOR<Prisma.StepsUpdateWithoutInstructionsInput, Prisma.StepsUncheckedUpdateWithoutInstructionsInput>;
    create: Prisma.XOR<Prisma.StepsCreateWithoutInstructionsInput, Prisma.StepsUncheckedCreateWithoutInstructionsInput>;
};
export type StepsUpdateWithWhereUniqueWithoutInstructionsInput = {
    where: Prisma.StepsWhereUniqueInput;
    data: Prisma.XOR<Prisma.StepsUpdateWithoutInstructionsInput, Prisma.StepsUncheckedUpdateWithoutInstructionsInput>;
};
export type StepsUpdateManyWithWhereWithoutInstructionsInput = {
    where: Prisma.StepsScalarWhereInput;
    data: Prisma.XOR<Prisma.StepsUpdateManyMutationInput, Prisma.StepsUncheckedUpdateManyWithoutInstructionsInput>;
};
export type StepsCreateManyCompanyInput = {
    id?: number;
    order: number;
    action: string;
    selector: string;
    instructionsID: number;
};
export type StepsUpdateWithoutCompanyInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
    instructions?: Prisma.InstructionsUpdateOneRequiredWithoutStepsNestedInput;
};
export type StepsUncheckedUpdateWithoutCompanyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
    instructionsID?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type StepsUncheckedUpdateManyWithoutCompanyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
    instructionsID?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type StepsCreateManyInstructionsInput = {
    id?: number;
    order: number;
    action: string;
    selector: string;
    companyID?: number | null;
};
export type StepsUpdateWithoutInstructionsInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
    company?: Prisma.CompanyUpdateOneWithoutStepsNestedInput;
};
export type StepsUncheckedUpdateWithoutInstructionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
    companyID?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type StepsUncheckedUpdateManyWithoutInstructionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    selector?: Prisma.StringFieldUpdateOperationsInput | string;
    companyID?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
};
export type StepsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    order?: boolean;
    action?: boolean;
    selector?: boolean;
    instructionsID?: boolean;
    companyID?: boolean;
    instructions?: boolean | Prisma.InstructionsDefaultArgs<ExtArgs>;
    company?: boolean | Prisma.Steps$companyArgs<ExtArgs>;
}, ExtArgs["result"]["steps"]>;
export type StepsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    order?: boolean;
    action?: boolean;
    selector?: boolean;
    instructionsID?: boolean;
    companyID?: boolean;
    instructions?: boolean | Prisma.InstructionsDefaultArgs<ExtArgs>;
    company?: boolean | Prisma.Steps$companyArgs<ExtArgs>;
}, ExtArgs["result"]["steps"]>;
export type StepsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    order?: boolean;
    action?: boolean;
    selector?: boolean;
    instructionsID?: boolean;
    companyID?: boolean;
    instructions?: boolean | Prisma.InstructionsDefaultArgs<ExtArgs>;
    company?: boolean | Prisma.Steps$companyArgs<ExtArgs>;
}, ExtArgs["result"]["steps"]>;
export type StepsSelectScalar = {
    id?: boolean;
    order?: boolean;
    action?: boolean;
    selector?: boolean;
    instructionsID?: boolean;
    companyID?: boolean;
};
export type StepsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "order" | "action" | "selector" | "instructionsID" | "companyID", ExtArgs["result"]["steps"]>;
export type StepsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    instructions?: boolean | Prisma.InstructionsDefaultArgs<ExtArgs>;
    company?: boolean | Prisma.Steps$companyArgs<ExtArgs>;
};
export type StepsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    instructions?: boolean | Prisma.InstructionsDefaultArgs<ExtArgs>;
    company?: boolean | Prisma.Steps$companyArgs<ExtArgs>;
};
export type StepsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    instructions?: boolean | Prisma.InstructionsDefaultArgs<ExtArgs>;
    company?: boolean | Prisma.Steps$companyArgs<ExtArgs>;
};
export type $StepsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Steps";
    objects: {
        instructions: Prisma.$InstructionsPayload<ExtArgs>;
        company: Prisma.$CompanyPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        order: number;
        action: string;
        selector: string;
        instructionsID: number;
        companyID: number | null;
    }, ExtArgs["result"]["steps"]>;
    composites: {};
};
export type StepsGetPayload<S extends boolean | null | undefined | StepsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StepsPayload, S>;
export type StepsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StepsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StepsCountAggregateInputType | true;
};
export interface StepsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Steps'];
        meta: {
            name: 'Steps';
        };
    };
    /**
     * Find zero or one Steps that matches the filter.
     * @param {StepsFindUniqueArgs} args - Arguments to find a Steps
     * @example
     * // Get one Steps
     * const steps = await prisma.steps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StepsFindUniqueArgs>(args: Prisma.SelectSubset<T, StepsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StepsClient<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Steps that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StepsFindUniqueOrThrowArgs} args - Arguments to find a Steps
     * @example
     * // Get one Steps
     * const steps = await prisma.steps.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StepsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StepsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StepsClient<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Steps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepsFindFirstArgs} args - Arguments to find a Steps
     * @example
     * // Get one Steps
     * const steps = await prisma.steps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StepsFindFirstArgs>(args?: Prisma.SelectSubset<T, StepsFindFirstArgs<ExtArgs>>): Prisma.Prisma__StepsClient<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Steps that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepsFindFirstOrThrowArgs} args - Arguments to find a Steps
     * @example
     * // Get one Steps
     * const steps = await prisma.steps.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StepsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StepsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StepsClient<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Steps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Steps
     * const steps = await prisma.steps.findMany()
     *
     * // Get first 10 Steps
     * const steps = await prisma.steps.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const stepsWithIdOnly = await prisma.steps.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StepsFindManyArgs>(args?: Prisma.SelectSubset<T, StepsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Steps.
     * @param {StepsCreateArgs} args - Arguments to create a Steps.
     * @example
     * // Create one Steps
     * const Steps = await prisma.steps.create({
     *   data: {
     *     // ... data to create a Steps
     *   }
     * })
     *
     */
    create<T extends StepsCreateArgs>(args: Prisma.SelectSubset<T, StepsCreateArgs<ExtArgs>>): Prisma.Prisma__StepsClient<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Steps.
     * @param {StepsCreateManyArgs} args - Arguments to create many Steps.
     * @example
     * // Create many Steps
     * const steps = await prisma.steps.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StepsCreateManyArgs>(args?: Prisma.SelectSubset<T, StepsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Steps and returns the data saved in the database.
     * @param {StepsCreateManyAndReturnArgs} args - Arguments to create many Steps.
     * @example
     * // Create many Steps
     * const steps = await prisma.steps.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Steps and only return the `id`
     * const stepsWithIdOnly = await prisma.steps.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StepsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StepsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Steps.
     * @param {StepsDeleteArgs} args - Arguments to delete one Steps.
     * @example
     * // Delete one Steps
     * const Steps = await prisma.steps.delete({
     *   where: {
     *     // ... filter to delete one Steps
     *   }
     * })
     *
     */
    delete<T extends StepsDeleteArgs>(args: Prisma.SelectSubset<T, StepsDeleteArgs<ExtArgs>>): Prisma.Prisma__StepsClient<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Steps.
     * @param {StepsUpdateArgs} args - Arguments to update one Steps.
     * @example
     * // Update one Steps
     * const steps = await prisma.steps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StepsUpdateArgs>(args: Prisma.SelectSubset<T, StepsUpdateArgs<ExtArgs>>): Prisma.Prisma__StepsClient<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Steps.
     * @param {StepsDeleteManyArgs} args - Arguments to filter Steps to delete.
     * @example
     * // Delete a few Steps
     * const { count } = await prisma.steps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StepsDeleteManyArgs>(args?: Prisma.SelectSubset<T, StepsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Steps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Steps
     * const steps = await prisma.steps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StepsUpdateManyArgs>(args: Prisma.SelectSubset<T, StepsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Steps and returns the data updated in the database.
     * @param {StepsUpdateManyAndReturnArgs} args - Arguments to update many Steps.
     * @example
     * // Update many Steps
     * const steps = await prisma.steps.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Steps and only return the `id`
     * const stepsWithIdOnly = await prisma.steps.updateManyAndReturn({
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
    updateManyAndReturn<T extends StepsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StepsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Steps.
     * @param {StepsUpsertArgs} args - Arguments to update or create a Steps.
     * @example
     * // Update or create a Steps
     * const steps = await prisma.steps.upsert({
     *   create: {
     *     // ... data to create a Steps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Steps we want to update
     *   }
     * })
     */
    upsert<T extends StepsUpsertArgs>(args: Prisma.SelectSubset<T, StepsUpsertArgs<ExtArgs>>): Prisma.Prisma__StepsClient<runtime.Types.Result.GetResult<Prisma.$StepsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Steps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepsCountArgs} args - Arguments to filter Steps to count.
     * @example
     * // Count the number of Steps
     * const count = await prisma.steps.count({
     *   where: {
     *     // ... the filter for the Steps we want to count
     *   }
     * })
    **/
    count<T extends StepsCountArgs>(args?: Prisma.Subset<T, StepsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StepsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Steps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StepsAggregateArgs>(args: Prisma.Subset<T, StepsAggregateArgs>): Prisma.PrismaPromise<GetStepsAggregateType<T>>;
    /**
     * Group by Steps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends StepsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StepsGroupByArgs['orderBy'];
    } : {
        orderBy?: StepsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StepsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStepsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Steps model
     */
    readonly fields: StepsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Steps.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StepsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    instructions<T extends Prisma.InstructionsDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InstructionsDefaultArgs<ExtArgs>>): Prisma.Prisma__InstructionsClient<runtime.Types.Result.GetResult<Prisma.$InstructionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    company<T extends Prisma.Steps$companyArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Steps$companyArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the Steps model
 */
export interface StepsFieldRefs {
    readonly id: Prisma.FieldRef<"Steps", 'Int'>;
    readonly order: Prisma.FieldRef<"Steps", 'Int'>;
    readonly action: Prisma.FieldRef<"Steps", 'String'>;
    readonly selector: Prisma.FieldRef<"Steps", 'String'>;
    readonly instructionsID: Prisma.FieldRef<"Steps", 'Int'>;
    readonly companyID: Prisma.FieldRef<"Steps", 'Int'>;
}
/**
 * Steps findUnique
 */
export type StepsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
    /**
     * Filter, which Steps to fetch.
     */
    where: Prisma.StepsWhereUniqueInput;
};
/**
 * Steps findUniqueOrThrow
 */
export type StepsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
    /**
     * Filter, which Steps to fetch.
     */
    where: Prisma.StepsWhereUniqueInput;
};
/**
 * Steps findFirst
 */
export type StepsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
    /**
     * Filter, which Steps to fetch.
     */
    where?: Prisma.StepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Steps to fetch.
     */
    orderBy?: Prisma.StepsOrderByWithRelationInput | Prisma.StepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Steps.
     */
    cursor?: Prisma.StepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Steps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Steps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Steps.
     */
    distinct?: Prisma.StepsScalarFieldEnum | Prisma.StepsScalarFieldEnum[];
};
/**
 * Steps findFirstOrThrow
 */
export type StepsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
    /**
     * Filter, which Steps to fetch.
     */
    where?: Prisma.StepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Steps to fetch.
     */
    orderBy?: Prisma.StepsOrderByWithRelationInput | Prisma.StepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Steps.
     */
    cursor?: Prisma.StepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Steps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Steps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Steps.
     */
    distinct?: Prisma.StepsScalarFieldEnum | Prisma.StepsScalarFieldEnum[];
};
/**
 * Steps findMany
 */
export type StepsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
    /**
     * Filter, which Steps to fetch.
     */
    where?: Prisma.StepsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Steps to fetch.
     */
    orderBy?: Prisma.StepsOrderByWithRelationInput | Prisma.StepsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Steps.
     */
    cursor?: Prisma.StepsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Steps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Steps.
     */
    skip?: number;
    distinct?: Prisma.StepsScalarFieldEnum | Prisma.StepsScalarFieldEnum[];
};
/**
 * Steps create
 */
export type StepsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
    /**
     * The data needed to create a Steps.
     */
    data: Prisma.XOR<Prisma.StepsCreateInput, Prisma.StepsUncheckedCreateInput>;
};
/**
 * Steps createMany
 */
export type StepsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Steps.
     */
    data: Prisma.StepsCreateManyInput | Prisma.StepsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Steps createManyAndReturn
 */
export type StepsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * The data used to create many Steps.
     */
    data: Prisma.StepsCreateManyInput | Prisma.StepsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Steps update
 */
export type StepsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
    /**
     * The data needed to update a Steps.
     */
    data: Prisma.XOR<Prisma.StepsUpdateInput, Prisma.StepsUncheckedUpdateInput>;
    /**
     * Choose, which Steps to update.
     */
    where: Prisma.StepsWhereUniqueInput;
};
/**
 * Steps updateMany
 */
export type StepsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Steps.
     */
    data: Prisma.XOR<Prisma.StepsUpdateManyMutationInput, Prisma.StepsUncheckedUpdateManyInput>;
    /**
     * Filter which Steps to update
     */
    where?: Prisma.StepsWhereInput;
    /**
     * Limit how many Steps to update.
     */
    limit?: number;
};
/**
 * Steps updateManyAndReturn
 */
export type StepsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * The data used to update Steps.
     */
    data: Prisma.XOR<Prisma.StepsUpdateManyMutationInput, Prisma.StepsUncheckedUpdateManyInput>;
    /**
     * Filter which Steps to update
     */
    where?: Prisma.StepsWhereInput;
    /**
     * Limit how many Steps to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Steps upsert
 */
export type StepsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
    /**
     * The filter to search for the Steps to update in case it exists.
     */
    where: Prisma.StepsWhereUniqueInput;
    /**
     * In case the Steps found by the `where` argument doesn't exist, create a new Steps with this data.
     */
    create: Prisma.XOR<Prisma.StepsCreateInput, Prisma.StepsUncheckedCreateInput>;
    /**
     * In case the Steps was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StepsUpdateInput, Prisma.StepsUncheckedUpdateInput>;
};
/**
 * Steps delete
 */
export type StepsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
    /**
     * Filter which Steps to delete.
     */
    where: Prisma.StepsWhereUniqueInput;
};
/**
 * Steps deleteMany
 */
export type StepsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Steps to delete
     */
    where?: Prisma.StepsWhereInput;
    /**
     * Limit how many Steps to delete.
     */
    limit?: number;
};
/**
 * Steps.company
 */
export type Steps$companyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: Prisma.CompanySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Company
     */
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where?: Prisma.CompanyWhereInput;
};
/**
 * Steps without action
 */
export type StepsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Steps
     */
    select?: Prisma.StepsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Steps
     */
    omit?: Prisma.StepsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StepsInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Steps.d.ts.map