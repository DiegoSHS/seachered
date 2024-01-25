import { SupabaseClient } from "@supabase/supabase-js"
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
 * Retrieves records by text search in the selected table
 * @param {SupabaseClient} supabase Supabase client
 * @param {String} table Name of the table
 * @param {String} filter Stirng to match
 */
export const selectFiltered = async (supabase, table, filter) => {
    return supabase.from(table).select().textSearch('name', filter)
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