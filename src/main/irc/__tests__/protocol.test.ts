import { createBlankIRCMessage, tokenizeServerMessage, tokenizeTags } from "../protocol";


describe("read tags from server message", () => {
  test("tokenize a simple tag set", () => {
    const input = "@id=123AB"
    const expectedResult = {
      id: "123AB"
    }

    const result = tokenizeTags(input);

    expect(result).toMatchObject(expectedResult);
  })

  test("tokenized a tag set with several key-value pairs", () => {
    const input = "@id=123AB;apples=dogs"
    const expectedResult = {
      id: "123AB",
      apples: "dogs"
    }

    const result = tokenizeTags(input);

    expect(result).toMatchObject(expectedResult);
  })

  test("tokenized a tag set with several key-value pairs with a single value missing", () => {
    let input = "@id=123AB;apples=dogs;cards"
    let expectedResult = {
      id: "123AB",
      apples: "dogs",
      cards: "",
    }

    let result = tokenizeTags(input);
    expect(result).toMatchObject(expectedResult);
  })
});

describe("read source from server message", () => {
  test("read source", () => {
    const input = ":irc.example.com CAP * LIST :"
    const expectedResult = "irc.example.com"

    const result = tokenizeServerMessage(input);

    expect(result.source).toEqual(expectedResult)
  })

  test("correctly not read source", () => {
    const input = "CAP * LIST :"
    const expectedResult = undefined

    const result = tokenizeServerMessage(input);

    expect(result.source).toEqual(expectedResult)
  })
})

describe('read command and paramters', () => {
  test("correctly read command with no tags or source", () => {
    const input = "CAP REQ :sasl message-tags foo"
    const expectedResult = createBlankIRCMessage()
    expectedResult.command = "CAP"
    expectedResult.parameters = ["REQ", "sasl", "message-tags", "foo"]

    const result = tokenizeServerMessage(input);

    expect(result).toEqual(expectedResult)
  })
})
