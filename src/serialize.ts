import { flatten, unflatten } from 'flat';
import { TGNode } from 'topgun/types';

const DEFAULT_DELIMITER = '_._';

export function fromRedis(obj: Record<string, any>, delimiter = DEFAULT_DELIMITER): TGNode
{
    if (typeof obj === 'object')
    {
        Object.keys(obj).forEach(key =>
        {
            if (obj[key] === '|NULL|')
            {
                obj[key] = null;
            }
            if (obj[key] === '|UNDEFINED|')
            {
                obj[key] = undefined;
            }
        });

        return unflatten(obj, { delimiter });
    }

    return obj;
}

export function toRedis(obj: TGNode, delimiter = DEFAULT_DELIMITER): any
{
    if (typeof obj === 'object')
    {
        Object.keys(obj).forEach(key =>
        {
            if (obj[key] === null)
            {
                obj[key] = '|NULL|';
            }
            if (typeof obj[key] === undefined)
            {
                obj[key] = '|UNDEFINED|';
            }
        });

        return flatten(obj, { delimiter });
    }

    return obj;
}

