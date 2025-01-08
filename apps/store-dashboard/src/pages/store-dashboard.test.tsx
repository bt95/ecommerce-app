import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoreDashboard from "./store-dashboard";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  http.get("http://localhost:3001/api/products", () => {
    return HttpResponse.json([
      { id: "1", name: "Product 1", value: 100 },
      { id: "2", name: "Product 2", value: 200 },
    ]);
  }),
  http.post("http://localhost:3001/api/products/1", () => {
    return HttpResponse.json({ id: "1", name: "Product 1", value: 150 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders store dashboard page and fetches dashboard items", async () => {
  render(<StoreDashboard />);

  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText((content, element) => {
        return (
          element !== null &&
          element.tagName.toLowerCase() === "h2" &&
          /Product 1/i.test(content)
        );
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element !== null &&
          element.tagName.toLowerCase() === "h2" &&
          /Product 2/i.test(content)
        );
      })
    ).toBeInTheDocument();
  });
});

test("handles dashboard item interaction", async () => {
  render(<StoreDashboard />);

  await waitFor(() => {
    expect(
      screen.getByText((content, element) => {
        return (
          element !== null &&
          element.tagName.toLowerCase() === "h2" &&
          /Product 2/i.test(content)
        );
      })
    ).toBeInTheDocument();
  });

  const selectButton = screen.getAllByText(/select/i)[0];
  fireEvent.click(selectButton);

  const inputName = screen.getAllByLabelText(/Inventory Count:/i)[0];
  inputName.innerText = "150";

  const updateButton = screen.getAllByText(/update/i)[0];
  fireEvent.click(updateButton);

  screen.getAllByText(/select/i)[0];

  await waitFor(() => {
    expect(
      screen.getByText(/Product updated successfully/i)
    ).toBeInTheDocument();
  });
});
