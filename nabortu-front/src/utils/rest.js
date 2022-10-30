import { baseUrl } from "./consts";

export const getTrackForUser = async(id) => {
    const result = await fetch(
        `${baseUrl}/gettrackforuser/${id}`
    );
    const plainObj = await result.json();

    return plainObj;
}

export const updateTask = async(id) => {}