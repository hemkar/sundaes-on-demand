import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial condition", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });

  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  expect(confirmButton).toBeDisabled();
});

test("checkbox functionallity", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  userEvent.click(checkBox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});

test("popup roll over", async () => {
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopOver = screen.queryByText(
    /no icecream will actually be delivered/i
  );
  expect(nullPopOver).not.toBeInTheDocument();

  //popover appears upon mouseover of checkbox label
  const termsAndCondition = screen.getByText(/terms and condition/i);
  userEvent.hover(termsAndCondition);
  const popOver = screen.getByText(/No ice cream will actually be delivered/i);
  expect(popOver).toBeInTheDocument();

  //popover disappers when we remove mouse
  userEvent.unhover(termsAndCondition);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/No ice cream will actually be delivered/i)
  );
});
