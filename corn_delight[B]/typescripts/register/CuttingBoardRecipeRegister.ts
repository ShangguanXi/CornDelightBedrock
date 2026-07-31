import {WorldLoadAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { cuttingBoardRecipes } from "../data/CuttingBoardRecipes";
let register = true
export class CuttingBoardRecipeRegister {
    @EventAPI.register(world.afterEvents.worldLoad)
    register(args: WorldLoadAfterEvent) {
        system.runInterval(() => {
            if (register) {
                for (let i = 0; i < cuttingBoardRecipes.length; i++) {
                    cuttingBoardRecipes[i]
                    const recipe = JSON.stringify(cuttingBoardRecipes[i]);
                    system.sendScriptEvent("farmersdelight:cutting_board_recipe",`${recipe}`)
                }
                register = false

            }
        })
    }
}
