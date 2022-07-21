import {
  fireEvent,
  render,
  screen,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("Update scoop subtotal when scoop changes", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubTotal).toHaveTextContent("0.00");

  //update vanilla scoop to 1 and check the subTotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: `Vanilla`,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1"); // userEvent.type requires a string

  expect(scoopSubTotal).toHaveTextContent("2.00");
  //update chocolate scoop to 2 and check the subTotal

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubTotal).toHaveTextContent("6.00");
});

test("Update toppings subtotal when toppings changes", async () => {
  render(<Options optionType="toppings" />);
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  const checkBoxOne = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  fireEvent.click(checkBoxOne);
  expect(toppingsTotal).toHaveTextContent("1.50");

  const checkBoxTwo = await screen.findByRole("checkbox", {
    name: /Hot fudge/i,
  });
  fireEvent.click(checkBoxTwo);
  expect(toppingsTotal).toHaveTextContent("3.00");

  fireEvent.click(checkBoxOne);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("Grand total", () => {
  test("grand total updates properly when scoop was added first", async () => {
    render(<OrderEntry />);
    const grossTotal = screen.getByRole("heading", {
      name: /Grand total: \$/i,
    });
    expect(grossTotal).toHaveTextContent("$0.00");
    const vanilla = await screen.findByRole("spinbutton", { name: "Vanilla" });
    userEvent.clear(vanilla);
    userEvent.type(vanilla, "2");
    expect(grossTotal).toHaveTextContent("4.00");

    const checkBoxOne = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });
    fireEvent.click(checkBoxOne);
    expect(grossTotal).toHaveTextContent("5.50");

    const checkBoxtwo = await screen.findByRole("checkbox", {
      name: /Hot fudge/i,
    });
    fireEvent.click(checkBoxtwo);
    expect(grossTotal).toHaveTextContent("7.00");
  });
  test("grand total updates properly when toppings was added first", async () => {
    render(<OrderEntry />);
    const grossTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const checkBoxOne = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });
    fireEvent.click(checkBoxOne);

    const vanilla = await screen.findByRole("spinbutton", { name: "Vanilla" });
    userEvent.clear(vanilla);
    userEvent.type(vanilla, "2");

    expect(grossTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly when toppings was removed", async () => {
    render(<OrderEntry />);
    const grossTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const checkBoxOne = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });
    fireEvent.click(checkBoxOne);

    const vanilla = await screen.findByRole("spinbutton", { name: "Vanilla" });
    userEvent.clear(vanilla);
    userEvent.type(vanilla, "2");

    expect(grossTotal).toHaveTextContent("5.50");
    fireEvent.click(checkBoxOne);
    expect(grossTotal).toHaveTextContent("4.00");
  });
});
