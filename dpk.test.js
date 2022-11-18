const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partition key when given an event", () => {
    const partitionKey = deterministicPartitionKey({ name: "event" });
    expect(partitionKey).not.toBe("0");
  });

  it("Returns the determinist partition key when given an event with the partitionKey property", () => {
    const partitionKey = deterministicPartitionKey({ partitionKey: "candidatePartitionKeyExemple" });

    expect(partitionKey).toBe("candidatePartitionKeyExemple");
  });
});
