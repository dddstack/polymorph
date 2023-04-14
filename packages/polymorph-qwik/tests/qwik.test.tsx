import { createDOM } from "@builder.io/qwik/testing";

import { polymorphic } from "../dist";

describe("qwik", () => {
  describe("with default transformer", () => {
    const p = polymorphic();

    it("should render an element using proxy apply", async () => {
      const { render, screen } = await createDOM();
      const PDiv = p("div");
      await render(<PDiv id="p" />);
      expect(screen.querySelector("#p")?.nodeName).toBe("DIV");
    });

    it("should render an element using proxy get", async () => {
      const { render, screen } = await createDOM();
      await render(<p.div id="p" />);
      expect(screen.querySelector("#p")?.nodeName).toBe("DIV");
    });

    it("should render an element with the as prop", async () => {
      const { render, screen } = await createDOM();
      await render(<p.div as="span" id="p" />);
      expect(screen.querySelector("#p")?.nodeName).toBe("SPAN");
    });
  });

  describe("with custom transformer", () => {
    const transformer = (props: { testId: string }) => {
      const { testId, ...rest } = props;
      return { id: testId, ...rest };
    };

    const p = polymorphic(transformer);

    it("should render an element using proxy apply", async () => {
      const { render, screen } = await createDOM();
      const PDiv = p("div");
      await render(<PDiv testId="p" />);
      expect(screen.querySelector("#p")?.nodeName).toBe("DIV");
    });

    it("should render an element using proxy get", async () => {
      const { render, screen } = await createDOM();
      await render(<p.div testId="p" />);
      expect(screen.querySelector("#p")?.nodeName).toBe("DIV");
    });

    it("should render an element with the as prop", async () => {
      const { render, screen } = await createDOM();
      await render(<p.div as="span" testId="p" />);
      expect(screen.querySelector("#p")?.nodeName).toBe("SPAN");
    });
  });
});
