import { BlockStateSuperset as VanillaBlockStates } from "@minecraft/vanilla-data";

type CornDelightBlockStates = {
    ["corn_delight:growth"]: number;
    ["corn_delight:popcorn_box"]: number;
    ["corn_delight:upper"]: boolean;
};

export type KnownBlockStates = VanillaBlockStates & CornDelightBlockStates;

declare module "@minecraft/server" {
    export interface BlockPermutation {
        getState<T extends keyof KnownBlockStates>(name: T): KnownBlockStates[T] | undefined;

        withState<T extends keyof KnownBlockStates>(name: T, value: KnownBlockStates[T]): BlockPermutation;
    }
}
