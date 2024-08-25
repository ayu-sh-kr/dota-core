import "reflect-metadata";

export class HelperUtils {

    /**
     * Fetches existing metadata or creates new metadata for a given target and appender.
     *
     * This method retrieves metadata associated with the target's constructor using the specified appender.
     * If the metadata does not exist, it creates a new Map, defines it as metadata, and returns it.
     * If the metadata already exists, it simply returns the existing Map.
     *
     * @template T - The type of the metadata value.
     * @param {any} target - The target object to fetch or create metadata for.
     * @param {string} appender - The appender string used to construct the metadata key.
     * @returns {Map<string, T>} - The metadata Map associated with the target and appender.
     */
    static fetchOrCreate<T>(target: any, appender: string): Map<string, T> {

        const key =  `${target.constructor.name}:${appender}`

        let data: Map<string, T>;

        if(!Reflect.hasMetadata(key, target)) {
            data = new Map<string, T>();
            Reflect.defineMetadata(key, data, target);
        }

        data = Reflect.getMetadata(key, target);

        return data;
    }

}