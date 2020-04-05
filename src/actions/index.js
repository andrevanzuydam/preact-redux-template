/**
 * Constants and action methods are defined here in one file for ease of updating
 */
export const UPDATE_COUNTER = "UPDATE_COUNTER";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export function updateCounter(payload) {
    return { type: UPDATE_COUNTER, payload }
};

export function updateProfile(payload) {
    return { type: UPDATE_PROFILE, payload }
};