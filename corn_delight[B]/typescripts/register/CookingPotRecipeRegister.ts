import {WorldLoadAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { cookingPotRecipes } from "../data/CookingPotRecipes";
let register = true
export class CookingPotRecipeRegister {
    @EventAPI.register(world.afterEvents.worldLoad)
    register(args: WorldLoadAfterEvent) {
        system.runInterval(() => {
            if (register) {
                for (let i = 0; i < cookingPotRecipes.length; i++) {
                    cookingPotRecipes[i]
                    const recipe = JSON.stringify(cookingPotRecipes[i]);
                    system.sendScriptEvent("farmersdelight:cooking_pot_recipe",`${recipe}`)
                } 
                register = false
               
            }
        })
    }
}