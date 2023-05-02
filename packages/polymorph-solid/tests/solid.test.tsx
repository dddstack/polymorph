import { render, screen } from "@solidjs/testing-library";
import { splitProps } from "solid-js";

import { polymorph } from "../dist";

describe("solid", () => {
  describe("with default transformer", () => {
    const p = polymorph();

    it("should render an element using proxy apply", () => {
      const PDiv = p("div");
      render(() => <PDiv data-testid="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("DIV");
    });

    it("should render an element using proxy get", () => {
      render(() => <p.div data-testid="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("DIV");
    });

    it("should render an element with the as prop", () => {
      render(() => <p.div as="span" data-testid="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("SPAN");
    });
  });

  describe("with custom transformer", () => {
    const transformer = (props: { testId: string }) => {
      const [local, others] = splitProps(props, ["testId"]);
      return { "data-testid": local.testId, ...others };
    };

    const p = polymorph(transformer);

    it("should render an element using proxy apply", () => {
      const PDiv = p("div");
      render(() => <PDiv testId="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("DIV");
    });

    it("should render an element using proxy get", () => {
      render(() => <p.div testId="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("DIV");
    });

    it("should render an element with the as prop", () => {
      render(() => <p.div as="span" testId="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("SPAN");
    });
  });

  describe("with refs", () => {
    const p = polymorph();

    it("should forward refs using proxy apply", () => {
      let ref: HTMLDivElement | undefined;
      const PDiv = p("div");
      render(() => <PDiv ref={ref} data-testid="p" />);
      expect(ref).toBeInstanceOf(HTMLDivElement);
    });

    it("should forward refs using proxy get", () => {
      let ref: HTMLDivElement | undefined;
      render(() => <p.div ref={ref} data-testid="p" />);
      expect(ref).toBeInstanceOf(HTMLDivElement);
    });

    it("should forward refs with the as prop", () => {
      let ref: (HTMLDivElement & HTMLSpanElement) | undefined;
      render(() => <p.div as="span" ref={ref} data-testid="p" />);
      expect(ref).toBeInstanceOf(HTMLSpanElement);
    });
  });
});
