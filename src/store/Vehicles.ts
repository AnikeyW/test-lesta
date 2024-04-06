import { makeVar } from "@apollo/client";
import { VehicleFragmentFragment } from "../__generated__/output.ts";

export const selectedVehicleVar = makeVar<VehicleFragmentFragment | null>(null);
export const typesFilterVar = makeVar(new Set<string>());
export const levelsFilterVar = makeVar(new Set<number>());
export const nationsFilterVar = makeVar(new Set<string>());
