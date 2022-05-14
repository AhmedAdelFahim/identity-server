/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
const { createClient } = require("redis");
const { getConfig } = require("../config/config");
const Logger = require("../middlewares/logger.middleware");

class Redis {
  static _client;

  static async initializeRedis() {
    this._client = createClient({
      url: getConfig().REDIS_URL,
    });

    this._client.on("error", (err) =>
      Logger.log("error", `Redis Client Error ${JSON.stringify(err)}`),
    );
    this._client.on("connect", () => Logger.log("info", "Redis connected"));
    await this._client.connect();
  }

  static async set(key, value) {
    await this._client.SET(key, value);
  }

  static async get(key) {
    return await this._client.GET(key);
  }

  static async setHash(key, field, value) {
    await this._client.HSET(key, field, value);
  }

  static async getHash(key) {
    return await this._client.HGETALL(key);
  }

  static async deleteKey(key) {
    return await this._client.DEL(key);
  }

  static async expireAt(key, time) {
    return await this._client.EXPIREAT(key, time);
  }

  static async closeConnection() {
    return this._client.quit();
  }
}

module.exports = Redis;
