import { TGStorage, StorageListOptions } from 'topgun/storage';
import { TGGraphData, TGNode } from 'topgun/types';
import { createClient, RedisClientOptions, RedisClientType } from 'redis';
import { fromRedis, toRedis } from './serialize';

export class RedisStorage implements TGStorage
{
    readonly db: RedisClientType;

    /**
     * Constructor
     */
    constructor(path: string = 'topgun-nodes', options?: RedisClientOptions)
    {
        this.db = createClient(options) as RedisClientType;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async get(key: string): Promise<TGNode|null>
    {
        return fromRedis(
            await this.db.hGetAll(key)
        );
    }

    async put(key: string, value: TGNode): Promise<void>
    {
        await this.db.hSet(key, toRedis(value));
    }

    list(options: StorageListOptions): Promise<TGGraphData>
    {
        const result: TGGraphData = {};

        if (options.prefix)
        {
            const rangeOptions: RangeOptions = {};

            if (options.start)
            {
                rangeOptions.start = options.start;
            }
            if (options.end)
            {
                rangeOptions.end = options.end;
            }
            if (typeof options.reverse === 'boolean')
            {
                rangeOptions.reverse = options.reverse;
            }

            const filterByPrefix = ({ key }) => key.startsWith(options.prefix);

            if (options.limit)
            {
                this.db.getRange(rangeOptions)
                    .filter(filterByPrefix)
                    .slice(0, options.limit)
                    .forEach(({ key, value }) =>
                    {
                        result[key] = value;
                    });
            }
            else
            {
                this.db.getRange(rangeOptions)
                    .filter(filterByPrefix)
                    .forEach(({ key, value }) =>
                    {
                        result[key] = value;
                    });
            }
        }
        else
        {
            for (let { key, value } of this.db.getRange(options))
            {
                result[key] = value;
            }
        }

        return Promise.resolve(result);
    }
}
