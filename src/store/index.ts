import {atom, createStore} from "jotai";
import {TSelectedRoute} from "../types";
import {citiInfo} from "../data/citiInfo";

export const maxSelectedRoutesAtom = atom<number>(5)
export const selectedRoutesAtom = atom<Array<TSelectedRoute>>([])

export const hasLocationPremission = atom(false)

export const mapRegionAtom = atom(citiInfo)


export const routeDirectionAtom = atom<'direct' | 'reversed'>('direct')
