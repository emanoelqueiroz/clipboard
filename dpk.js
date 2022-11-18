const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate;

  if (event?.partitionKey) {
    candidate = event.partitionKey;
  } else if (event) {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (!candidate) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  return candidate.length <= MAX_PARTITION_KEY_LENGTH ? 
    candidate : crypto.createHash("sha3-512").update(candidate).digest("hex");
};