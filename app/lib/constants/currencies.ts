import { ReactNode } from "react";

export class Currency {
  name: string;
  ico: ReactNode;

  constructor(
    name: string,
    ico: ReactNode,
  ) {
    this.name = name;
    this.ico = ico;
  }
}
