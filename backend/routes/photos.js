const express = require("express");
const axios = require("axios");
const redis = require("redis");
const router = express.Router();

const redisClient = redis.createClient(); // Can add production url here {url:}

router.get("/", async (req, res) => {
  const albumId = req.query.albumId;
  const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      { params: { albumId } }
    );
    return data;
  });
  res.json(photos);
});

router.get("/:id", async (req, res) => {
  const photo = await getOrSetCache(`photos:${req.params.id}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    );
    return data;
  });

  res.json(photo);
});

function getOrSetCache(key, callback) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) {
        return reject(error);
      }

      if (data != null) {
        return resolve(JSON.parse(data));
      }

      const freshData = await callback();
      redisClient.setex(
        key,
        process.env.REDIS_EXPIRATION,
        JSON.stringify(freshData)
      );
      resolve(freshData);
    });
  });
}

module.exports = router;
