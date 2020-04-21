import {API} from "../common/constants";
import fetchJsonp from "fetch-jsonp";

/**
 * Find recipes with given query text and range of results.
 *
 * @param query query text
 * @param from first result index
 * @param to last result index (exclusive)
 */
export const findRecipes = (query, from, to) => {
    return fetchJsonp(`${API}&q=${query}&from=${from}&to=${to}`)
        .then(response => response.json())
        .then(result => result.hits);
};

export default {
    findRecipes
}
