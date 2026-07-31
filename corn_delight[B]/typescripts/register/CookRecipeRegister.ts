import {WorldLoadAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { cookRecipes } from "../data/CookRecipes";
let register = true
export class CookRecipeRegister {
    @EventAPI.register(world.afterEvents.worldLoad)
    register(args: WorldLoadAfterEvent) {
        system.runInterval(() => {
            if (register) {
                for (let i = 0; i < cookRecipes.length; i++) {
                    cookRecipes[i]
                    const recipe = JSON.stringify(cookRecipes[i]);
                    system.sendScriptEvent("farmersdelight:cook",`${recipe}`)
                }
                register = false

            }
        })
    }
}
