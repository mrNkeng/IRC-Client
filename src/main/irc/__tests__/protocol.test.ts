import { tokenizeTags } from "../protocol";


describe("tags tokenizer", () => {


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
