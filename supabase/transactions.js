'use server'
import { createClient } from "@/utils/supabase/server"
import { SupabaseClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
const cookieStore = cookies()
const client = createClient(cookieStore)
/**
 * Delete a record by its id in the selected table
 * @param {SupabaseClient} supabase Supabase client
 * @param {String} table Name of the table
 * @param {Number} id Id of the record
 * @returns 
 */
export const deleteById = async (table, id, supabase = client) => {
    return supabase.from(table).delete({ count: 'estimated' }).eq('id', id)
}
/**
 * Retieves all records of the selected table
 * @param {SupabaseClient} supabase Supabase client
 * @param {String} table Name of the table
 */
export const selectAll = async (table, supabase = client) => {
    return supabase.from(table).select()
}
/**
 * Retrieves all recors of the selected table by category
 * @param {SupabaseClient} supabase Supabase client
 * @param {String} table Name of the table
 * @param {String} category Name of the category (use category column)
 */
export const selectCategory = async (table, category, supabase = client) => {
    if (category === '') {
        return supabase.from(table).select().is('category', null)
    }
    return supabase.from(table).select().eq('category', category)
}
/**
 * Retrieves records by text search in the selected table
 * @param {SupabaseClient} supabase Supabase client
 * @param {String} table Name of the table
 * @param {String} filter Stirng to match
 */
export const selectFiltered = async (table, filter, supabase = client) => {
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
export const createNew = async (table, newObject, supabase = client) => {
    return supabase.from(table).insert(newObject).select()
}