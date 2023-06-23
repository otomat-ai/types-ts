import { ChatCompletionFunctions, ChatCompletionRequestMessageFunctionCall } from 'openai';
import { GeneratorModel, GeneratorModule } from './generator';
export declare const MODULES: readonly ["analysis", "compliance"];
export type ModuleName = typeof MODULES[number];
export type ModuleInformation = {
    type: 'pre' | 'post';
    name: string;
    key: string;
    description: string;
    information?: string;
};
export type Module<T extends Record<string, ModuleOptionDefinition<any>>> = ModuleInformation & {
    options: T;
};
export type Modules = {
    [Key in ModuleName]: Module<any>;
};
export type ModuleOptionDefinition<T extends string | number | boolean> = {
    default: T;
    required: boolean;
    description: string;
};
export type ModuleOptionValue<T extends ModuleName> = {
    [K in keyof typeof modules[T]['options']]?: typeof modules[T]['options'][K] extends ModuleOptionDefinition<infer R> ? R : never;
};
export declare const modules: Modules;
export type BaseProcessInfo = {
    module: string;
    options: ModuleOptionValue<any>;
};
export type SuccesfulProcessInfo = BaseProcessInfo & {
    status: 'success';
};
export type FailedProcessInfo = BaseProcessInfo & {
    status: 'failed';
    error: string;
};
export type ProcessInfo = SuccesfulProcessInfo | FailedProcessInfo;
export type Meta = {
    version: string;
    model: GeneratorModel;
    cost: number;
    retries: number;
    process: {
        [P in keyof typeof MODULES]?: ProcessInfo;
    };
};
type BaseCompletion = {
    cost: number;
    retries: number;
};
type JSONCompletion = BaseCompletion & {
    type: 'json';
    data: any;
};
type FunctionCompletion = BaseCompletion & {
    type: 'function';
    function: ChatCompletionFunctions;
    chain: boolean;
    data: ChatCompletionRequestMessageFunctionCall;
};
type ErrorCompletion = BaseCompletion & {
    type: 'error';
    error: any;
};
export type SuccesfulCompletion = JSONCompletion | FunctionCompletion;
export type Completion = SuccesfulCompletion | ErrorCompletion;
type BaseOperatorData = {
    generator: Generator;
    modules: GeneratorModule<ModuleName>[];
    meta: Meta;
};
export type PreOperatorData = BaseOperatorData;
export type PostOperatorData = BaseOperatorData & {
    completion: SuccesfulCompletion;
};
type BaseOperatorSuccess = {
    success: true;
    generator: Generator;
    meta: Meta;
};
type PreOperatorSuccess = BaseOperatorSuccess;
type PostOperatorSuccess = BaseOperatorSuccess & {
    completion: Completion;
};
type OperatorError = {
    success: false;
    error: string;
    meta: Meta;
};
type PreOperatorError = OperatorError;
type PostOperatorError = OperatorError & {
    retry: boolean;
};
export type PreOperatorResult = PreOperatorSuccess | PreOperatorError;
export type PostOperatorResult = PostOperatorSuccess | PostOperatorError;
export {};
//# sourceMappingURL=module.d.ts.map