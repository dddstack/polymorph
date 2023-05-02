import { render, screen } from "@testing-library/preact";
import { createRef } from "preact";

import { polymorph } from "../dist";

describe("preact", () => {
  describe("with default transformer", () => {
    const p = polymorph();

    it("should render an element using proxy apply", () => {
      const PDiv = p("div");
      render(<PDiv data-testid="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("DIV");
    });

    it("should render an element using proxy get", () => {
      render(<p.div data-testid="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("DIV");
    });

    it("should render an element with the as prop", () => {
      render(<p.div as="span" data-testid="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("SPAN");
    });
  });

  describe("with custom transformer", () => {
    const transformer = (props: { testId: string }) => {
      const { testId, ...rest } = props;
      return { "data-testid": testId, ...rest };
    };

    const p = polymorph(transformer);

    it("should render an element using proxy apply", () => {
      const PDiv = p("div");
      render(<PDiv testId="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("DIV");
    });

    it("should render an element using proxy get", () => {
      render(<p.div testId="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("DIV");
    });

    it("should render an element with the as prop", () => {
      render(<p.div as="span" testId="p" />);
      expect(screen.getByTestId("p").nodeName).toBe("SPAN");
    });
  });

  describe("with refs", () => {
    const p = polymorph();

    it("should forward refs using proxy apply", () => {
      const ref = createRef<HTMLDivElement>();
      const PDiv = p("div");
      render(<PDiv ref={ref} data-testid="p" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("should forward refs using proxy get", () => {
      const ref = createRef<HTMLDivElement>();
      render(<p.div ref={ref} data-testid="p" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("should forward refs with the as prop", () => {
      const ref = createRef<HTMLDivElement & HTMLSpanElement>();
      render(<p.div as="span" ref={ref} data-testid="p" />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });
});
