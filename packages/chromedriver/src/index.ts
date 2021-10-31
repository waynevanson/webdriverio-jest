import { ChildProcess } from "child_process"
import * as cd from "chromedriver"
import { either as E } from "fp-ts"
import { ChromeDriverOptions, decoder } from "./options"
import * as d from "io-ts/Decoder"

export async function start(
  chromeDriverOptions: ChromeDriverOptions
): Promise<ChildProcess> {
  const parsed = decoder.decode(chromeDriverOptions)

  if (E.isLeft(parsed)) {
    throw new Error(d.draw(parsed.left))
  } else {
    console.log(parsed)
    return await cd.start(parsed.right, true)
  }
}

export { stop } from "chromedriver"
