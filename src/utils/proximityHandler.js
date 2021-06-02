const calculateDistance = (clat, clong, lat, long) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat - clat); // deg2rad below
    const dLon = deg2rad(long - clong);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(clat)) *
            Math.cos(deg2rad(lat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

export const addDistance = (clat, clong, data) => {
    return data.map((value) => {
        value["distance"] = calculateDistance(
            clat,
            clong,
            value.latitude,
            value.longitude
        );
        return value;
    });
};
