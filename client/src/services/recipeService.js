import {API} from "../common/constants";
import fetchJsonp from "fetch-jsonp";
import axios from "axios";

/**
 * Find recipes with given query text and range of results.
 *
 * @param query query text
 * @param from first result index
 * @param to last result index (exclusive)
 */
export const findRecipes = (query, from, to) => {
    return fetchJsonp(`${API}&q=${query}&to=100`)
        .then(response => response.json())
        .then(result => result.hits);
};

export const findUserCreatedRecipes = (uid) =>
    fetch(`/api/users/${uid}/recipes`).then(res => res.json());

export default {
    findRecipes,
    findUserCreatedRecipes
}
