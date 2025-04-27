import {WorldInitializeAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { cookingPotRecipes } from "../data/CookingPotRecipes";
let register = true
export class CookingPotRecipeRegister {
    @EventAPI.register(world.afterEvents.worldInitialize)
    register(args: WorldInitializeAfterEvent) {
        system.runInterval(() => {
            if (register) {
                for (let i = 0; i < cookingPotRecipes.length; i++) {
                    cookingPotRecipes[i]
                    const recipe = JSON.stringify(cookingPotRecipes[i]);
                    world.getDimension("overworld").runCommandAsync(`scriptevent farmersdelight:cooking_pot_recipe ${recipe}`);
                } 
                register = false
               
            }
        })
    }
}