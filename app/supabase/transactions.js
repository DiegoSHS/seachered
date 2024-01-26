import { SupabaseClient } from "@supabase/supabase-js"
import { textChangeRangeIsUnchanged } from "typescript"
/**
 * Delete a record by its id in the selected table
 * @param {SupabaseClient} supabase Supabase client
 * @param {String} table Name of the table
 * @param {Number} id Id of the record
 * @returns 
 */
export const deleteById = async (supabase, table, id) => {
    return supabase.from(table).delete({ count: 'estimated' }).eq('id', id)
}
/**
 * Retieves all records of the selected table
 * @param {SupabaseClient} supabase Supabase client
 * @param {String} table Name of the table
 */
export const selectAll = async (supabase, table) => {
    return supabase.from(table).select()
}
/**
 * 
 * @param {SupabaseClient} supabase 
 * @param {String} table 
 * @param {String} category 
 */
export const selectCategory = async (supabase, table, category) => {
    return supabase.from(table).select().eq('category', category)
}
/**
 * Retrieves records by text search in the selected table
 * @param {SupabaseClient} supabase Supabase client
 * @param {String} table Name of the table
 * @param {String} filter Stirng to match
 */
export const selectFiltered = async (supabase, table, filter) => {
    const data = await Promise.allSettled([
        supabase.from(table).select().textSearch('name', filter),
        supabase.from(table).select().textSearch('description', filter),
        supabase.from(table).select().eq('price', Number(filter))
    ]).then(results => {
        const data = results.map(({ value }) => value.data)
        return data.flat()
    })
    return { data }
}
/**
 * Insert a new record to the selected table
 * @param {SupabaseClient} supabase Supabase client 
 * @param {String} table Name of the table
 * @param {Object} newObject Object to insert
 */
export const createNew = async (supabase, table, newObject) => {
    return supabase.from(table).insert(newObject).select()
}