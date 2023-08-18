import { createClient, RedisClientOptions, RedisClientType } from 'redis';
import { fromRedis, toRedis } from '../src/serialize';

const key  = '~M7Xy8-sGHTjWBaf6mGzlhmZyyzgqInTaB81kLHISf5M.ohsXbREqPf1k6GSeN5lgGFEJfK_GJjuRE-YI3WJvoEU';
const node = {
    '_'    : {
        '#': '~M7Xy8-sGHTjWBaf6mGzlhmZyyzgqInTaB81kLHISf5M.ohsXbREqPf1k6GSeN5lgGFEJfK_GJjuRE-YI3WJvoEU',
        '>': { 'alias': 1690481207217, 'auth': 1690481207217, 'epub': 1690481207217, 'pub': 1690481207217 }
    },
    'alias': 'john',
    'auth' : {
        'ek'  : {
            'ct': 'eMGs60f2d2Icyjm5DYpoIBQN+ZJRmQo2Y28yVwN5+7LERUtgeb/J0IedsrZAp7M6DK786vuMQMQ3DZ7eCriRUtaM+fEPxXkch+1ryJmpYkRUvnWDzHxeqgl63T1GiNznnQcpkk/Az/OB9jMamiAycqfrGQZPF86hbBMixg==',
            'iv': '7a4jx2YAiweADtsvsUeQ',
            's' : 'OXV9LsYklSYK'
        }, 's': 'tRgvA73bOd1l72vkyBflnW7IQSUjNf7G960B8AAn3H43A7dIFbFS0Sa5bkrkPXer'
    },
    'epub' : 'z8vPdPNPAL2R6hrTNapvhoJDpbRYQct8EBSk-7sZDJ8.vdmKswphgUXRPQdI-zPYATxbPC1V_UwqD8O0oY3vqjU',
    'pub'  : 'M7Xy8-sGHTjWBaf6mGzlhmZyyzgqInTaB81kLHISf5M.ohsXbREqPf1k6GSeN5lgGFEJfK_GJjuRE-YI3WJvoEU'
};

describe('Redis adapter test', () =>
{
    let client: RedisClientType;

    beforeEach(async () =>
    {
        client = createClient();
        await client.connect();
    });
    afterEach(async () =>
    {
        await client.disconnect();
    });

    it('simple test redis', async () =>
    {
        /*await client.hSet('user-session:123', {
            name: 'John',
            surname: 'Smith',
            company: 'Redis',
            age: 29
        });*/
        await client.set('key', JSON.stringify(node));

        const value = await client.get('key');
        // const result = JSON.parse(value.toString());

        console.log(value);

        // let userSession = await client.hGetAll('user-session:123');
        // console.log(JSON.stringify(userSession, null, 2));

        expect(value).not.toBeUndefined();
    });

    it('flatten/unflatten', async () =>
    {
        const flat = toRedis(node);
        const normal = fromRedis(flat);
        console.log(normal);

        expect(flat).not.toBeUndefined();
    });

    /*const storage = new LMDBStorage();

    it('simple put/get', async () =>
    {
        await storage.put('key1', node);
        const readNode = await storage.get('key1');

        expect(node.say).toBe(readNode.say);
    });

    it('get list by prefix', async () =>
    {
        await storage.put('key1', node);
        await storage.put('key2', node);
        await storage.put('key3', node);
        await storage.put('anotherKey', node);

        const readNodes = await storage.list({
            prefix: 'key'
        });

        expect(Object.keys(readNodes).length).toBe(3);
    });

    it('get list by prefix/limit', async () =>
    {
        await storage.put('key1', node);
        await storage.put('key2', node);
        await storage.put('key3', node);
        await storage.put('anotherKey', node);

        const readNodes = await storage.list({
            prefix: 'key',
            limit : 2
        });

        expect(Object.keys(readNodes).length).toBe(2);
    });

    it('get list by start/end', async () =>
    {
        await storage.put('2019-06-20T00:00', node);
        await storage.put('2019-06-20T11:59', node);
        await storage.put('2019-06-21T00:00', node);
        await storage.put('2019-06-22T00:00', node);
        await storage.put('2019-06-23T00:00', node);

        await storage.db.committed;

        const readNodes = await storage.list({
            start: '2019-06-20T00:00',
            end  : '2019-06-22T00:00',
        });

        expect(Object.keys(readNodes).length).toBe(3);
    });*/
});
