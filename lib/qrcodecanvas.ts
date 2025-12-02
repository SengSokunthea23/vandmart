/* eslint-disable @typescript-eslint/no-unused-vars */
import QRCode from "qrcode";

import BND from "../public/assets/ccy/bnd.svg";
import CNY from "../public/assets/ccy/cny.svg";
import IDR from "../public/assets/ccy/idr.svg";
import INR from "../public/assets/ccy/inr.svg";
import KHR from "../public/assets/ccy/khr.svg";
import LAK from "../public/assets/ccy/lak.svg";
import MMK from "../public/assets/ccy/mmk.svg";
import MYR from "../public/assets/ccy/myr.svg";
import PHP from "../public/assets/ccy/php.svg";
import SGD from "../public/assets/ccy/sgd.svg";
import THB from "../public/assets/ccy/thb.svg";
import USD from "../public/assets/ccy/usd.svg";
import VND from "../public/assets/ccy/vnd.svg";
import EUR from "../public/assets/ccy/eur.svg";
import CZK from "../public/assets/ccy/czk.svg";
import AUD from "../public/assets/ccy/aud.svg";

const ccy: Record<string, string> = {
  ["BND"]: BND,
  ["CNY"]: CNY,
  ["IDR"]: IDR,
  ["INR"]: INR,
  ["KHR"]: KHR,
  ["LAK"]: LAK,
  ["MMK"]: MMK,
  ["MYR"]: MYR,
  ["PHP"]: PHP,
  ["SGD"]: SGD,
  ["THB"]: THB,
  ["USD"]: USD,
  ["VND"]: VND,
  ["EUR"]: EUR,
  ["CZK"]: CZK,
  ["AUD"]: AUD,
};

export class QRCodeCanvasFactory {
  private qrText: string;
  private currency: string;
  private bakongAccount: string;
  private labelName: string;

  constructor(
    qrText: string,
    currency: string,
    labelName: string = "",
    bakongAccount: string = ""
  ) {
    this.qrText = qrText;
    this.currency = currency;
    this.bakongAccount = bakongAccount;
    this.labelName = labelName;
  }

  async createQR() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    // Generate QR code
    const qrcode = await QRCode.toDataURL(this.qrText, {
      width: 575.211,
      margin: 0,
    });

    return { qrcode, currency: this.currency };
  }
}
